import { getBalance } from 'aptos-pay';

export async function GET(request: Request) {
  try {
    const params = new URLSearchParams(
      request.url.slice(request.url.indexOf('?'))
    );
    const address = params.get('address');

    const balance = await getBalance(address ? address : '');
    console.log(balance);

    return new Response(JSON.stringify(balance));
  } catch (error: any) {
    return new Response(error);
  }
}
