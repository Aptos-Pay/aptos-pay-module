import { checkPaymentStatus } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const params = new URLSearchParams(
    request.url.slice(request.url.indexOf('?'))
  );
  const amount = params.get('amount');

  const paymentStatus = await checkPaymentStatus(
    amount as string,
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
