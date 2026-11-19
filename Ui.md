# Vardhman School Uniforms — Complete UI & Codebase Specification (Single Source of Truth)

> **Document Purpose**: This file serves as the definitive reference manual and full source-code index for the **Vardhman School Uniforms (Est. 1979)** Next.js web application. Any AI assistant or developer can inspect this single file to understand every directory, file path, image asset, data model, React component, context provider, and design token without scanning the repository.

---

## 1. Project Overview & Architecture

- **Project Name**: Vardhman School Uniforms
- **Founding Heritage**: Est. 1979 · Official supplier for 80+ educational institutions across North India.
- **Framework**: Next.js 16.4.6 (App Router, Webpack builder, Partial Prerendering enabled, React 19.3.0).
- **Styling**: Tailwind CSS v4.3.3 (`@import "tailwindcss";` with `@theme` block in `app/globals.css`).
- **Icons**: `lucide-react` v0.468.0.
- **Typography**: Flipkart-style clean sans-serif powered by `Roboto` (weights 400, 500, 700) + `Inter` fallback via `next/font/google`. All serif fonts have been removed. Numerals use tabular lining digits (`font-variant-numeric: tabular-nums lining-nums;`).
- **Color Scheme & Dark Reader Defense**: Hardened against Dark Reader or browser auto-inversion via `color-scheme: only light !important`, `@custom-variant dark`, and explicit warm off-white background `#FAF8F5`.
- **Motion & RTL Transitions**:
  - `HERO_INTERVAL_MS = 6000` (auto-advancing hero background with CSS translate right-to-left RTL motion).
  - `SLIDER_INTERVAL_MS = 6000` (category carousel auto-advancing RTL).
  - `SLIDE_DURATION_MS = 700` with `SLIDE_DIRECTION = "rtl"`.
  - Full accessibility: pause on hover, keyboard focus, and `document.hidden`; autoplay disabled under `prefers-reduced-motion`.
- **Seeded Cart Demo**: `SEED_DEMO_CART = true` pre-seeds 4 distinct garments matching the approved specification.
- **Profile Store**: Unified `ProfileContext` with `useSyncExternalStore` for instantaneous, zero-cascade cross-tab and in-tab synchronization across Header avatar, Home greeting, and Account page.

---

## 2. Complete Directory & File Index

