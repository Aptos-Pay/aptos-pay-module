import { performTx } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST(request: Request, response: Response) {
  try {
    // const { receiverAddress, amount } = request.body;

    const tempWallet = await performTx(
      'asd',
      1,
      'asd',
      process.env.ADDRESS || '',
      process.env.PRIVATE_KEY || ''
    );

    const address = tempWallet.address;
    const publicKey = tempWallet.publicKeyHex;
    const privateKey = tempWallet.privateKeyHex;

    return NextResponse.json(
      {
        address,
        publicKey,
        privateKey,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(error);
  }
}
