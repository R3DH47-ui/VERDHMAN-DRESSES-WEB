# Vardhman School Uniforms — Design System & Engineering Guide

> **Last updated**: November 19, 2026  
> **Status**: Living Documentation  
> **Target Audience**: Human engineers on day one & AI coding agents prior to making codebase modifications.

---

## 1. System Overview & Tech Stack

Vardhman School Uniforms (Est. 1979) is a multi-school e-commerce storefront delivering authorized uniforms across North India. The interface follows a warm, tactile design language inspired by premier institutional tailoring.

- **Framework**: Next.js 16.4.6 (App Router, Webpack builder, Partial Prerendering enabled)
- **Runtime**: React 19.3.0 (`react`, `react-dom`)
- **Styling**: Tailwind CSS v4.3.3 via `@tailwindcss/postcss` and `@theme` block in `app/globals.css`
- **Iconography**: `lucide-react` v0.468.0
- **Package Manager**: `npm`
- **Component Strategy**: Server Components by default; `"use client"` only for interactive carousels, reactive stores, filters, and modal sheets.

---

## 2. Design Tokens

Defined in `app/globals.css` inside the Tailwind v4 `@theme` directive:

```css
/* app/globals.css */
@theme {
  --color-paper: #FAF8F5;
  --color-surface: #FFFFFF;
  --color-tile: #F5F2ED;
  --color-line: #E8E4DE;
  --color-line-strong: #D6D0C7;
  --color-ink: #111111;
  --color-body: #3D3D3D;
  --color-muted: #6B6B6B;
  --color-brand: #B30000;
  --color-brand-dark: #8F0000;
  --color-brand-tint: #FDECEC;
  --color-brand-line: #F2C6C6;
  --color-success: #15803D;
  --color-success-tint: #E8F5EC;
  --color-warning: #B45309;
  --color-warning-tint: #FEF3C7;
}
```

### 2.1 Color Tokens

| Token Name | Hex Value | Semantic Purpose |
| :--- | :--- | :--- |
| `--color-paper` | `#FAF8F5` | Warm off-white global canvas background. |
| `--color-surface` | `#FFFFFF` | Crisp white container cards, header background, modal bodies. |
| `--color-tile` | `#F5F2ED` | Soft beige background for garment image frames and chip buttons. |
| `--color-line` | `#E8E4DE` | Delicate dividers, card borders, and list separators. |
| `--color-line-strong` | `#D6D0C7` | Hover-state borders, active outlines, and distinct dividers. |
| `--color-ink` | `#111111` | Primary headings, product titles, dark pill action buttons. |
| `--color-body` | `#3D3D3D` | Readable charcoal body copy and metadata text. |
| `--color-muted` | `#6B6B6B` | Secondary captions, struck-through MRPs, school board labels. |
| `--color-brand` | `#B30000` | Signature Vardhman Crimson Red for primary CTAs, notifications, and key badges. |
| `--color-brand-dark` | `#8F0000` | Pressed/active state for crimson primary buttons. |
| `--color-brand-tint` | `#FDECEC` | Light pink-red background for brand badges and user avatar rings. |
| `--color-brand-line` | `#F2C6C6` | Accent stroke around brand-tinted pills. |
| `--color-success` | `#15803D` | Positive indicators: total savings pill, "FREE" delivery, order delivered status. |
| `--color-success-tint` | `#E8F5EC` | Background fill for positive savings badges. |
| `--color-warning` | `#B45309` | Status amber for "Packed" or pending updates. |
| `--color-warning-tint` | `#FEF3C7` | Background fill for pending warnings. |

#### Design Debt / Hardcoded Hex Audit
- `app/globals.css`: Focus ring hardcoded as `outline: 2px solid #B30000;` (bypasses `--color-brand`).
- `app/layout.js`: Viewport theme color declared as `#FAF8F5`.
- `data/schools.js`: Uniform palette swatches use raw hex arrays (`#1B3A5C`, `#8B0000`, `#6B6B6B`) to represent specific school institutional regulation fabric dyes.

### 2.2 Corner Radii Tokens

| Token Name | Value | Applied To |
| :--- | :--- | :--- |
| `--radius-card` | `12px` | Content cards, product cards, dialog modals, toast banners. |
| `--radius-btn` | `6px` | Action buttons, form input fields, size selector squares. |
| `--radius-pill` | `9999px` | Floating header card, category chips, stage tabs, status badges. |

### 2.3 Shadow Tokens

