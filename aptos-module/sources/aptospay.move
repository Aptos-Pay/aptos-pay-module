module owner::aptospay{
    use std::signer;
    use std::vector;
    use aptos_std::smart_table;
    use aptos_framework::managed_coin;
    use aptos_std::smart_table::SmartTable;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;    
    use aptos_framework::account;


    const EINVALID_DEDICATED_INITIALIZER: u64 = 1;
    const EALREADY_EXISTS: u64 = 2;
    const UID_NOT_EXIST: u64 = 3;
    const AMOUNT_NOT_EXIST: u64 = 4;
    const AMOUNT_NOT_TRUE: u64 = 5;
    const UID_NOT_TRUE: u64 = 6;
    const ERR_NOT_STORE_OWNER: u64 = 7;


    const ADMIN: address = @owner;

    struct InitateTx has key, store {
        uid: u256,
        amount: u64,
        order_wallet_cap: account::SignerCapability,
    }

    struct InitateTxTable has key {
        initateTxData: SmartTable<u256, InitateTx>
    }

    struct AptosPay has key {
        store_owner: address,
    }

    public entry fun init(contract_account: &signer, store_owner: address) {
        assert!(signer::address_of(contract_account) == ADMIN, EINVALID_DEDICATED_INITIALIZER);

        move_to(contract_account, InitateTxTable {
            initateTxData: smart_table::new()
        });

        move_to(contract_account, AptosPay {
            store_owner
        });
    }

    public entry fun create_order(contract_account: &signer, uid: u256, amount: u64) acquires InitateTxTable {
        assert!(signer::address_of(contract_account) == @owner, EINVALID_DEDICATED_INITIALIZER);

        let initate_data = borrow_global_mut<InitateTxTable>(signer::address_of(contract_account));
        let bites = std::bcs :: to_bytes(&uid);
        let (order_wallet, order_wallet_cap) = account::create_resource_account(contract_account, bites);

        managed_coin::register<AptosCoin>(&order_wallet);
        smart_table::add(&mut initate_data.initateTxData, uid, InitateTx {
            uid,
            amount,
            order_wallet_cap,
        });
        
    }

    public entry fun get_all_payments(store_owner: &signer) acquires InitateTxTable, AptosPay {
        let aptospay_resource = borrow_global_mut<AptosPay>(ADMIN);
        let store_owner_wallet = signer::address_of(store_owner);

        assert!(aptospay_resource.store_owner == store_owner_wallet, ERR_NOT_STORE_OWNER);
        let initate_data = borrow_global_mut<InitateTxTable>(ADMIN);
        
        smart_table::for_each_ref(&initate_data.initateTxData, |uid, tx| {
            let tx: &InitateTx = tx;
            let order_wallet = account::create_signer_with_capability(&tx.order_wallet_cap);
            let order_wallet_address = signer::address_of(&order_wallet);

        coin::transfer<AptosCoin>(&order_wallet, aptospay_resource.store_owner, tx.amount);
        });
    }

    public entry fun set_store_owner(store_owner: &signer, new_store_owner: address) acquires AptosPay {
        let store_owner_wallet = signer::address_of(store_owner);
        let aptospay_resource = borrow_global_mut<AptosPay>(ADMIN);

        assert!(aptospay_resource.store_owner == store_owner_wallet, ERR_NOT_STORE_OWNER);
        aptospay_resource.store_owner = new_store_owner;
    }

    #[view]
    public fun get_uid_payment_address(uid: u256):address acquires InitateTxTable{
        let initate_data = borrow_global_mut<InitateTxTable>(ADMIN);
        let initate_table = smart_table::borrow(&initate_data.initateTxData, uid);
        let order_wallet_address = account::create_signer_with_capability(&initate_table.order_wallet_cap);

        return signer::address_of(&order_wallet_address)
    }

    #[view]
    public fun check_payment(uid: u256):bool acquires InitateTxTable{
        let initate_data = borrow_global_mut<InitateTxTable>(ADMIN);
        let initate_table = smart_table::borrow(&initate_data.initateTxData, uid);

        let order_wallet = account::create_signer_with_capability(&initate_table.order_wallet_cap);
        let order_wallet_address = signer::address_of(&order_wallet);
        let order_wallet_balance = coin::balance<AptosCoin>(order_wallet_address);

        if (order_wallet_balance >= initate_table.amount) {
            return true
        } else {
            return false
        }
    }

}