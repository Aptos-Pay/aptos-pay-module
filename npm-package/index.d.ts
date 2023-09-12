declare function initShop(
  shopOwnerAddress: string,
  privateKey: string,
  contractAddress: string
): Promise<{
  success: boolean;
}>;
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
declare function checkPaymentStatus(
  orderId: string,
  contractAddress: string
): Promise<{
  success: boolean;
  status: string;
}>;

declare namespace AptosPay {
  export { initShop, createOrder, getPaymentAddressByUid, checkPaymentStatus };
}

export = AptosPay;
