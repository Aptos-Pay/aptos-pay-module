import { getPaymentAddressByUid } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const paymentAddress = await getPaymentAddressByUid(
    '001',
    process.env.ADDRESS || ''
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
