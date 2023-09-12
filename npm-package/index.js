import { AptosAccount, AptosClient } from 'aptos';
import { HexString } from 'aptos';

function deployContract() {
  // check if contract is deployed, if not, deploy it
}

async function initShop(privateKey, contractAddress) {
  const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  try {
    const rawTx = await client.generateTransaction(walletData.address, {
      type: 'entry_function_payload',
      function: `${contractAddress}::aptospay::init`,
      type_arguments: [],
      arguments: [walletData.address],
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
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log('Error ocurred');
    console.log(error);
    return {
      success: false,
    };
  }
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

async function getPaymentAddressByUid(orderId, contractAddress) {
  const data = await new AptosClient(
    'https://fullnode.devnet.aptoslabs.com'
  ).view({
    function: `${contractAddress}::aptospay::get_uid_payment_address`,
    type_arguments: [],
    arguments: [orderId],
  });

  return data[0];
}

async function checkPaymentStatus(orderId, contractAddress) {
  try {
    const data = await new AptosClient(
      'https://fullnode.devnet.aptoslabs.com'
    ).view({
      function: `${contractAddress}::aptospay::check_payment`,
      type_arguments: [],
      arguments: [orderId],
    });

    if (data[0]) {
      return {
        success: true,
        status: 'COMPLETED',
      };
    }

    return {
      success: true,
      status: 'WAITING_FOR_PAYMENT',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 'ERROR',
    };
  }
}

module.exports = {
  initShop,
  createOrder,
  getPaymentAddressByUid,
  checkPaymentStatus,
};
