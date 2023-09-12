import { getPaymentAddressByUid } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const paymentAddress = await getPaymentAddressByUid(
    '3581487709',
    process.env.ADDRESS as string,
    process.env.MODULE_ADDRESS as string
  );

  return NextResponse.json(
    {
      success: true,
      paymentAddress,
    },
    {
      status: 200,
    }
  );
}
