declare function getTempWallet(): {
  address: string;
  privateKeyHex: string;
  publicKeyHex: string;
};
declare function getBalance(address: string): Promise<string>;
declare function performTx(
  orderId: string,
  amount: number,
  receiver: string,
  sender: string,
  privateKey: string
);

declare namespace AptosPay {
  export { getTempWallet, getBalance, performTx };
}

export = AptosPay;
