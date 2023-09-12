import { getPaymentAddressByUid } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function GET(request: Request) {
  const params = new URLSearchParams(
    request.url.slice(request.url.indexOf('?'))
  );
  const amount = params.get('amount');

  const paymentAddress = await getPaymentAddressByUid(
    amount as string,
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
