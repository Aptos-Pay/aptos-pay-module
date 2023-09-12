import { claimPayments } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST(request: Request) {
  try {
    const claimPaymentsResult = await claimPayments(
      process.env.PRIVATE_KEY as string,
      process.env.MODULE_ADDRESS as string
    );

    if (!claimPaymentsResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Claiming payments failed',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: claimPaymentsResult.success,
        message: 'Claiming payments successful',
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(error);
  }
}
