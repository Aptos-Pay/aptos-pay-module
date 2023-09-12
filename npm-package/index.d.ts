declare function getTempWallet(): {
  address: string;
  privateKeyHex: string;
  publicKeyHex: string;
};
declare function getBalance(address: string): Promise<string>;
declare function createOrder(
  amount: number,
  privateKey: string,
  contractAddress: string
): Promise<{
  success: boolean;
  orderId: number;
}>;
declare function getPaymentAddressByUid(
  orderId: string,
  contractAddress: string
);

declare namespace AptosPay {
  export { getTempWallet, getBalance, createOrder, getPaymentAddressByUid };
}

export = AptosPay;