```
c:\Users\Super Admin\OneDrive\Desktop\VERDHMAN-SCHOOL-UNIFORMS\
├── app/                                       # Next.js App Router Root
│   ├── account/page.js                        # Account & Profile Management with Edit Modal
│   ├── cart/page.js                           # Cart with 4 Demo Items & Unclipped Sticky Price Details
│   ├── checkout/page.js                       # 3-Step Checkout Flow (Address, Payment, Confirmation)
│   ├── orders/page.js                         # Orders tracking (Ongoing, Delivered, Cancelled tabs)
│   ├── product/[id]/page.js                   # Static Param Generator for Product Detail
│   ├── product/[id]/ProductDetailClient.js    # Interactive Product View (Image, Size, Specs, Cart)
│   ├── schools/page.js                        # Authorized Schools Directory (84+ schools search & tabs)
│   ├── schools/[slug]/page.js                 # Static Param Generator for School Uniforms
│   ├── schools/[slug]/SchoolUniformClient.js  # Class Selector & School Prescribed Uniforms
│   ├── shop/page.js                           # Complete 20-Product Catalog (4-col grid, filter chips)
│   ├── wishlist/page.js                       # Saved Favorites Grid
│   ├── globals.css                            # Tailwind v4 Theme Tokens, Tabular Figures, Type Scale
│   ├── layout.js                              # Root Layout (Roboto/Inter, Providers, Header, Footer)
│   └── page.js                                # Home Page (Hero Slideshow, Rohan Section, Category Slider)
├── components/
│   ├── home/
│   │   ├── CategorySlider.js                  # 6-Category RTL Auto-Slider with dynamic min price
│   │   ├── HeroContent.js                     # Single dedicated Hero copy & CTAs overlay layer
│   │   └── HeroSlideshow.js                   # 5-Slide RTL Dynamic Slideshow with pause & dots
│   ├── layout/
│   │   ├── BottomNav.js                       # Mobile Sticky Bottom Navigation Bar (7 items)
│   │   ├── BrandLogo.js                       # Official Logo loader with VSU Red Monogram Fallback
│   │   ├── Footer.js                          # Desktop Footer with SSR-safe dynamic year
│   │   └── Header.js                          # Pill Floating Card with Red Border, Nav & Reactive Avatar
│   ├── product/
│   │   └── ProductCard.js                     # Unified Product Card (Badge, Soft Tile, Tabular Price)
│   ├── profile/
│   │   └── ProfileModal.js                    # Modal/Bottom-Sheet Profile Editor (Name, Phone, Schools)
│   └── ui/
│       ├── Badge.js                           # Color-coded badge pills (School, inSet, Status)
│       ├── Chips.js                           # Filter chips (Black active pill, beige inactive)
│       ├── OrderStepper.js                    # Order delivery tracking stepper with status nodes
│       ├── ProductImage.js                    # Fallback-safe product image wrapper
│       ├── QtyStepper.js                      # Compact +/- stepper component
│       ├── SearchBar.js                       # Search input with clear button
│       ├── SectionHeader.js                   # Section title + subtitle + VIEW ALL red link
│       ├── Tabs.js                            # Horizontal category/school tabs
│       └── Toast.js                           # Bottom-floating animated toast notification
├── context/
│   ├── CartContext.js                         # Cart reducer, pricing calculations, SEED_DEMO_CART
│   ├── ProfileContext.js                      # Reactive profile store using useSyncExternalStore
│   └── WishlistContext.js                     # Wishlist store with localStorage persistence
├── data/
│   ├── cart.js                                # 4 Pre-filled Demo Cart Items
│   ├── categories.js                          # 6 Primary Uniform Categories
│   ├── heroSlides.js                          # 5 High-Quality Photographic Hero Slides
│   ├── orders.js                              # Mock orders (Ongoing VU-24617, VU-24602, Delivered)
│   ├── products.js                            # Exactly 20 Products Catalog & Recommended items
│   ├── schools.js                             # 9 Authorized Partner Schools with color palettes
│   └── user.js                                # Default user profile (Rohan Sharma, Ludhiana)
├── docs/
│   └── IMAGE_CREDITS.md                       # Full Licensing & Source attribution for all images
├── lib/
│   ├── cn.js                                  # clsx + twMerge utility
│   ├── config.ts                              # Single Source of Truth for intervals, RTL motion, flags
│   └── format.js                              # formatPrice (₹ en-IN), calculateSavings, formatDateEnIn
├── public/
│   ├── brand/                                 # Target folder for user's official vardhman-logo.svg
│   └── images/
│       ├── categories/                        # 6 Category showcase photography tiles
│       ├── hero/                              # 5 High-resolution hero background slides
│       ├── products/                          # 20 Real garment photography files
│       └── schools/                           # School monograms and crest badges
├── eslint.config.mjs                          # ESLint config ignoring .next and build
├── jsconfig.json                              # Path alias map (@/* -> ./*)
├── next.config.mjs                            # Next.js 16 webpack, Turbopack and dev origin rules
├── package.json                               # Dependencies and build scripts
├── postcss.config.mjs                         # Tailwind PostCSS configuration
├── README.md                                  # Developer readme
└── Ui.md                                      # THIS FILE — Master UI & Code Index
```

---

## 3. Design Tokens & Styling System (`app/globals.css`)