| Token Name | Value | Applied To |
| :--- | :--- | :--- |
| `--shadow-soft` | `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)` | Standard elevated cards, trust badge containers. |
| `--shadow-card` | `0 4px 14px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` | Floating header, hover-lifted cards, modal dialogs. |

### 2.4 Z-Index Hierarchy

| Layer | Value | Component / Element |
| :--- | :--- | :--- |
| Base | `z-0` | Background slideshow image track (`HeroSlideshow.js`). |
| Overlay | `z-20` | Hero dark gradient vignette (`from-black/85 via-black/60 to-black/40`). |
| Content | `z-30` | Hero copy, CTAs, slide pagination dots, manual chevron arrows. |
| Navigation | `z-50` | Sticky floating `<Header />` and mobile fixed `<BottomNav />`. |
| Modals | `z-50` / `z-[100]` | Edit Profile `<ProfileModal />` and drawer flyouts. |
| Toasts | `z-[200]` | Bottom-floating `<Toast />` notification banner. |

### 2.5 Motion & Timing Standards

Centralized in `lib/config.ts`:

```typescript
/* lib/config.ts */
export const HERO_INTERVAL_MS = 6000;      // 6s auto-slide rotation
export const SLIDER_INTERVAL_MS = 6000;    // 6s category slider advance
export const SLIDE_DURATION_MS = 700;      // 700ms smooth cubic ease
export const SLIDE_DIRECTION = "rtl";      // RTL slide translate
export const SEED_DEMO_CART = true;        // Pre-fill demo cart items
```

---

## 3. Typography System

### 3.1 Font Families & Loading

Typography uses a clean, Flipkart-inspired sans-serif stack based on Google Font **Roboto** with an **Inter** fallback loaded via `next/font/google`:

```javascript
/* app/layout.js */
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
```

All serif fonts (`Source_Serif_4`, `Playfair`) have been completely removed. Both `--font-sans` and fallback `--font-serif` resolve to `var(--font-roboto), var(--font-inter), Roboto, sans-serif`.

### 3.2 Type Scale

| Scale Role | Font Size | Weight | Tracking / Leading | Example Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1 (Line 1)** | `clamp(1.75rem, 4.2vw, 3.25rem)` | 700 (Bold) | `tracking-tight`, line-height 1.12 | "Official School Uniforms," |
| **Hero H1 (Line 2)** | `clamp(1.75rem, 4.2vw, 3.25rem)` | 400 (Italic) | `italic`, line-height 1.12 | "Delivered to Your Doorstep." |
| **Section H2** | `1.25rem` – `1.5rem` (20–24px) | 700 (Bold) | `tracking-tight`, line-height 1.25 | "Complete Uniforms Catalog" |
| **Card H3** | `0.875rem` – `1rem` (14–16px) | 500 / 600 | Leading snug, line-clamp 1 | Product & Category titles |
| **Body** | `0.8125rem` (13px) | 400 (Regular) | Line-height `1.25rem` (20px) | Descriptions, specifications |
| **Micro Eyebrow** | `0.625rem` (10px) | 700 (Bold) | `tracking-widest`, uppercase | "TRUSTED BY 40+ PREMIER INSTITUTIONS" |
| **Button CTA** | `0.75rem` (12px) | 700 (Bold) | `tracking-wider`, uppercase | "SHOP COLLECTION", "ADD TO CART" |
| **Price Figure** | `0.875rem` – `1.25rem` | 700 (Bold) | Tabular lining nums | `₹1,650` |

### 3.3 Numeral Rules & Currency (₹)

All prices, order IDs, quantities, and dates use tabular lining figures via `.font-tabular` and `.tabular-nums`:

```css
/* app/globals.css */
.font-tabular,
.tabular-nums {
  font-variant-numeric: tabular-nums lining-nums;
  -moz-font-feature-settings: "tnum" 1, "lnum" 1;
  -webkit-font-feature-settings: "tnum" 1, "lnum" 1;
  font-feature-settings: "tnum" 1, "lnum" 1;
}
```

- **Currency formatting**: Managed exclusively through `formatPrice()` in `lib/format.js`:
  ```javascript
  /* lib/format.js */
  export function formatPrice(amount) {
    if (amount == null || isNaN(amount)) return "₹0";
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  }
  ```
- **Rupee Glyph (`₹`)**: Renders natively in `Roboto` Latin glyph coverage with zero fallback jitter.

---

## 4. Layout Architecture & Responsive Breakpoints

### 4.1 Page Container & Spacing

