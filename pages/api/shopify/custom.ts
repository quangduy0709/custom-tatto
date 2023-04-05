import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shop, id, handle } = req.query;
  console.log(shop, id, handle);

  res.setHeader("Content-type", "application/liquid");
  res.send(
    `
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="{{ 'custom-product-form.js' | asset_url }}" defer="defer"></script>
    {% assign custom_product = all_products['${1}'] %}
    {%- assign custom_product_form_id = 'product-form-design-3d' -%}
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 w-full py-6 px-6">
    <div class="lg:col-span-3">
      <iframe class="border bg-[#f4f4f4] shadow-md rounded-md w-full p-4" style="height:85vh" src="${
        process.env.NEXTAUTH_URL
      }/customize?shop=${shop}&product_id=${id}&product_handle=${handle}"></iframe>
    </div>
    <div class="col-span-1 flex justify-center items-center pt-4 lg:pt-0">
      <custom-product-form class="custom-product-form" data-product-id={{custom_product.id}} data-shop="${shop}">
        <div class="custom-product-form__error-message-wrapper" role="alert" hidden>
          <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
            <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"/>
            <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"/>
            <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"/>
            <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
              </svg>
            <span class="custom-product-form__error-message"></span>
        </div>
          {%- form 'product', custom_product, id: custom_product_form_id, class: 'form', novalidate: 'novalidate', data-type: 'add-to-cart-form' -%}
          <input type="hidden" name="id" value="{{ custom_product.selected_or_first_available_variant.id }}" disabled>
          <div class="custom-product-form__buttons">
            <button
              type="submit"
              name="add"
              class="bg-black custom-product-form__submit button button--full-width {% if block.settings.show_dynamic_checkout and product.selling_plan_groups == empty %}button--secondary{% else %}button--primary{% endif %}"
              {% if custom_product.selected_or_first_available_variant.available == false %}disabled{% endif %}
              >
              <span>
                {%- if custom_product.selected_or_first_available_variant.available -%}
                {{ 'products.product.add_to_cart' | t }}
                {%- else -%}
                {{ 'products.product.sold_out' | t }}
                {%- endif -%}
              </span>
              <div class="loading-overlay__spinner hidden">
                <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                </svg>
              </div>
            </button>
            {%- if block.settings.show_dynamic_checkout -%}
            {{ form | payment_button }}
            {%- endif -%}
          </div>
          {%- endform -%}
      </custom-product-form>
    </div>
   </div>
    `
  );
}
