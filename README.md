# PRECIOUS BOUTIQUE — Fashion Store Website

A responsive, editorial-style fashion storefront built with plain HTML, CSS, and JavaScript. No build tools or installation required.

## Features
- Responsive desktop and mobile layout
- Fashion hero banner and editorial campaign section
- Product grid with sample products and NGN prices
- Category filters and product search
- Interactive shopping bag with quantity controls and subtotal
- Newsletter sign-up interaction (demo only)
- Accessible labels and semantic sections

## Open locally
1. Extract the ZIP file.
2. Open `index.html` in a web browser.
3. Keep `style.css` and `script.js` beside `index.html`.

## Customize the store
- **Brand name:** Search for `PRECIOUS BOUTIQUE` in `index.html`.
- **Products, prices, photos:** Edit the `products` array near the top of `script.js`.
- **Colors and fonts:** Edit the CSS variables at the top of `style.css`.
- **Hero/campaign photos:** Change the Unsplash image URLs in `style.css`.
- **Contact and social links:** Update the footer in `index.html`.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` (or upload the extracted contents).
3. Open **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for the published URL to appear in the Pages section.

## Important before launch
This is a front-end demo storefront. The cart works in the browser but does not save orders or process payments. Newsletter sign-up is also not connected to an email service. Connect a trusted commerce/checkout provider and configure shipping, returns, privacy, and contact information before accepting real orders.

Product and editorial images load from Unsplash, and fonts load from Google Fonts, so an internet connection is needed for those remote assets.