- **Standard Page Container**: `mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10`
- **Checkout Container**: `mx-auto w-full max-w-[1000px] px-4 md:px-6 lg:px-10 py-6 md:py-10`
- **Bottom Navigation Padding**: `main` tag has `pb-20 md:pb-0` to clear mobile bottom navigation.

### 4.2 Grid Structure Across Pages

| Route | Mobile (<640px) | Tablet (640–1023px) | Desktop (≥1024px) |
| :--- | :--- | :--- | :--- |
| **Home (`/`)** | 1 col stack, horizontal snap scrollers | 1 col stack, 3-card scrollers | 3 cols recommended, 4 cols categories |
| **Shop (`/shop`)** | 2 columns (`grid-cols-2`) | 3 columns (`md:grid-cols-3`) | 4 columns (`lg:grid-cols-4`, 5 full rows) |
| **Cart (`/cart`)** | 1 column stacked | 1 column stacked | 2/3 items (`col-span-2`), 1/3 sticky price card |
| **Account (`/account`)** | 1 column stacked | 1 column stacked | 1/3 profile card, 2/3 settings groups |
| **Orders (`/orders`)** | 1 column stacked | 2 columns (`md:grid-cols-2`) | 2 columns (`md:grid-cols-2`) |
| **Schools (`/schools`)**| 1 column stacked | 2 columns (`md:grid-cols-2`) | 3 columns (`lg:grid-cols-3`) |

### 4.3 Navigation Layout

- **Header (`components/layout/Header.js`)**:
  - Sticky floating pill card: `sticky top-0 z-50 px-3 pt-3 pb-2 md:px-6 md:pt-4 md:pb-3`
  - Pill container: `border border-brand rounded-pill px-4 py-2 md:px-6 md:py-2.5 bg-surface shadow-soft`
  - Logo on left, desktop nav links center (`Home`, `Shop`, `Schools`, `Orders`, `Cart`, `Account`), icons right (Search, Notification, reactive Profile Avatar circle, Mobile hamburger).
- **Mobile Bottom Bar (`components/layout/BottomNav.js`)**:
  - Fixed bottom bar on viewports `< 768px`: `md:hidden fixed bottom-0 left-0 right-0 z-50 h-14 bg-surface border-t border-line`
  - 7 icons: `Home`, `Shop`, `Schools`, `Orders`, `Cart` (with badge), `Account`, `Menu`.

---

## 5. Components Directory & API Reference

### 5.1 Shared Layout Components

#### `BrandLogo` (`components/layout/BrandLogo.js`)
Displays official red "VSU" lettering with "VARDHMAN" horizontal banner, "SINCE 1979", and "VARDHMAN SCHOOL UNIFORMS" from `/public/brand/vardhman-logo.jpeg`.

```javascript
/* components/layout/BrandLogo.js */
export default function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 md:gap-2.5 shrink-0 group">
      <div className="relative h-[40px] md:h-[48px] w-auto aspect-[880/593] flex items-center shrink-0">
        <Image
          src="/brand/vardhman-logo.jpeg"
          alt="Vardhman School Uniforms - since 1979"
          width={880}
          height={593}
          priority
          className="h-full w-auto object-contain mix-blend-multiply"
        />
      </div>
      {SHOW_HEADER_WORDMARK && (/* Wordmark block */)}
    </Link>
  );
}
```
- **Sizing**: `h-[40px]` mobile / `h-[48px]` desktop; aspect ratio `880/593` (1.48:1).
- **Near-white background blend**: Uses CSS `mix-blend-multiply` so the JPEG background blends into the white header card.
- **Wordmark toggle**: Controlled by `const SHOW_HEADER_WORDMARK = true;`.

#### `Footer` (`components/layout/Footer.js`)
Desktop 3-column footer containing Brand Heritage, Quick Links, and Toll-Free Helpline (`1800-200-1979`).
- **PPR / SSR Safety**: Evaluates year using `useSyncExternalStore` (`getServerYear = () => 2026`) to avoid hydration mismatch during static prerendering.

### 5.2 Home Components

#### `HeroSlideshow` (`components/home/HeroSlideshow.js`)
Dynamic RTL carousel auto-advancing every 6s (`HERO_INTERVAL_MS = 6000`).
- **Motion**: Content translates right-to-left: `transform: translateX(-${currentSlide * 100}%)` with duration 700ms (`SLIDE_DURATION_MS`).
- **Accessibility**: Pauses on mouse enter (`onMouseEnter`), keyboard focus (`onFocusCapture`), and hidden tab (`visibilitychange`). Autoplay disabled when `prefers-reduced-motion` is active.
- **Manual Navigation**: Accessible previous/next chevrons and swipe gesture detection.

