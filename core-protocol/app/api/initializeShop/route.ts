import { initShop } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST() {
  try {
    const shopInitResult = await initShop(
      process.env.PRIVATE_KEY as string,
      process.env.MODULE_ADDRESS as string
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
