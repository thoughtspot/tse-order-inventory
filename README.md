# Inventory Order System

A simple React/Next.js application for managing inventory orders with SKU codes and quantities.

## Features

- **Home Page**: Welcome page describing the inventory order system
- **Order Page**: Form to add SKU codes and quantities for ordering
- **URL Parameters**: Pre-populate SKUs via URL parameters (e.g., `/order?sku=ABC123&sku=XYZ789`)
- **Dynamic Form**: Add/remove multiple SKU items
- **Order Confirmation**: Success page showing order details and delivery timeline

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Home Page** (`/`): Overview of the system with navigation to order page
2. **Order Page** (`/order`): Add SKU codes and quantities
3. **Pre-filled Orders** (`/order?sku=ABC123&sku=XYZ789`): Start with pre-populated SKUs
4. **Order Confirmation** (`/order/confirmation`): Shows order success and delivery timeline

## Routes

- `/` - Home page with system description
- `/order` - Order form for adding SKUs and quantities
- `/order/confirmation` - Order success page

## Technologies

- Next.js 15.5.5
- React 19.1.0
- TypeScript
- CSS Modules for styling