#### `HeroContent` (`components/home/HeroContent.js`)
Single dedicated copy overlay rendered at `z-30`:
- **Eyebrow**: `"TRUSTED BY 40+ PREMIER EDUCATIONAL INSTITUTIONS"` with pulsing crimson dot.
- **Headline**: Line 1 `"Official School Uniforms,"` bold upright; Line 2 `"Delivered to Your Doorstep."` normal italic.
- **Subline**: Outlined red `Truck` icon (18px) + `"Doorstep fit guarantee & hassle-free exchange"`.
- **Responsive CTA**: On desktop, inline buttons; on mobile (`< 768px`), centered equal-width row (`[&>*]:flex-1`).
- **Pagination Dots**: 5 total dots; active dot = elongated white pill (`w-8 bg-white/90`), inactive = `w-2.5 bg-white/40`.

#### `CategorySlider` (`components/home/CategorySlider.js`)
Showcases all 6 categories (Shirts, Trousers, Skirts, Blazers, Sweaters, Accessories).
- Dynamic minimum price badge: `getCategoryMinPrice(category.id)` derived from live catalog.
- Auto-advances RTL every 6000ms.
- Card width: ~1.2 cards visible on mobile portrait (`w-[82%]`), 2 on tablet, 4 on desktop.
- Card link: Routes directly to `/shop?category=${category.id}` preselecting the filter.

### 5.3 Product & Profile Components

#### `ProductCard` (`components/product/ProductCard.js`)
Standardized e-commerce garment tile used in Shop, Wishlist, and School detail.
- Soft beige photo container (`bg-tile border border-line aspect-square`).
- School badge (crimson for brand schools, black for convent / in-set).
- Wishlist heart button top-right.
- Product name, class range, star rating (`★ 4.8`), tabular price & struck MRP.
- Black action pill button with `ShoppingCart` icon: `ADD TO CART`.

#### `ProfileModal` (`components/profile/ProfileModal.js`)
Accessible profile management dialog (centered modal on desktop, bottom-sheet on mobile):
- Fields: Full Name (required), Phone Number (10 digits), Email (regex validated), Linked Schools (interactive multi-select checkboxes from `data/schools.js`).
- Keyboard control: Closes on `Escape`, traps body scroll when mounted.
- Reactive event: Dispatches `"vardhman-toast"` on save and updates `ProfileContext`.

### 5.4 UI Primitives (`components/ui/`)

- `Badge.js`: Status pills with variants: `brand`, `success`, `warning`, `dark`, `neutral`, `school`, `inSet`.
- `Chips.js`: Horizontal filter chips with black active pill and beige inactive pills.
- `OrderStepper.js`: Delivery timeline tracking nodes (`Placed` -> `Packed` -> `Shipped` -> `Delivered`).
- `ProductImage.js`: Safe Next.js image wrapper with placeholder fallback.
- `QtyStepper.js`: Compact `[-] qty [+]` numeric stepper.
- `SearchBar.js`: Rounded input with search icon and clear (`X`) button.
- `SectionHeader.js`: Section heading with subtitle and crimson `VIEW ALL` link.
- `Tabs.js`: Rounded pill navigation tabs with active dark state.
- `Toast.js`: Bottom-floating feedback notification responding to custom event `vardhman-toast`.

---

## 6. Data Architecture & Client State Management

### 6.1 State Management

