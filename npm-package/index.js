import { signTransaction, AptosAccount, AptosClient } from 'aptos';
import { HexString } from 'aptos';

function getTempWallet() {
  const tmpWallet = new AptosAccount();
  return tmpWallet;
}

function deployContract() {
  // check if contract is deployed, if not, deploy it
}

async function performTx(orderId, amount, receiver, sender, privateKey) {
  await deployContract();
  const sendInitializationTx = await sendInitializationTx(
    orderId,
    amount,
    receiver,
    sender,
    privateKey
  );

  return walletData;
}

async function sendInitializationTx(
  orderId,
  amount,
  receiver,
  sender,
  privateKey
) {
  const client = new AptosClient('https://fullnode.testnet.aptoslabs.com');

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  // const rawTx = await client.generateTransaction(walletData.address, {
  //   function: '0x1::coin::transfer', // TODO: ADD REAL FUNCTION NAME
  //   type_arguments: ['0x1::aptos_coin::AptosCoin'], // TODO: ADD REAL TYPE ARGUMENTS
  //   arguments: [orderId, receiver, amount],
  // });

  // const signedTx = client.signTransaction(adminWallet, rawTx);

  // const submittedTx = client.submitTransaction(signedTx);

  console.log('rawTx', rawTx);

  return walletData;
}

// async function sendTx

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
  performTx,
};
