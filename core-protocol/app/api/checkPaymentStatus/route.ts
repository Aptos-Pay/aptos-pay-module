import { checkPaymentStatus } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const paymentStatus = await checkPaymentStatus(
    '3581487709',
    process.env.ADDRESS as string,
    process.env.MODULE_ADDRESS as string
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
