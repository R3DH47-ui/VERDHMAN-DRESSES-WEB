# Vardhman School Uniforms

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_React-v0.468.0-F56565?style=flat-square)](https://lucide.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/Status-Active_Development-success?style=flat-square)]()

A high-performance, mobile-first e-commerce web application engineered for **Vardhman School Uniforms & Dresses** (Est. 1979). The platform provides an authorized, streamlined digital storefront for students and parents across North India to browse certified institutional uniforms, house sports apparel, and school accessories.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Design System & Theme](#design-system--theme)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Code Quality & Standards](#code-quality--standards)

---

## About the Project

Founded in 1979, **Vardhman School Uniforms** has served as a benchmark for quality school tailoring, certified institutional fabrics, and standardized academic dress codes. 

This web application delivers a seamless digital shopping experience tailored specifically for institutional apparel:
- **School-Centric Navigation**: Parents can select their child's specific educational institution and instantly access tailored grade-level and house requirements.
- **Mobile-First Experience**: Optimized for handheld browsing with responsive micro-interactions, intuitive gesture drawers, and quick-access bottom navigation.
- **Reliable Client State**: Fast, zero-flash cart, wishlist, and profile synchronization resilient across client hydration lifecycles.

---

## Key Features

- **Institution Directory**: Rapid filtering and browsing by institution, affiliated board, and grade tier.
- **Product Specifications**: High-definition uniform catalogs with size guides, fabric compositions, and house variations.
- **Intuitive Bottom Navigation**: Mobile application feel featuring an Amazon-style active tab indicator bar and smooth navigation transitions.
- **Hydration-Safe Client Stores**: Built with React 19's `useSyncExternalStore` for flicker-free shopping bag and wishlist state.
- **Accessible & Touch-Optimized**: Generous touch targets (min 44px), semantic ARIA labelling, and screen-reader compliant interactive elements.

---

## Technology Stack

The project is built on modern web standards with an emphasis on speed, reliability, and clean architecture:

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.6` | App Router, Turbopack, and Cache Components |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | React Server Components (RSC) and concurrent hooks |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Engine v4 with CSS `@theme` variables and zero-runtime overhead |
| **PostCSS** | `@tailwindcss/postcss` | `4.3.5` | Fast build-time CSS compilation |
| **Iconography** | [Lucide React](https://lucide.dev/) | `^0.468.0` | Crisp, scalable, tree-shakeable SVG icons |
| **Language** | Modern JavaScript | ES2024 | Clean ES Modules (pure JavaScript, zero compile overhead) |
| **Code Quality** | ESLint | `^9` with `eslint-config-next` | Strict linting, Next.js best practices, and code hygiene |

---

## Design System & Theme

The aesthetic draws inspiration from premier institutional tailoring and classic stationery, pairing a tactile, warm background with clean surfaces and high-contrast typography.

### 1. Palette & Surface Tokens
- **Warm Paper Canvas (`#FAF8F5`)**: A soft, editorial background tone that minimizes glare and feels tactile.
- **Pure White Surface (`#FFFFFF`)**: Crisp elevated cards, modular panels, and interactive elements.
- **Signature Crimson (`#B30000` / `#8F0000`)**: Deep heritage red representing trust, tradition, and prominent visual hierarchy.
- **Balanced Line Accents (`#E8E4DE` / `#D6D0C7`)**: Refined borders ensuring structured grid clarity without visual clutter.

### 2. Typography
- **Primary Typeface**: Modern, neutral system sans-serif hierarchy (Inter / Roboto fallback).
- **Tabular Figures**: Tabular numeral styling (`tabular-nums`) applied to currency, pricing tiers, and stock tallies for consistent optical alignment.
- **Microcopy**: Distinct weight hierarchy ensuring rapid visual scanning between product titles, school affiliations, and sizing charts.

### 3. Micro-Interactions
- Tactile feedback across buttons, chips, and navigational tabs.
- Subtle top indicator bar marking the active view in mobile navigation.
- Smooth bottom drawer transitions for supplemental menus and quick-access utility trays.

---

## Project Architecture

The codebase adheres to a modular, domain-driven structure separating server layouts, client-side interactive components, and state layers:

```
VARDHMAN-SCHOOL-UNIFORMS/
├── app/                  # Next.js App Router (Layouts, global styles, root providers)
├── components/           # Reusable UI component library
│   ├── home/             # Homepage banners, institution highlights, category grids
│   ├── layout/           # Header, bottom navigation, and mobile menu drawers
│   ├── product/          # Product display cards, filters, and size selectors
│   ├── profile/          # Account management, orders list, and user preferences
│   └── ui/               # Atom-level primitives (buttons, modals, badges, inputs)
├── context/              # Hydration-safe React state providers (Cart, Wishlist, Profile)
├── data/                 # Catalog datasets, partner school registries, mock inventories
├── lib/                  # Utility helpers, class merging helpers (cn), formatters
├── public/               # Static brand assets, school emblems, and imagery
└── services/             # Client service layer and data fetchers
```

### Architectural Principles
- **Server Components First**: Pages and static catalog listings render as Server Components for minimal client-bundle overhead.
- **Client Components on Demand**: Client components (`"use client"`) are strictly scoped to interactive boundaries (carousels, modal drawers, dynamic filters).
- **Hydration Safety**: State persistence leverages `useSyncExternalStore` with strict server-safe fallback snapshots to guarantee zero SSR hydration mismatches.

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node `v20+` recommended)
- **Package Manager**: `npm` (bundled with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/R3DH47-ui/VERDHMAN-DRESSES-WEB.git
   cd VERDHMAN-DRESSES-WEB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to preview the storefront.

---

## Available Scripts

The project includes standard npm scripts defined in `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Starts the Next.js development server with Turbopack |
| `npm run dev:lan` | `next dev -H 0.0.0.0` | Starts the development server binding to all network interfaces for multi-device testing |
| `npm run lint` | `eslint` | Runs ESLint across the codebase to check syntax and code quality |

---

## Code Quality & Standards

- **Zero Hydration Mismatch Guarantee**: Components avoid browser-only globals during server pre-rendering.
- **Pure JavaScript**: Clean, standard modern JavaScript (no TypeScript compilation step required).
- **Accessibility**: Semantic HTML5 markup, keyboard navigability, and high-contrast compliance.
- **Strict Linting**: Verified against Next.js core web vitals and ESLint best practices.

---

## License & Attribution

&copy; 1979&ndash;2026 **Vardhman School Uniforms & Dresses**. All rights reserved.  
*All institutional insignias, school emblems, and registered uniform designs are the property of their respective partner institutions.*
