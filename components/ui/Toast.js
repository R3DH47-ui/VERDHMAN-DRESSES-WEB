"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, Info } from "lucide-react";

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    function handleToast(e) {
      setToast(e.detail);
      setTimeout(() => setToast(null), 2500);
    }
    window.addEventListener("vardhman-toast", handleToast);
    return () => window.removeEventListener("vardhman-toast", handleToast);
  }, []);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-ink text-white px-4 py-3 rounded-card shadow-card text-sm font-medium animate-[fadeInUp_200ms_ease-out]"
      role="alert"
    >
      {isSuccess ? (
        <CheckCircle size={16} className="text-success shrink-0" />
      ) : (
        <Info size={16} className="text-white/70 shrink-0" />
      )}
      {toast.message}
      <button
        onClick={() => setToast(null)}
        className="ml-2 text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
