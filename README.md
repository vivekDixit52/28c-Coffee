# 28°C Hand Beaten Coffee: Demo Website

A fully responsive demo website for **28°C Hand Beaten Coffee Shop**, Palam Vihar, Gurugram.
Built with plain HTML, CSS and JavaScript. No frameworks, no build step.

## Features
- Responsive layout for laptop, tablet and mobile
- Full menu in four categories: Hand Beaten Coffee, Mocktails, Virgin Mojito, Shakes
- M / L prices on every drink that has two sizes
- Order panel with quantity buttons and a running total
- One-tap order sending through WhatsApp
- Google Maps embed and "Open in Google Maps" button
- Mobile hamburger menu, keyboard-friendly focus styles, reduced-motion support

## Folder structure
```
28c-coffee/
├── index.html        Page structure and content
├── css/
│   └── style.css     All styling and responsive breakpoints
├── js/
│   └── script.js     Menu data, order panel, WhatsApp link
├── README.md
└── README.txt
```

## How to run
1. Unzip the folder.
2. Double-click `index.html` to open it in any browser.

To run it on a local server instead (optional):
```
npx serve .
```

## Customise
| What | Where |
|------|-------|
| WhatsApp number | `WHATSAPP_NUMBER` at the top of `js/script.js` (country code + number, no `+`) |
| Shop name in the order message | `SHOP_NAME` in `js/script.js` |
| Menu items and prices | `MENU` list in `js/script.js` |
| Opening hours, address text | Visit section in `index.html` |
| Colours | CSS variables at the top of `css/style.css` |
| Fonts | Google Fonts link in `index.html` and `--display` / `--body` variables |

Each menu item uses the format `[name, description, mediumPrice, largePrice]`.
For single-price items, leave out the last value.

## Responsive breakpoints
- **900px and below (tablet):** single-column hero, stacked sections
- **700px and below (mobile):** hamburger navigation, single-column menu, order panel slides up from the bottom

## Deploy for free
1. **Vercel or Netlify:** drag and drop the folder to get a live link.
2. **GitHub Pages:** push the folder to a repository and enable Pages in its settings.

## Notes
- Menu and prices are based on the shop's printed menu. Confirm them with the owner before launch.
- The Boba-Tea Shake large price (₹150) should be double-checked.
- Opening hours are sample text.
- This is a demo. Online payments and a real ordering backend are not included.

## Next steps (paid version)
- Real photos of drinks and the shop
- Online payment (UPI / Razorpay)
- Table booking form
- Admin page to edit the menu
- Google Business Profile and SEO setup

## Contact
Built by Vivek Dixit, freelance frontend and Java full stack developer.
Portfolio: https://vivekdixit-portfolio.vercel.app
