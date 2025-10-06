# Create Invoice Easy

Create Invoice Easy is a Next.js application that helps freelancers and small teams craft polished invoices in minutes. The experience focuses on swift data entry, live previews, and ready-to-print PDFs, all while keeping branding consistent with an emerald-toned interface.

## Features

- **Guided invoice creation** – Collect client, issuer, deadline, and description details with validation directly in `src/app/invoice/new/page.tsx`.
- **Crypto or traditional payments** – Toggle between wallet fields (address and blockchain network) or a payment URL for general invoices.
- **Real-time preview** – See invoices update instantly as you type, ensuring formatting tweaks are caught before sharing.
- **PDF-ready print view** – Store invoice data in session storage and render a printer-friendly layout via `src/app/invoice/print/page.tsx`.
- **Farcaster mini-app integration** – Initialize the Farcaster Mini App SDK (`@farcaster/miniapp-sdk`) so invoices can launch inside Warpcast.
- **Accessible Tailwind UI** – Use emerald gradients, high contrast text, and responsive layouts for pleasant usage across devices.

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Run the development server**

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to explore the app.

> Tip: Update environment variables or API endpoints in `next.config.js` or `.env` files as you integrate backend services.

## Usage

1. Navigate to `/invoice/new`.
2. Enter issuer and client information, invoice description, amount, currency, and deadline.
3. Select **General** or **Crypto** to reveal the relevant payment fields.
4. Click **Generate Invoice** to validate the form.
5. Choose **Print PDF** to view a formatted summary in `/invoice/print` and download or print it.

## Farcaster Mini App Notes

- The root page (`src/app/page.tsx`) calls `sdk.actions.ready()` from `@farcaster/miniapp-sdk` to support embedding inside Farcaster.
- When deploying as a Farcaster mini-app, ensure the application URL is registered and cached per Farcaster requirements.

## Project Structure Overview

- `src/app/page.tsx` – Landing page and Farcaster integration bootstrap.
- `src/app/invoice/new/page.tsx` – Interactive invoice builder with preview.
- `src/app/invoice/print/page.tsx` – Printer-friendly invoice renderer.
- `public/.well-known/farcaster.json` – Farcaster mini-app metadata manifest.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with custom emerald palette
- **State & Storage**: React hooks with session storage bridge for printing
- **Ecosystem**: Farcaster Mini App SDK for Warpcast compatibility

## Roadmap Ideas

- **[ ]** Persist invoices to a database for retrieval history.
- **[ ]** Email invoices directly from the print view.
- **[ ]** Add multi-item line support instead of a single description field.

## Contributing

- **Fork & clone** this repository.
- Create a feature branch based on `main`.
- Follow repository linting/testing guidelines (add `pnpm test` when available).
- Submit a pull request describing the changes and screenshots for UI updates.

## Deployment

Deploy on [Vercel](https://vercel.com/) or your preferred platform. Ensure environment variables and Farcaster metadata are configured before going live.
