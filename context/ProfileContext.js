"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
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
    } catch {
      // JSON parse error fall back to default
    }
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
    } catch {
      // Storage error
    }
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
