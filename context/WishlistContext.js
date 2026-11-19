"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "vardhman-wishlist";

function getInitialWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "TOGGLE": {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      return [...state, action.payload];
    }
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: getInitialWishlist() });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    dispatch({ type: "TOGGLE", payload: product });
    if (typeof window !== "undefined") {
      const exists = getInitialWishlist().find((item) => item.id === product.id);
      window.dispatchEvent(
        new CustomEvent("vardhman-toast", {
          detail: {
            message: exists ? "Removed from wishlist" : "Added to wishlist",
            type: "info",
          },
        })
      );
    }
  }, []);

  const removeFromWishlist = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
