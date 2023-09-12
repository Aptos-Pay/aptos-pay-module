module owner::aptospay{

    use std::signer;
    use std::string;
    use std::table;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::account::{Self};

    const EINVALID_DEDICATED_INITIALIZER: u64 = 1;


    const ADMIN: address = @owner;

    struct InitateTx has key {
        uid: u64,
        amount: u64,
        address: address,
    }

    struct ProcessTx has key {
        uid: u64,
        amount: u64,
        address: address,
    }

    public entry fun init(signer: &signer){
        let admin = signer::address_of(signer);
        assert!(admin == @owner, EINVALID_DEDICATED_INITIALIZER);

        let initateTable = table::new(uid, InitateTx);
        let processTable = table::new(uid, ProcessTx);
    }
}