import { checkPaymentStatus } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const referrer = request.headers.get('Referer');
  let orderId;

  if (!referrer) {
    const orderIdParam = new URLSearchParams(
      request.url.slice(request.url.indexOf('?'))
    );
  
    orderId = orderIdParam.get('orderId');
  } else{
    const params = new URLSearchParams(
      referrer.slice(referrer.indexOf('?'))
    );
  
    orderId = params.get('orderId');
  }

  if (!orderId) {
    const orderIdParam = new URLSearchParams(
      request.url.slice(request.url.indexOf('?'))
    );
  
    orderId = orderIdParam.get('orderId');
  }

  
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
