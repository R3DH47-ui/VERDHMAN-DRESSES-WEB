import { Suspense } from "react";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ProfileProvider } from "@/context/ProfileContext";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

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

export const viewport = {
  colorScheme: "only light",
  themeColor: "#FAF8F5",
};

export const metadata = {
  title: "Vardhman School Uniforms | Official School Uniforms Since 1979",
  description:
    "Official school uniforms delivered to your doorstep. Trusted by 80+ premier educational institutions across North India. Shop shirts, trousers, blazers and more.",
  keywords: "school uniforms, Vardhman, school dress, uniform shop, CBSE uniforms, ICSE uniforms",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable}`}
      style={{ colorScheme: "only light" }}
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="theme-color" content="#FAF8F5" />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-body font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <ProfileProvider>
              <Suspense fallback={<div className="h-16 bg-paper" />}>
                <Header />
              </Suspense>
              <main className="flex-1 pb-20 md:pb-0 bg-paper">{children}</main>
              <Footer />
              <Suspense fallback={null}>
                <BottomNav />
              </Suspense>
              <Toast />
            </ProfileProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
