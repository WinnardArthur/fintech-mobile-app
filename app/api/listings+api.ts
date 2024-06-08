import { listingsData } from "@/data";

export async function GET(req: Request) {
  console.log("are you running");

  // const body = await req.json();
  // const limt = body?.limit || 5;

  // console.log({ body });

  // const response = await fetch(
  //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limt=${limt}&convert=EUR`,
  //   { headers: { "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY! } }
  // );

  // const result = await response.json();

  return Response.json(listingsData);
}

