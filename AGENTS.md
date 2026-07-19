# AGENTS.md

Vite + React 19 + TypeScript e-commerce storefront with Tailwind CSS v4.

## Commands

| Command             | Action                                          |
|---------------------|--------------------------------------------------|
| `npm run dev`       | Start Vite dev server                            |
| `npm run build`     | `tsc -b` (project references) then `vite build`  |
| `npm run lint`      | `eslint .` (flat config, ESLint 10)              |
| `npm run preview`   | `vite preview`                                   |

- `tsc -b` uses both `tsconfig.app.json` (src/) and `tsconfig.node.json` (vite.config.ts).

## Toolchain quirks

- **TypeScript ~6.0**, ESLint 10, Vite 8, Tailwind CSS v4 — all recent major versions.
- Flat ESLint config (`eslint.config.js`), no `.eslintrc`.
- `verbatimModuleSyntax` on: use `import type` for type-only imports.
- `erasableSyntaxOnly` on: no enums, namespaces, or `constructor`-parameter visibility modifiers.
- Tailwind CSS v4 uses `@import "tailwindcss"` (no `tailwind.config.js` needed).
- `react-refresh/only-export-components` lint rule requires eslint-disable on context hook re-exports.
- **No test framework** installed yet.

## Key dependencies

| Package | Usage |
|---|---|
| `pocketbase` | Client SDK — wrapped in `src/lib/pocketbase.ts`, expects `VITE_PB_URL` env var |
| `react-hook-form` + `zod` | Form validation in `CheckoutForm.tsx` |
| `react-dropzone` | Payment screenshot upload in `ManualPayment.tsx` |
| `lucide-react` | Icons throughout |

## Architecture

- **State-based tab navigation** (no react-router). Tabs: Products, Categories, About, Wishlist, Profile.
- `src/context/CartContext.tsx` — global cart with items, quantity control, discount codes (`SAVE10`, `WELCOME20`).
- `src/context/WishlistContext.tsx` — favorited product IDs.
- `src/data/products.ts` — mock catalog (20 products across 7 categories, Health Care split into Oils/Soaps).
- `src/pages/` — one component per tab.
- `src/components/` — Navbar, ProductCard, ReviewSection, CheckoutForm, ManualPayment, PaymentSplitter.
- `src/App.tsx` — wraps `CartProvider` > `WishlistProvider`, renders active tab or checkout view.

## Pakistan payment flow

- Payment splitter (radio): **COD** (adds Rs. 200 flat fee) vs **Bank Transfer** (shows HBL account details + manual screenshot uploader).
- Discount codes apply percentage off subtotal before COD fee.
- PocketBase orders created on submit; payment screenshots uploaded to `payment_screenshots` collection.

## What is missing

- PocketBase server setup / env vars (falls back to `http://127.0.0.1:8090`)
- Tests (no test runner installed)
- CI/CD
