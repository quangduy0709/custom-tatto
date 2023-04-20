import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-type", "application/liquid");
  res.send(`
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
  window.addEventListener('message', function(event) {
    if (event.data.type === 'submitForm') {
      var formData = event.data.data;
      var form = document.getElementById('form');
      form.submit();    
    }
  });
  </script>
  <iframe class="w-full h-[88vh]" src="https://custom-tatto.vercel.app/"></iframe>
  <form action="/cart/add" method="post" id="form">
  <input type="hidden" name="id" value="44670232199458" />
  <input type="hidden" name="Color" value="Silver" />
  <input type="hidden" name="quantity" value="1" />
</form>`);
}
