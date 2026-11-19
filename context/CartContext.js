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

function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD": {
      const existing = state.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE":
      return state.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
    case "SET_QTY":
      return state.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, qty: Math.max(1, action.payload.qty) }
          : item
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: getInitialCart() });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = useCallback(
    (product, size = "30", school = "") => {
      dispatch({
        type: "ADD",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          image: product.image,
          size,
          school,
        },
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("vardhman-toast", {
            detail: { message: "Added to cart", type: "success" },
          })
        );
      }
    },
    []
  );

  const removeFromCart = useCallback((id, size) => {
    dispatch({ type: "REMOVE", payload: { id, size } });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("vardhman-toast", {
          detail: { message: "Removed from cart", type: "info" },
        })
      );
    }
  }, []);

  const setQty = useCallback((id, size, qty) => {
    dispatch({ type: "SET_QTY", payload: { id, size, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

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
