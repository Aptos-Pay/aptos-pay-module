import { initShop } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST(request: Request) {
  try {
    // const params = new URLSearchParams(
    //   request.url.slice(request.url.indexOf('?'))
    // );
    // const address = params.get('address');

    const shopInitResult = await initShop(
      process.env.PRIVATE_KEY || '',
      process.env.ADDRESS || '' //contract address (the same as public address)
    );

    if (!shopInitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Shop init failed',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: shopInitResult.success,
        message: 'Shop init successfull',
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(error);
  }
}
