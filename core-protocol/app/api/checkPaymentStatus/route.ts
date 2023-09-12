import { checkPaymentStatus } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const paymentStatus = await checkPaymentStatus(
    '001',
    process.env.ADDRESS || ''
  );

  return NextResponse.json(
    {
      success: paymentStatus.success,
      status: paymentStatus.status,
    },
    {
      status: 200,
    }
  );
}
