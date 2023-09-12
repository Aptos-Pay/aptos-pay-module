import { getTempWallet } from 'aptos-pay';
import { NextResponse } from 'next/server';

export function POST(request: Request, response: Response) {
  try {
    // const { receiverAddress, amount } = request.body;

    const tempWallet = getTempWallet();

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
