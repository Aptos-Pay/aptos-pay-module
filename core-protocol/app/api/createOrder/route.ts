import { createOrder } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST(request: Request) {
  try {
    const amount = (await request.json()).amount;

    const orderCreationResult = await createOrder(
      amount * 10 ** 8,
      process.env.PRIVATE_KEY as string,
      process.env.MODULE_ADDRESS as string
    );

    if (!orderCreationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order creation failed',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: orderCreationResult.success,
        message: 'Order created',
        orderId: orderCreationResult.orderId,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(error);
  }
}