### Color Palette

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-paper` | `#FAF8F5` | Warm off-white primary page background |
| `--color-surface` | `#FFFFFF` | Crisp white card surface, header background, modal container |
| `--color-tile` | `#F5F2ED` | Soft beige background for garment image boxes & chips |
| `--color-line` | `#E8E4DE` | Subtle light border between sections, cards, and dividers |
| `--color-line-strong` | `#D6D0C7` | Strong border on hover, badges, and card boundaries |
| `--color-ink` | `#111111` | Near-black text for headings, product titles, and black pills |
| `--color-body` | `#3D3D3D` | Dark charcoal for secondary body text and metadata |
| `--color-muted` | `#6B6B6B` | Mid-grey for class ranges, subtitles, and struck MRP |
| `--color-brand` | `#B30000` | Signature Vardhman Crimson Red (Primary CTAs, borders, highlights) |
| `--color-brand-dark` | `#8F0000` | Active/hover state for crimson red buttons |
| `--color-brand-tint` | `#FDECEC` | Soft pastel pink-red tint for badge fills & initial avatar circle |
| `--color-brand-line` | `#F2C6C6` | Accent pink-red border for brand badges and avatar ring |
| `--color-success` | `#15803D` | Deep emerald green for savings badges, "DELIVERED", and "FREE" |
| `--color-success-tint` | `#E8F5EC` | Soft light-green badge background |
| `--color-warning` | `#B45309` | Amber for "PACKED" status and alert notices |
| `--color-warning-tint` | `#FEF3C7` | Soft light-amber background |

### Border Radii & Shadows
- `--radius-card`: `12px` (Rounded corners for cards and containers)
- `--radius-btn`: `6px` (Buttons and input elements)
- `--radius-pill`: `9999px` (Header pill, filter chips, category tabs, and status pills)
- `--shadow-soft`: `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)`
- `--shadow-card`: `0 4px 14px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`

### Flipkart-Style Typography Scale
- **Font Stack**: `var(--font-sans)` -> `Roboto` (400, 500, 700) with `Inter` fallback. No serif font is imported or used.
- **Tabular Figures**: `.font-tabular`, `.tabular-nums` applies `font-variant-numeric: tabular-nums lining-nums;` ensuring numbers in ₹ prices, order numbers, and dates align without baseline jitters.
- **Type Classes**:
  - `.type-h1`: `clamp(1.75rem, 4vw, 2.75rem)`, font-weight 700, line-height 1.15.
  - `.type-h2`: `clamp(1.25rem, 2.5vw, 1.625rem)`, font-weight 700, line-height 1.25.
  - `.type-h3`: `1rem`, font-weight 500.
  - `.type-body`: `0.8125rem` (13px), font-weight 400, line-height 1.25rem.
  - `.type-eyebrow`: `0.625rem` (10px), font-weight 500, letter-spacing 0.08em uppercase.
  - `.type-price`: font-weight 700 with tabular figures.

---

## 4. Complete Photographic Asset Inventory

All images are stored locally under `/public/images/` and documented in `docs/IMAGE_CREDITS.md`:

### Hero Slides (`/public/images/hero/`)
1. `hero-1.jpg` (338 KB): Senior students walking on campus in official uniforms (Unsplash / Element5 Digital).
2. `hero-2.jpg` (219 KB): Primary school pupils in crisp regulation uniforms (Unsplash / CDC).
3. `hero-3.jpg` (338 KB): Tailoring master craftsmanship and fabric stitch detail (Unsplash / Héctor J. Rivas).
4. `hero-4.jpg` (275 KB): Regulation school uniform flat-lay folded kit (Unsplash / Sarah Brown).
5. `hero-5.jpg` (44 KB): Doorstep tailoring trial & uniform fitting (Local client archive `vartman-Dresses.jpeg`).

### Category Tiles (`/public/images/categories/`)
1. `cat-shirts.jpg` (35 KB): Shirts & Tops category tile.
2. `cat-trousers.jpg` (51 KB): Trousers & Pants category tile.
3. `cat-skirts.jpg` (48 KB): Skirts & Dresses category tile.
4. `cat-blazers.jpg` (42 KB): Blazers & Knitwear category tile.
5. `cat-sweaters.jpg` (31 KB): Sweaters category tile.
6. `cat-accessories.jpg` (114 KB): Uniform Accessories category tile.

