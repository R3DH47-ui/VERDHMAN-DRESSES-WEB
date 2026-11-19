"use client";

import { useState, useEffect } from "react";
import { X, Check, School } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { schools } from "@/data/schools";
import { cn } from "@/lib/cn";

export default function ProfileModal({ onClose }) {
  const { profile, updateProfile } = useProfile();

  const [formData, setFormData] = useState(() => ({
    name: profile?.name || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    linkedSchools: profile?.linkedSchools || [],
  }));
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key and prevent background body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const cleanPhone = formData.phone.replace(/[\s+-]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit contact number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.linkedSchools.length === 0) {
      newErrors.schools = "Select at least one linked partner school";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      linkedSchools: formData.linkedSchools,
    });

    setIsSuccess(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("vardhman-toast", {
          detail: { message: "Profile updated successfully!", type: "success" },
        })
      );
    }

    setTimeout(() => {
      onClose();
    }, 400);
  };

  const toggleSchool = (schoolName) => {
    setFormData((prev) => {
      const exists = prev.linkedSchools.includes(schoolName);
      return {
        ...prev,
        linkedSchools: exists
          ? prev.linkedSchools.filter((s) => s !== schoolName)
          : [...prev.linkedSchools, schoolName],
      };
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-surface border border-line rounded-t-2xl sm:rounded-card shadow-card p-5 sm:p-6 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
          <div>
            <h2
              id="profile-modal-title"
              className="text-base sm:text-lg font-bold text-ink"
            >
              Edit Profile
            </h2>
            <p className="text-xs text-muted">
              Update your account details and linked schools
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:bg-tile transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="edit-name"
              className="block text-xs font-bold uppercase tracking-wider text-muted mb-1"
            >
              Full Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Rohan Sharma"
              className={cn(
                "w-full bg-paper border rounded-btn px-3.5 py-2 text-sm text-ink outline-none transition focus:ring-1 focus:ring-brand",
                errors.name ? "border-brand" : "border-line focus:border-brand"
              )}
            />
            {errors.name && (
              <p className="text-[11px] text-brand font-medium mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="edit-phone"
              className="block text-xs font-bold uppercase tracking-wider text-muted mb-1"
            >
              Phone Number
            </label>
            <input
              id="edit-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+91 98765 43210"
              className={cn(
                "w-full bg-paper border rounded-btn px-3.5 py-2 text-sm text-ink font-tabular outline-none transition focus:ring-1 focus:ring-brand",
                errors.phone ? "border-brand" : "border-line focus:border-brand"
              )}
            />
            {errors.phone && (
              <p className="text-[11px] text-brand font-medium mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="edit-email"
              className="block text-xs font-bold uppercase tracking-wider text-muted mb-1"
            >
              Email Address
            </label>
            <input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="rohan.sharma@email.com"
              className={cn(
                "w-full bg-paper border rounded-btn px-3.5 py-2 text-sm text-ink outline-none transition focus:ring-1 focus:ring-brand",
                errors.email ? "border-brand" : "border-line focus:border-brand"
              )}
            />
            {errors.email && (
              <p className="text-[11px] text-brand font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Linked Schools Multi-Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Linked Schools (Select All That Apply)
            </label>
            <div className="max-h-36 overflow-y-auto space-y-1.5 border border-line rounded-btn p-2.5 bg-paper">
              {schools.map((school) => {
                const isSelected = formData.linkedSchools.includes(school.name);
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => toggleSchool(school.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-left text-xs transition",
                      isSelected
                        ? "bg-brand text-white font-medium shadow-xs"
                        : "hover:bg-tile text-ink"
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <School size={13} className="shrink-0" />
                      <span className="truncate">{school.name}</span>
                    </span>
                    {isSelected && (
                      <Check size={13} strokeWidth={2.5} className="shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.schools && (
              <p className="text-[11px] text-brand font-medium mt-1">
                {errors.schools}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-line flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-btn border border-line bg-surface hover:bg-tile text-ink text-xs font-bold uppercase tracking-wider transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSuccess}
              className="flex-1 py-2.5 px-4 rounded-btn bg-brand hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider transition active:scale-[0.98] shadow-soft"
            >
              {isSuccess ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
