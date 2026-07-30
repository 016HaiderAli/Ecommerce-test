# E-commerce Storefront

A React + TypeScript + Vite storefront demo built with Tailwind CSS v4 and PocketBase integration.

## What this project is

This repository contains an e-commerce storefront demo application. It uses a state-based tab navigation layout rather than client-side routing, and it is built to demonstrate a product catalog experience, wishlist management, cart handling, checkout flow, and a manual payment upload option.

## Features

- Product browsing with category filters
- Wishlist support for favoriting and unfavoriting products
- Shopping cart with quantity controls and price calculation
- Discount code support (`SAVE10`, `WELCOME20`)
- Checkout form with order submission
- Payment options: Cash on Delivery (COD) and Bank Transfer
- Manual bank transfer screenshot upload
- PocketBase client SDK integration for orders, users, and payment screenshots
- Responsive UI with Tailwind CSS and reusable React components

## Tech stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- PocketBase client SDK
- React Hook Form + Zod
- React Dropzone
- Lucide React icons

## Getting started

### Clone the repository

```bash
git clone https://github.com/<your-username>/opencode-ecommerce-test.git
cd opencode-ecommerce-test
```

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open the local URL shown in the terminal to view the storefront.

## Notes

- The project uses `tsconfig.app.json` and `tsconfig.node.json` for TypeScript configuration.
- No test framework is included currently.
- PocketBase server setup is not included; the client defaults to `http://127.0.0.1:8090` if no environment variable is provided.
