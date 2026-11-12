/**
 * ============================================================================
 * FAT2FIT — CENTRAL PRICING CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * 
 * To change any package price or description, ONLY EDIT THIS FILE!
 * All prices across the entire website — cards, modal dropdown, reviews,
 * and calculations — will update automatically.
 * 
 * Note: If you use the Supabase Edge Function (create-order) for Razorpay orders,
 * remember to also copy the updated numbers to supabase/functions/create-order/index.ts.
 */

(function () {
  const PACKAGES = {
    // 30-Day In-Person Camp Packages (Shimla)
    hostel4: {
      label: "Fat2Fit Hostel — Dual Sharing (30 Days)",
      base: 70000,
      durationDays: 30,
      type: "camp",
      desc: "per person / 30 days · Dual Sharing Room · +18% GST",
    },
    hostel1: {
      label: "Fat2Fit Hostel — Private Room (30 Days)",
      base: 90000,
      durationDays: 30,
      type: "camp",
      desc: "per person / 30 days · Private Room · +18% GST",
    },
    villacozy: {
      label: "Fat2Fit Villa — Cozy Private Room (30 Days)",
      base: 121000,
      durationDays: 30,
      type: "camp",
      desc: "per person / 30 days · Cozy Private Room · Compact size, no view · +18% GST",
    },
    villapremium: {
      label: "Fat2Fit Villa — Premium Room (30 Days)",
      base: 141000,
      durationDays: 30,
      type: "camp",
      desc: "per person / 30 days · Premium Villa Room · Room with a scenic view · +18% GST",
    },
    resortsingle: {
      label: "Fat2Fit Resort — Individual Resort Cottage (30 Days)",
      base: 235000,
      durationDays: 30,
      type: "camp",
      desc: "per person / 30 days · Individual Resort Cottage · +18% GST",
    },

    // ------------------------------------------------------------------------
    // [NEW/UPDATED] 15-Day In-Person Camp Packages (Shimla)
    // NOTE: 15-Day Camp requires 100% FULL PAYMENT upon registration.
    // 50% advance is only available for 30-Day camp packages.
    // ------------------------------------------------------------------------
    hostel15d_shared: {
      label: "Fat2Fit Hostel — Double Sharing Room (15 Days)",
      base: 35000,
      finalPrice: 41300,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Double Sharing Room · +18% GST (Final ₹41,300 Full Payment)",
    },
    hostel15d_private: {
      label: "Fat2Fit Hostel — Single Private Room (15 Days)",
      base: 45000,
      finalPrice: 53100,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Single Private Room · +18% GST (Final ₹53,100 Full Payment)",
    },
    // Backward-compatible alias for existing hostel15d links
    hostel15d: {
      label: "Fat2Fit Hostel — Double Sharing Room (15 Days)",
      base: 35000,
      finalPrice: 41300,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Double Sharing Room · +18% GST (Final ₹41,300 Full Payment)",
    },

    villa15d_cozy: {
      label: "Fat2Fit Villa — Cozy Private Room (15 Days)",
      base: 60500,
      finalPrice: 71390,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Cozy Private Room · +18% GST (Final ₹71,390 Full Payment)",
    },
    villa15d_premium: {
      label: "Fat2Fit Villa — Premium Villa Room (15 Days)",
      base: 70500,
      finalPrice: 83190,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Private Room, Premium Villa · +18% GST (Final ₹83,190 Full Payment)",
    },
    // Backward-compatible alias for existing villa15d links
    villa15d: {
      label: "Fat2Fit Villa — Cozy Private Room (15 Days)",
      base: 60500,
      finalPrice: 71390,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Cozy Private Room · +18% GST (Final ₹71,390 Full Payment)",
    },

    resort15d: {
      label: "Fat2Fit Resort — Individual Resort Cottage (15 Days)",
      base: 117500,
      finalPrice: 138650,
      durationDays: 15,
      type: "camp",
      isFullPayment: true,
      desc: "per person / 15 days · Single Sharing Cottage · +18% GST (Final ₹1,38,650 Full Payment)",
    },

    // Online Transformation Subscription
    online3m: {
      label: "Fat2Fit 3-Month Pass (Online Training & Diet)",
      base: 9999,
      durationDays: 90,
      type: "online",
      isFullPayment: true,
      originalPrice: 20000,
      desc: "One-Time All-Inclusive Pass",
    },

    // 1-on-1 Add-On with Founder
    founderPt: {
      label: "Personal Training with Founder (1-on-1)",
      base: 80000,
      durationDays: 30,
      type: "addon",
      desc: "for 30 Days",
    },
  };

  /**
   * Format any number as Indian Rupee currency (e.g. 56000 -> ₹56,000)
   */
  function formatINR(n) {
    if (typeof n !== "number" || isNaN(n)) return "₹0";
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }

  /**
   * Automatically inject prices and descriptions into HTML elements
   * marked with `data-package-price`, `data-package-desc`, `data-package-original`,
   * and sync the registration select dropdown options.
   */
  function applyPricingToDOM() {
    // 1. Update elements with data-package-price
    document.querySelectorAll("[data-package-price]").forEach((el) => {
      const key = el.getAttribute("data-package-price");
      const pkg = PACKAGES[key];
      if (pkg && pkg.base !== undefined) {
        const suffix = el.getAttribute("data-price-suffix") || "";
        el.textContent = formatINR(pkg.base) + suffix;
      }
    });

    // 1b. [NEW] Update elements with data-package-final (e.g. final price incl. 18% GST)
    document.querySelectorAll("[data-package-final]").forEach((el) => {
      const key = el.getAttribute("data-package-final");
      const pkg = PACKAGES[key];
      if (pkg && pkg.finalPrice !== undefined) {
        const prefix = el.getAttribute("data-final-prefix") || "";
        const suffix = el.getAttribute("data-final-suffix") || "";
        el.textContent = prefix + formatINR(pkg.finalPrice) + suffix;
      }
    });

    // 2. Update elements with data-package-desc
    document.querySelectorAll("[data-package-desc]").forEach((el) => {
      const key = el.getAttribute("data-package-desc");
      const pkg = PACKAGES[key];
      if (pkg && pkg.desc) {
        el.innerHTML = pkg.desc;
      }
    });

    // 3. Update original/strikethrough prices (e.g. Online Pass)
    document.querySelectorAll("[data-package-original]").forEach((el) => {
      const key = el.getAttribute("data-package-original");
      const pkg = PACKAGES[key];
      if (pkg && pkg.originalPrice) {
        el.textContent = `Original Price: ${formatINR(pkg.originalPrice)}/-`;
      }
    });

    // 4. Update dropdown <select id="regPackage"> options
    const regPackageSelect = document.getElementById("regPackage");
    if (regPackageSelect) {
      Array.from(regPackageSelect.options).forEach((opt) => {
        const pkg = PACKAGES[opt.value];
        if (pkg) {
          if (pkg.type === "online") {
            opt.textContent = `${pkg.label} (${formatINR(pkg.base)} One-Time)`;
          } else if (pkg.durationDays === 15 || (pkg.isFullPayment && pkg.type === "camp")) {
            const finalAmt = pkg.finalPrice || Math.round(pkg.base * 1.18);
            opt.textContent = `${pkg.label} (${formatINR(finalAmt)} Full Payment incl. GST)`;
          } else {
            opt.textContent = `${pkg.label} (${formatINR(pkg.base)} + 18% GST · 50% Advance)`;
          }
        }
      });
    }
  }

  // Auto-run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPricingToDOM);
  } else {
    applyPricingToDOM();
  }

  // Expose globally to window
  window.PACKAGES = PACKAGES;
  window.formatINR = formatINR;
  window.applyPricingToDOM = applyPricingToDOM;
})();
