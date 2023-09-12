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

declare namespace AptosPay {
  export { getTempWallet, getBalance, createOrder };
}

export = AptosPay;
