declare function initShop(
  privateKey: string,
  moduleAddress: string
): Promise<{
  success: boolean;
}>;
declare function createOrder(
  amount: number,
  privateKey: string,
  moduleAddress: string
): Promise<{
  success: boolean;
  orderId: number;
}>;
declare function getPaymentAddressByUid(
  orderId: string,
  storeOwnerAddress: string,
  moduleAddress: string
);
declare function checkPaymentStatus(
  orderId: string,
  storeOwnerAddress: string,
  moduleAddress: string
): Promise<{
  success: boolean;
  status: string;
}>;
declare function claimPayments(
  privateKey: string,
  moduleAddress: string
): Promise<{
  success: boolean;
  message: string;
}>;

declare namespace AptosPay {
  export {
    initShop,
    createOrder,
    getPaymentAddressByUid,
    checkPaymentStatus,
    claimPayments,
  };
}

export = AptosPay;
