import { signTransaction, AptosAccount, AptosClient } from 'aptos';
import { HexString } from 'aptos';

function getTempWallet() {
  const tmpWallet = new AptosAccount();
  return tmpWallet;
}

function deployContract() {
  // check if contract is deployed, if not, deploy it
}

async function createOrder(amount, privateKey, contractAddress) {
  const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  const min = 1;
  const max = 99999999999999;
  const orderId = min + (randomValue[0] % (max - min + 1));

  try {
    const rawTx = await client.generateTransaction(walletData.address, {
      type: 'entry_function_payload',
      function: `${contractAddress}::aptospay::create_order`,
      type_arguments: [],
      arguments: [orderId, amount],
    });

    const submittedTx = await client.signAndSubmitTransaction(
      adminWallet,
      rawTx
    );

    const result = await client.waitForTransactionWithResult(submittedTx);

    if (result.success === false) {
      console.log('Transaction Failed');
      console.log(result.vm_status);
      return {
        success: false,
        orderId: undefined,
      };
    }
    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.log('Error ocurred');
    console.log(error);
    return {
      success: false,
      orderId: undefined,
    };
  }
}

async function getBalance(address) {
  // const provider = new Provider(Network.TESTNET);
  // const account = await provider.getAccount(address);

  const balance = await new AptosClient(
    'https://fullnode.testnet.aptoslabs.com'
  ).view({
    function: '0x1::coin::balance',
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
    arguments: [address],
  });

  return balance / 10 ** 8;
}

module.exports = {
  getTempWallet,
  getBalance,
  createOrder,
};
