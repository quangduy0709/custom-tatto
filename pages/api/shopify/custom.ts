import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-type", "application/liquid");
  res.send(`
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="{{ 'custom-product-form.js' | asset_url }}" defer="defer"></script>
  <iframe class="w-full p-4" style="height:85vh" src="https://custom-tatto.vercel.app/"></iframe>
  <form action="/cart/add" method="post">
  <input type="hidden" name="id" value="44670232199458" />
  <input type="hidden" name="Color" value="Silver" />
  <input type="hidden" name="quantity" value="1" />
  <button type="submit" class="mr-0 md:mr-6 px-4 py-2 md:px-6 btn border-transparent border border-solid md:border-black font-bold rounded-md">Add to cart </button>
</form>`);
}
