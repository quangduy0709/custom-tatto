import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-type", "application/liquid");
  res.send(`
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
  #shopify-section-sections--17815367385378__header, #shopify-section-sections--17815367385378__announcement-bar{
    display:none
  }
  </style>
  <script>
  window.addEventListener('message', function(event) {
    if (event.data.type === 'submitForm') {
      var formData = event.data.data;   
      var form = document.getElementById('form');
      var customizedId =  document.getElementById('customized_id');
      customizedId.value = formData.customizedId;
      form.submit();    
    }
  });
  </script>
  <iframe class="w-full h-screen" src="https://bb93-222-252-30-163.ngrok-free.app/"></iframe>
  <form action="/cart/add" method="post" id="form">
  <input type="hidden" name="id" value="44670232199458" />
  <input type="hidden" name="Color" value="Silver" />
  <input type="hidden" name="quantity" value="1" />
  <input type="hidden" name="properties[Customize Id]" value="1" id="customized_id" />
</form>`);
}