```
┌────────────────────────────────────────────────────────┐
│                      RootLayout                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │                  CartProvider                      │ │
│ │ ┌────────────────────────────────────────────────┐ │ │
│ │ │               WishlistProvider                 │ │ │
│ │ │ ┌────────────────────────────────────────────┐ │ │ │
│ │ │ │              ProfileProvider               │ │ │ │
│ │ │ │                                            │ │ │ │
│ │ │ │  Header  ·  Main Pages  ·  BottomNav       │ │ │ │
│ │ │ └────────────────────────────────────────────┘ │ │ │
│ │ └────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

#### `ProfileContext` (`context/ProfileContext.js`)
Uses `useSyncExternalStore` for zero-cascade, instant synchronization between Account greeting, Header avatar circle, and Home greeting:
- **Storage Key**: `vardhman_profile_data_v1`
- **Reactivity**: Subscribes to window `storage` and `vardhman-profile-update` events.
- **Computed fields**: `initial` automatically derived from first letter of updated name.

#### `CartContext` (`context/CartContext.js`)
- **Storage Key**: `vardhman-cart`
- **Demo Seeding**: When storage is empty and `SEED_DEMO_CART === true`, automatically hydrates with 4 pre-configured items from `data/cart.js`.
- **Calculations**: Auto-computes `subtotal`, `totalMrp`, `savings`, and `totalItems`.

#### `WishlistContext` (`context/WishlistContext.js`)
- **Storage Key**: `vardhman-wishlist`
- Provides `toggleWishlist(product)` and `isWishlisted(productId)`.

### 6.2 Data Sources (`data/`)

- `products.js`: Exact 20-product catalog (5 shirts, 4 trousers, 3 skirts, 2 blazers, 2 sweaters, 4 accessories).
- `cart.js`: 4 demo items:
  1. Pleated Heavy Trousers (St. Mary's Convent, Size 32, ₹470)
  2. Regular Fit Trousers (Kundan Vidya Mandir, Size 30, ₹620)
  3. School House Track Pants (Universal Standard, Size 30, ₹490)
  4. Full-Sleeve Oxford Cotton Shirt (Greenfield Public, Size 30, ₹430)
- `heroContent.ts`: Master copy for hero eyebrow, headline, subline, and CTA destinations.
- `heroSlides.js`: 5 photographic slide sources with descriptive accessibility labels.
- `schools.js`: 9 partner schools with boards, locations, monogram badges, and uniform color swatches.
- `orders.js`: Mock orders (`#VU-24617`, `#VU-24602`, `#VU-24311`) across ongoing and delivered statuses.
- `user.js`: Default fallback profile for Rohan Sharma.

---

## 7. Photographic Assets & Media Rules

All assets are stored locally under `/public` without third-party CDN hotlinking:

```
public/
├── brand/
│   └── vardhman-logo.jpeg       # Official VSU logo (880x593)
├── images/
│   ├── categories/              # 6 category tiles (cat-*.jpg)
│   ├── hero/                    # 5 hero background slides (hero-*.jpg)
│   ├── products/                # 20 real uniform garment photos
│   └── schools/                 # Partner school monograms & crests
```

### Photo Accuracy Rule
- Every product photo shows the exact garment, regulation cut, and color named in the product description.
- Backgrounds use clean neutral soft-beige tiles (`bg-tile border border-line`).
- Full photo source URLs and Unsplash licenses are cataloged in `docs/IMAGE_CREDITS.md`.
- Flag `NEEDS_FIGMA_EXPORT`: Slide 1 background (`hero-courtyard-blazers.jpg`) is a temporary licensed high-res placeholder awaiting the original raw export from Figma.

---

## 8. Critical Engineering Constraints & Gotchas

### 8.1 Next.js 16 Partial Prerendering & Date Evaluation
Next.js 16 prerendering engine crashes if `new Date()` is evaluated during SSR.
- **Rule**: Never call `new Date().getFullYear()` directly in a Server Component or SSR body.
- **Solution**: Use `useSyncExternalStore` with a static server snapshot (`() => 2026`) as implemented in `components/layout/Footer.js`.

### 8.2 React 19 `set-state-in-effect` Rule
React 19 ESLint flags synchronous `setState` calls inside `useEffect` bodies as cascading render errors.
- **Rule**: Never synchronize external storage or props via synchronous `setState` in `useEffect`.
- **Solution**: Use `useSyncExternalStore` (as in `ProfileContext.js`) or derive state directly during rendering.

### 8.3 Dark Reader & Auto-Inversion Defense
To prevent dark mode extensions (Dark Reader, Chrome auto-dark) from inverting the brand's warm off-white canvas:
1. `app/layout.js`: Declares `colorScheme: "only light"` in viewport and `style={{ colorScheme: "only light" }}` on `<html>`.
2. `app/globals.css`:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));
   html { color-scheme: only light !important; background-color: var(--color-paper) !important; }
   ```

### 8.4 Single Hero Architecture Rule
The Hero section consists of exactly **two distinct layers**:
1. **Background Layer (`HeroSlideshow.js`)**: Contains only the image track and dark gradient overlay (`z-0` through `z-20`).
2. **Content Layer (`HeroContent.js`)**: Contains the eyebrow pill, headline, subline, CTAs, and pagination dots (`z-30`).
- **Never** render hero copy inside individual slide track containers.
- **Never** duplicate the hero `<section>` wrapper in `app/page.js`.

---

*End of DESIGN.md — Maintained as the canonical architecture reference for Vardhman School Uniforms.*
