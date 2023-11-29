import { AptosAccount, AptosClient } from 'aptos';
import { HexString } from 'aptos';

const DEVNET_NODE = 'https://fullnode.devnet.aptoslabs.com';
async function initShop(privateKey, moduleAddress, NODE_URL = DEVNET_NODE) {
  const client = new AptosClient(NODE_URL);

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  try {
    const rawTx = await client.generateTransaction(walletData.address, {
      type: 'entry_function_payload',
      function: `${moduleAddress}::aptospay::init`,
      type_arguments: [],
      arguments: [walletData.address],
    });

    const submittedTx = await client.signAndSubmitTransaction(
      adminWallet,
      rawTx
    );

    const result = await client.waitForTransactionWithResult(submittedTx);

    if (result.success === false) {
      console.log('Transaction Failed When Initializing', result.vm_status);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log('AptosPay Error: ', error);
    return {
      success: false,
    };
  }
}

async function createOrder(
  amount,
  privateKey,
  moduleAddress,
  NODE_URL = DEVNET_NODE
) {
  const client = new AptosClient(NODE_URL);

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
      function: `${moduleAddress}::aptospay::create_order`,
      type_arguments: [],
      arguments: [orderId, amount],
    });

    const submittedTx = await client.signAndSubmitTransaction(
      adminWallet,
      rawTx
    );

    const result = await client.waitForTransactionWithResult(submittedTx);

    if (result.success === false) {
      console.log('Transaction Failed When Creating Order', result.vm_status);
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
    console.log('AptosPay Error: ', error);
    return {
      success: false,
      orderId: undefined,
    };
  }
}

async function getPaymentAddressByUid(
  orderId,
  storeOwnerAddress,
  moduleAddress,
  NODE_URL = DEVNET_NODE
) {
  try {
    const data = await new AptosClient(NODE_URL).view({
      function: `${moduleAddress}::aptospay::get_uid_payment_address`,
      type_arguments: [],
      arguments: [orderId, storeOwnerAddress],
    });

    return data[0];
  } catch (error) {
    console.log('AptosPay Error: ', error);
    return {
      success: false,
      status: 'ERROR',
    };
  }
}

async function checkPaymentStatus(
  orderId,
  storeOwnerAddress,
  moduleAddress,
  NODE_URL = DEVNET_NODE
) {
  try {
    const data = await new AptosClient(NODE_URL).view({
      function: `${moduleAddress}::aptospay::check_payment`,
      type_arguments: [],
      arguments: [orderId, storeOwnerAddress],
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
    console.log('AptosPay Error: ', error);
    return {
      success: false,
      status: 'ERROR',
    };
  }
}

async function claimPayments(
  privateKey,
  moduleAddress,
  NODE_URL = DEVNET_NODE
) {
  const client = new AptosClient(NODE_URL);

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  try {
    const rawTx = await client.generateTransaction(walletData.address, {
      type: 'entry_function_payload',
      function: `${moduleAddress}::aptospay::get_all_payments`,
      type_arguments: [],
      arguments: [],
    });

    const submittedTx = await client.signAndSubmitTransaction(
      adminWallet,
      rawTx
    );

    const result = await client.waitForTransactionWithResult(submittedTx);

    if (result.success === false) {
      console.log('Transaction Failed When Claiming', result.vm_status);
      return {
        success: false,
        message: 'ERROR',
      };
    }
    return {
      success: true,
      message: 'Payments claimed',
    };
  } catch (error) {
    console.log('AptosPay Error: ', error);
    return {
      success: false,
      message: 'ERROR',
    };
  }
}

module.exports = {
  initShop,
  createOrder,
  getPaymentAddressByUid,
  checkPaymentStatus,
  claimPayments,
};