### Product Garments (`/public/images/products/`) — Exactly 20 Products
1. `oxford-shirt.jpg`: Full-Sleeve Oxford Cotton Shirt (White, double-stitched collar).
2. `poplin-shirt.jpg`: Half-Sleeve Poly-Cotton Poplin Shirt.
3. `polo-tshirt.jpg`: House-Colour Sports Polo T-Shirt.
4. `peter-pan-blouse.jpg`: Girls' Rounded Peter-Pan Collar Blouse.
5. `pt-tshirt.jpg`: Sports PT Dry-Fit Interlock T-Shirt.
6. `pleated-trousers.jpg`: Pleated Heavy School Trousers (Grey/Navy).
7. `regular-fit-trousers.jpg`: Regulation Regular-Fit School Trousers.
8. `primary-shorts.jpg`: Primary School Elastic-Waist Cotton Shorts.
9. `track-pants.jpg`: School House Athletic Track Pants (Fleece-lined).
10. `box-pleat-skirt.jpg`: Authentic Tartan Box-Pleat Divided Skirt.
11. `divided-skirt.jpg`: Navy Box-Pleat Divided Activity Culotte Skirt.
12. `pinafore-tunic.jpg`: A-Line Pleated Pinafore School Tunic.
13. `winter-blazer.jpg`: Wool-Blend Tailored Winter Blazer with brass buttons.
14. `knit-cardigan.jpg`: School Navy Cashmilon Woolen Button Cardigan.
15. `knit-sweater.jpg`: V-Neck Ribbed Woolen Knit Sweater.
16. `sleeveless-sweater.jpg`: Thermal Sleeveless Uniform Slipover.
17. `lycra-socks.jpg`: Regulation Lycra Blend School Socks (Pack of 2).
18. `necktie.jpg`: Woven Jacquard Crest Formal Necktie.
19. `leather-belt.jpg`: Full-Grain Bonded Leather Regulation Uniform Belt.
20. `hair-ribbons.jpg`: Regulation School Satin Hair Ribbons (Pack of 2).

---

## 5. Global Config & Utility Files

### `lib/config.ts`
```typescript
export const HERO_INTERVAL_MS = 6000;
export const SLIDER_INTERVAL_MS = 6000;
export const SLIDE_DURATION_MS = 700;
export const SLIDE_DIRECTION = "rtl";
export const SEED_DEMO_CART = true;
```

### `lib/format.js`
```javascript
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function calculateSavings(price, mrp) {
  if (!mrp || mrp <= price) {
    return { savings: 0, discountPercent: 0, hasDiscount: false };
  }
  const savings = mrp - price;
  const discountPercent = Math.round((savings / mrp) * 100);
  return { savings, discountPercent, hasDiscount: true };
}

export function formatDateEnIn(dateInput) {
  if (!dateInput) return "";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    const day = d.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return String(dateInput);
  }
}
```

### `lib/cn.js`
```javascript
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
```

---

## 6. Complete Data Models

