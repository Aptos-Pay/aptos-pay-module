import { getTempWallet } from 'aptos-pay';
import { NextResponse } from 'next/server';

export function POST(request: Request) {
  // console.log(alice);

  // console.log('test');

  // console.log(helloWorld());

  const tempWallet = getTempWallet();

  return NextResponse.json(
    {
      tempWallet,
    },
    {
      status: 200,
    }
  );
}
