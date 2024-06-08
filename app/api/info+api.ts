import { infoData } from '@/data';
export async function GET(req: Request) {
  //   const response = await fetch(
  //     `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
  //     { headers: { "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY! } }
  //   );

  //   const result = await response.json();

  return Response.json({ infoData });
}