### `data/products.js` (20 Products Summary)
- **prod-001**: Full-Sleeve Oxford Cotton Shirt (shirts, ₹430 / ₹490, Greenfield Public)
- **prod-002**: Half-Sleeve Poplin Shirt (shirts, ₹380 / ₹440, Greenfield Public)
- **prod-003**: House-Colour Polo T-Shirt (shirts, ₹340 / ₹399, Universal Standard)
- **prod-004**: Girls' Peter-Pan Collar Blouse (shirts, ₹410 / ₹470, St. Mary's Convent)
- **prod-017**: Sports PT Dry-Fit T-Shirt (shirts, ₹360 / ₹420, Universal Standard)
- **prod-005**: Pleated Heavy Trousers (trousers, ₹470 / ₹550, St. Mary's Convent)
- **prod-006**: Regular Fit Trousers (trousers, ₹620 / ₹700, Kundan Vidya Mandir)
- **prod-007**: Primary Shorts (trousers, ₹320 / ₹380, Greenfield Public)
- **prod-018**: School House Track Pants (trousers, ₹490 / ₹580, Universal Standard)
- **prod-008**: Box-Pleat Divided Skirt (skirts, ₹520 / ₹590, Sacred Heart)
- **prod-009**: Box Pleat Skirt (skirts, ₹560 / ₹650, Delhi Public School)
- **prod-010**: Pinafore Tunic (skirts, ₹690 / ₹780, St. Mary's Convent)
- **prod-011**: Wool-Blend Winter Blazer (blazers, ₹1,650 / ₹1,750, DAV Public School)
- **prod-012**: Knit Cardigan (blazers, ₹760 / ₹850, St. Mary's Convent)
- **prod-013**: V-Neck Knit Sweater (sweaters, ₹880 / ₹990, Modern Day Public)
- **prod-014**: Sleeveless Knit Sweater (sweaters, ₹640 / ₹720, DAV Public School)
- **prod-015**: Regulation Lycra Socks (accessories, ₹180 / ₹240, Universal Standard)
- **prod-016**: Woven Crest Formal Necktie (accessories, ₹90 / ₹120, Greenfield Public)
- **prod-019**: School Regulation Uniform Belt (accessories, ₹150 / ₹190, Greenfield Public)
- **prod-020**: Regulation School Hair Ribbons - Pack of 2 (accessories, ₹60 / ₹80, Universal Standard)

### `data/cart.js` (4 Seeded Demo Items)
```javascript
export const demoCartItems = [
  {
    id: "prod-005",
    productId: "prod-005",
    name: "Pleated Heavy Trousers",
    school: "St. Mary's Convent",
    schoolName: "St. Mary's Convent",
    size: "32",
    qty: 1,
    quantity: 1,
    price: 470,
    mrp: 550,
    image: "/images/products/pleated-trousers.jpg",
    deliveryDate: "Tue, 17 Nov",
  },
  {
    id: "prod-006",
    productId: "prod-006",
    name: "Regular Fit Trousers",
    school: "Kundan Vidya Mandir",
    schoolName: "Kundan Vidya Mandir",
    size: "30",
    qty: 1,
    quantity: 1,
    price: 620,
    mrp: 700,
    image: "/images/products/regular-fit-trousers.jpg",
    deliveryDate: "Tue, 17 Nov",
  },
  {
    id: "prod-018",
    productId: "prod-018",
    name: "School House Track Pants",
    school: "Universal Standard",
    schoolName: "Universal Standard",
    size: "30",
    qty: 1,
    quantity: 1,
    price: 490,
    mrp: 580,
    image: "/images/products/track-pants.jpg",
    deliveryDate: "Tue, 17 Nov",
  },
  {
    id: "prod-001",
    productId: "prod-001",
    name: "Full-Sleeve Oxford Cotton Shirt",
    school: "Greenfield Public",
    schoolName: "Greenfield Public",
    size: "30",
    qty: 1,
    quantity: 1,
    price: 430,
    mrp: 490,
    image: "/images/products/oxford-shirt.jpg",
    deliveryDate: "Tue, 17 Nov",
  },
];
```

### `data/heroSlides.js`
```javascript
export const heroSlides = [
  {
    id: "slide-1",
    src: "/images/hero/hero-1.jpg",
    alt: "Students walking in school campus wearing official school uniforms",
    title: "Campus Excellence",
  },
  {
    id: "slide-2",
    src: "/images/hero/hero-2.jpg",
    alt: "Primary school pupils in crisp regulation school uniforms",
    title: "Primary & Junior",
  },
  {
    id: "slide-3",
    src: "/images/hero/hero-3.jpg",
    alt: "Master tailoring, precision cutting, and premium fabric stitch detail",
    title: "Artisanal Craftsmanship",
  },
  {
    id: "slide-4",
    src: "/images/hero/hero-4.jpg",
    alt: "Regulation school uniform flat-lay kit ready for doorstep dispatch",
    title: "Complete Uniform Kits",
  },
  {
    id: "slide-5",
    src: "/images/hero/hero-5.jpg",
    alt: "Authentic uniform fit and doorstep tailoring trial",
    title: "Doorstep Fitting Trial",
  },
];
```

### `data/schools.js` (9 Authorized Partner Schools)
1. `greenfield-public`: Greenfield Public School (CBSE, Sector 21-C, Navy/White/Grey)
2. `st-marys-convent`: St. Mary's Convent School (ICSE, Mall Road, Navy/White/Maroon)
3. `dav-public`: DAV Public Senior Secondary School (CBSE, Model Town, Navy/White/Cream)
4. `sacred-heart`: Sacred Heart Senior Secondary School (CBSE Global, Sarabha Nagar, Maroon/White/Navy)
5. `modern-day-public`: Modern Day Public School (CBSE, GT Road, Navy/White/Grey)
6. `delhi-public`: Delhi Public School (CBSE, GT Karnal Road, Tartan Green/White/Navy)
7. `kundan-vidya`: Kundan Vidya Mandir (CBSE Affiliated, Civil Lines, Navy/Sky Blue/Khaki)
8. `bcm-arya`: BCM Arya Model Senior Secondary (CBSE, Shastri Nagar, Steel Grey/White/Navy)
9. `sat-paul-mittal`: Sat Paul Mittal School (CISCE, Urban Estate, Charcoal/White/Burgundy)

### `data/user.js`
```javascript
export const user = {
  name: "Rohan",
  initial: "R",
  phone: "+91 98765 43210",
  email: "rohan.sharma@email.com",
  avatar: "/images/avatar.jpg",
  address: {
    name: "Rohan",
    line: "Sector 22, Ludhiana",
    full: "H.No. 221, Sector 22-B, Ludhiana, Punjab 141001",
  },
  linkedSchools: ["Sacred Heart Senior Secondary School", "DPS"],
  devices: 2,
  language: "English",
};
```

---

## 7. Context & State Management

### `context/ProfileContext.js`
Uses `useSyncExternalStore` for instantaneous, safe SSR hydration and multi-component reactivity:
```javascript
"use client";

import { createContext, useContext, useMemo, useCallback, useSyncExternalStore } from "react";
import { user as defaultUser } from "@/data/user";

const ProfileContext = createContext({
  profile: defaultUser,
  updateProfile: () => {},
});

const STORAGE_KEY = "vardhman_profile_data_v1";
const emptySubscribe = () => () => {};

function subscribe(callback) {
  if (typeof window === "undefined") return emptySubscribe();
  window.addEventListener("storage", callback);
  window.addEventListener("vardhman-profile-update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("vardhman-profile-update", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return "";
}

export function ProfileProvider({ children }) {
  const rawData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const profile = useMemo(() => {
    if (!rawData) return defaultUser;
    try {
      const parsed = JSON.parse(rawData);
      if (parsed && parsed.name) {
        return {
          ...defaultUser,
          ...parsed,
          initial: parsed.name.trim().charAt(0).toUpperCase(),
        };
      }
    } catch {}
    return defaultUser;
  }, [rawData]);

  const updateProfile = useCallback((updatedFields) => {
    if (typeof window === "undefined") return;
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY);
      const parsed = currentRaw ? JSON.parse(currentRaw) : defaultUser;
      const next = {
        ...parsed,
        ...updatedFields,
        initial: (updatedFields.name || parsed.name).trim().charAt(0).toUpperCase(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("vardhman-profile-update"));
    } catch {}
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
```

### `context/CartContext.js`
Pre-seeds the 4 demo items if storage is empty and `SEED_DEMO_CART` is true:
```javascript
"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { SEED_DEMO_CART } from "@/lib/config";
import { demoCartItems } from "@/data/cart";

const CartContext = createContext(null);
const STORAGE_KEY = "vardhman-cart";

function getInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    if (SEED_DEMO_CART) {
      return demoCartItems;
    }
    return [];
  } catch {
    return SEED_DEMO_CART ? demoCartItems : [];
  }
}
```

---

## 8. Screen & Route Blueprint

### 1. Home Page (`/` — `app/page.js`)
- **Hero Section (`<HeroSlideshow />`)**: Full-bleed 5-slide dynamic background sliding with CSS transform RTL motion every `HERO_INTERVAL_MS = 6000` (duration `700ms`). Hover/focus/hidden-tab pause. Elongated red pill active dot indicator. Accessible left/right arrows. Fixed overlay copy with WCAG AA gradient contrast.
- **Rohan Section**: "Rohan, still looking for these?" hydrated dynamically with `useProfile()` (`${userName}, still looking for these?`). Displays 3 real school uniform cards (Oxford Shirt, Box Pleat Skirt, Regular Trousers) with school tags and tabular prices.
- **Category Slider (`<CategorySlider />`)**: 6 uniform categories auto-advancing RTL every `SLIDER_INTERVAL_MS = 6000`. Cards are responsive: 4 on desktop, 3 on tablet, 2 on mobile landscape, ~1.2 on mobile portrait with soft beige image container.
- **Trust Badges**: "Since 1979 (45+ yrs legacy)", "Doorstep fit (Home size trial)", "Easy exchange (7-day doorstep)".

### 2. Shop Catalog (`/shop` — `app/shop/page.js`)
- **Search Bar**: Debounced search for garments, schools, or tags.
- **Stage Tabs**: `FOR YOU`, `PRIMARY`, `MIDDLE SCHOOL`, `SECONDARY`.
- **4-Piece Bundle Banner**: "Complete 4-piece set · ₹2,490 (₹2,950)" with red `ADD SET` CTA.
- **Category Chips**: `ALL ITEMS`, `SHIRTS & TOPS`, `TROUSERS & PANTS`, `SKIRTS & DRESSES`, `BLAZERS & KNITWEAR`, `SWEATERS`, `ACCESSORIES`. Synced with `?category=<slug>` query parameters.
- **Products Grid**: Exactly 20 products displayed in a 4-column grid (5 rows x 4 cols on desktop; 2 cols on mobile) with no orphaned cards.

### 3. Cart Page (`/cart` — `app/cart/page.js`)
- **Seeded Demo Items**: Pre-filled with 4 demo items (Pleated Heavy Trousers, Regular Fit Trousers, Track Pants, Full-Sleeve Oxford Cotton Shirt).
- **Item Row Controls**: Quantity stepper (`QtyStepper`), Remove button, Move to Wishlist button, and Buy Now link.
- **Sticky Price Details**: Located in right column (`lg:sticky lg:top-24`), strictly unclipped with full content visible. Shows Subtotal, Delivery (FREE), Voucher application, and Total.
- **Primary CTA**: Full-width crimson red button with `PROCEED TO CHECKOUT` and arrow icon.

### 4. Account Page (`/account` — `app/account/page.js`)
- **Profile Card**: Displays user avatar circle with dynamic initial, greeting (`Hey, Rohan`), phone, email, and linked schools.
- **Pencil Edit Button**: Located at top-right of profile card (`<Pencil size={14} />`) and triggers `<ProfileModal />`.
- **Profile Settings Rows**: "Edit profile" (opens modal), "Saved addresses", "Change language", "Notification settings".
- **Privacy & Security**: "Privacy center", "Manage devices".
- **Log Out Button**: Prominent red CTA at the bottom.

### 5. Orders Page (`/orders` — `app/orders/page.js`)
- **Tabs**: `ONGOING (2)`, `DELIVERED (1)`, `CANCELLED (0)`.
- **Order Cards**:
  - `Order #VU-24617`: Full-Sleeve Oxford Cotton Shirt (Out for delivery, arriving Mon 16 Nov, red tracking stepper).
  - `Order #VU-24602`: Wool-Blend Winter Blazer (Packed, shipping Thu 19 Nov).
- **Master Tailor Banner**: "Need fit adjustments? Book Master Tailor".

### 6. Schools Directory (`/schools` — `app/schools/page.js`)
- **Directory Search & Tabs**: Search 84+ institutions by name or sector across `ALL SCHOOLS`, `CONVENT SCHOOLS`, `PUBLIC SCHOOLS`, `INTERNATIONAL`.
- **School Cards**: Monogram crest, board accreditation badge, campus location, uniform color swatch dots, and "VIEW UNIFORM LIST" link.
- **School Addition CTA**: "Can't Find Your Child's School? Request School Addition".

### 7. Product Detail (`/product/[id]` — `app/product/[id]/`)
- Generates static parameters for all 20 products (`prod-001` through `prod-020`).
- Interactive client view: large photo showcase, school badge, size selector buttons, quantity stepper, stock availability check, and red `ADD TO CART` CTA.

### 8. School Uniform Catalog (`/schools/[slug]` — `app/schools/[slug]/`)
- Generates static parameters for all 9 schools.
- Interactive class level selector (Nursery to Class XII), uniform category filter, and matching prescribed garments.

---

## 9. Core Components Index

### 1. `components/home/HeroSlideshow.js`
- Reads `heroSlides` from `@/data/heroSlides`.
- Dynamic RTL transform tracking: `transform: translateX(-${currentSlide * 100}%)` with `SLIDE_DURATION_MS = 700ms`.
- Left/right chevron navigation buttons + clickable dots with elongated red pill (`w-8 bg-brand`).
- Pauses on hover (`onMouseEnter`), focus (`onFocusCapture`), and hidden browser tab (`visibilitychange`).
- Accessible touch swipe detection for mobile devices.

### 2. `components/home/CategorySlider.js`
- Displays all 6 uniform categories with real photography.
- Computes dynamic minimum price via `getCategoryMinPrice(catId)` from `data/products.js`.
- Responsive visible cards: 4 desktop, 3 tablet, 2 mobile landscape, ~1.2 mobile portrait.
- Auto-advances RTL every `SLIDER_INTERVAL_MS = 6000` with left/right arrows, drag/swipe, and dot indicator.
- Links to `/shop?category=<slug>` so clicking preselects the category in the Shop filter.

### 3. `components/profile/ProfileModal.js`
- Desktop: Centered accessible modal dialog with backdrop blur.
- Mobile: Smooth bottom-sheet sliding up from bottom.
- Inputs: Full Name (required), Phone Number (10 digits), Email Address (valid regex), Linked Schools (interactive multi-select with checkmarks).
- Closes via `Escape` key, click outside, or Cancel button. Traps scroll on body while open.
- Dispatches `"vardhman-toast"` event on successful update.

### 4. `components/product/ProductCard.js`
- Consistent aspect-square soft beige container (`bg-tile border border-line`).
- Top-left school badge pill (red for brand schools, black for convent/inSet).
- Top-right wishlist circular button.
- Garment photo via `ProductImage` with smooth hover zoom (`scale-105`).
- Product title, class range, rating (★ 4.8), tabular price, and struck-through MRP.
- Black pill `ADD TO CART` button with shopping cart icon.

### 5. `components/layout/Header.js`
- Pill-shaped floating container with crimson red border (`border border-brand rounded-pill`).
- Brand Logo with VSU red monogram fallback lockup.
- Desktop navigation links (`Home`, `Shop`, `Schools`, `Orders`, `Cart`, `Account`) with active red pill highlight.
- Live cart item counter badge.
- Dynamic profile avatar initial (`{profile.initial || "R"}`) in circular red-tint ring, linking to `/account`.
- Slide-in side drawer for mobile menu.

### 6. `components/layout/Footer.js`
- Uses `useSyncExternalStore` for the current year to prevent SSR/PPR hydration mismatches and React 19 warnings.
- Brand statement, 5 Quick Links, Toll-free helpline `1800-200-1979` (Mon-Sat 9AM-7PM).

---

## 10. Next.js 16 & React 19 Critical Rules

1. **Deterministic SSR / No `new Date()` in Pre-render**: Next.js 16 flags evaluated `new Date()` during static page pre-rendering. Always use `useSyncExternalStore(emptySubscribe, getClientYear, getServerYear)` or deferred reading.
2. **No Synchronous `setState` in `useEffect`**: React 19's ESLint rule (`react-hooks/set-state-in-effect`) disallows synchronous state setting inside effect bodies. Use `useSyncExternalStore` for external stores or derive state directly during rendering.
3. **Google Fonts Sandbox Constraint**: In sandboxed environments without network access, font fetching fails with `ENOTFOUND fonts.googleapis.com`. Initial font downloads require `BypassSandbox: true` so Google Fonts are cached locally in `.next/cache`.
4. **Localhost Port Access**: Windows sandboxed processes cannot be opened from the user's host browser unless the server process is started with `BypassSandbox: true` (e.g., `npx next start -p 3005`).

---

*End of UI.md — This file is maintained as the single source of truth for all UI, data, and architectural changes.*
