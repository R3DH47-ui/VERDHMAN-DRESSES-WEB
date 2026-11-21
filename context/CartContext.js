"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import { SEED_DEMO_CART } from "@/lib/config";
import { demoCartItems } from "@/data/cart";

const CartContext = createContext(null);

const STORAGE_KEY = "vardhman-cart";
const CART_UPDATE_EVENT = "vardhman-cart-update";

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(CART_UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_UPDATE_EVENT, callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return "[]";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored;
    if (SEED_DEMO_CART) {
      const demoStr = JSON.stringify(demoCartItems);
      localStorage.setItem(STORAGE_KEY, demoStr);
      return demoStr;
    }
    return "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

export function CartProvider({ children }) {
  const rawData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cart = useMemo(() => {
    if (!rawData) return [];
    try {
      const parsed = JSON.parse(rawData);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [rawData]);

  const saveCart = useCallback((nextCart) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
      window.dispatchEvent(new Event(CART_UPDATE_EVENT));
    } catch {
      // Storage error fallback
    }
  }, []);

  const addToCart = useCallback(
    (product, size = "30", school = "") => {
      const current = (() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : (SEED_DEMO_CART ? demoCartItems : []);
        } catch {
          return [];
        }
      })();
      const existing = current.find(
        (item) => item.id === product.id && item.size === size
      );
      let updated;
      if (existing) {
        updated = current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updated = [
          ...current,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.image,
            size,
            school,
            qty: 1,
          },
        ];
      }
      saveCart(updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("vardhman-toast", {
            detail: { message: "Added to cart", type: "success" },
          })
        );
      }
    },
    [saveCart]
  );

  const removeFromCart = useCallback(
    (id, size) => {
      const current = (() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      })();
      const updated = current.filter(
        (item) => !(item.id === id && item.size === size)
      );
      saveCart(updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("vardhman-toast", {
            detail: { message: "Removed from cart", type: "info" },
          })
        );
      }
    },
    [saveCart]
  );

  const setQty = useCallback(
    (id, size, qty) => {
      const current = (() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      })();
      const updated = current.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: Math.max(1, qty) }
          : item
      );
      saveCart(updated);
    },
    [saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalMrp = cart.reduce((sum, item) => sum + (item.mrp || item.price) * item.qty, 0);
  const savings = totalMrp - subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQty,
        clearCart,
        totalItems,
        subtotal,
        totalMrp,
        savings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
