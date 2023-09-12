import { checkPaymentStatus } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const referrer = request.headers.get('Referer');

  if (!referrer) {
      //handle no referrer error here
    return;
  }

  const params = new URLSearchParams(
    referrer.slice(referrer.indexOf('?'))
  );

  const orderId = params.get('orderId');

  const paymentStatus = await checkPaymentStatus(
    orderId as string,
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
