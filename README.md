# Gift Me

A playful, interactive birthday wishlist website built to make gift-giving considerably less mysterious.

Instead of sending a pile of product links and hoping someone remembers what you actually wanted, **Gift Me** presents a curated wishlist with product details, priorities, gift claiming, a random gift picker, birthday messages, and a small admin view.

**Live Demo:** https://gift-me-puce.vercel.app/

## Features

- **Editorial wishlist** with product cards, categories, prices, descriptions, priorities, and purchase links.
- **Product details modal** for viewing the full reason behind each wishlist item.
- **Gift claiming** so friends and family can mark an item as claimed and avoid buying the same thing twice.
- **Featured product** section for highlighting the most wanted item.
- **Random gift selector** powered by Anime.js for choosing a gift when indecision inevitably wins.
- **Birthday message wall** where visitors can leave a personal message.
- **Admin view** for adding, editing, and deleting wishlist items and managing messages.
- **Delivery information modal** for sharing delivery details with gift-givers.
- **Persistent browser storage** using `localStorage`, so product claims and messages survive page refreshes on the same browser.
- **Animated UI** with GSAP, Anime.js, a custom cursor, and a preloader.
- **Responsive design** built for both desktop and mobile layouts.

## Tech Stack

- **Next.js 16** with the App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **GSAP** for animation and motion
- **Anime.js** for interactive animation
- **canvas-confetti** for celebratory effects
- **Lucide React** for icons

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

```bash
git clone https://github.com/ishaancreates/gift-me.git
cd gift-me
npm install
```

### Run the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The page will automatically reload as you edit the source files.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## Project Structure

```text
gift-me/
├── app/
│   ├── components/
│   │   ├── AdminView.tsx
│   │   ├── ClaimModal.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── DeliveryModal.tsx
│   │   ├── FeaturedProduct.tsx
│   │   ├── Hero.tsx
│   │   ├── IntroSection.tsx
│   │   ├── MessageWall.tsx
│   │   ├── PillNavbar.tsx
│   │   ├── Preloader.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   ├── RandomGiftSelector.tsx
│   │   └── WishlistGrid.tsx
│   ├── data/
│   │   └── wishlist.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

## How It Works

The wishlist is initialized from `app/data/wishlist.ts`, which contains the product catalogue and sample birthday messages.

The main page in `app/page.tsx` manages the application state for products, claims, messages, and the admin/home view. Changes are persisted in browser `localStorage` under the keys:

```text
wishlist_products_v2
wishlist_messages_v1
```

Because the data is stored locally in the browser, this version does **not** use a database or shared backend. A claim made in one browser will not automatically appear in another browser.

## Customizing the Wishlist

Edit `app/data/wishlist.ts` to change the initial products and messages.

Each wishlist product supports:

```ts
{
  id: string;
  number: string;
  name: string;
  category: 'TECH' | 'FASHION' | 'BOOKS' | 'GAMING' | 'ACCESSORIES' | 'OTHER';
  price: string;
  image: string;
  description: string;
  whyIWantIt: string;
  purchaseUrl: string;
  priority: 'MUST HAVE' | 'HIGH' | 'NICE TO HAVE';
  featured?: boolean;
  claimed?: boolean;
}
```

Set `featured: true` on the item you want to use as the featured product.

## Deployment

The project is configured as a standard Next.js application and can be deployed to Vercel or another platform that supports Next.js.

For a production build:

```bash
npm run build
npm start
```

## Notes

This project is intentionally simple and frontend-focused. There is no authentication layer, database, or server-side claim management in the current implementation. The admin controls are therefore suitable for a personal project, not a multi-user production application where access control actually matters, a concept humanity occasionally remembers after deployment.

## Contributing

This is primarily a personal birthday wishlist project, but improvements, bug fixes, and creative UI ideas are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run `npm run lint` and `npm run build`.
5. Open a pull request.

## License

No license is currently specified for this repository. Unless a license is added, the project's source code should not be assumed to be freely reusable.

## Author

**Ishaan Pandey**

GitHub: https://github.com/ishaancreates

---

Made for one very specific problem: making sure the birthday gifts are actually the right ones.
