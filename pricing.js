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
      label: "Fat2Fit Hostel — Dual Sharing",
      base: 70000,
      type: "camp",
      desc: "per person / 30 days · Dual Sharing Room · +18% GST",
    },
    hostel1: {
      label: "Fat2Fit Hostel — Private Room",
      base: 90000,
      type: "camp",
      desc: "per person / 30 days · Private Room · +18% GST",
    },
    villacozy: {
      label: "Fat2Fit Villa — Cozy Private Room",
      base: 121000,
      type: "camp",
      desc: "per person / 30 days · Cozy Private Room Option · +18% GST",
    },
    villapremium: {
      label: "Fat2Fit Villa — Premium Private Room",
      base: 141000,
      type: "camp",
      desc: "per person / 30 days · Private Room, Premium Villa · +18% GST",
    },
    resortsingle: {
      label: "Fat2Fit Resort — Individual Resort Cottage",
      base: 235000,
      type: "camp",
      desc: "per person / 30 days · Individual Resort Cottage · +18% GST",
    },

    // Online Transformation Subscription
    online3m: {
      label: "Fat2Fit 3-Month Pass (Online Training & Diet)",
      base: 9999,
      type: "online",
      isFullPayment: true,
      originalPrice: 20000,
      desc: "One-Time All-Inclusive Pass",
    },

    // 1-on-1 Add-On with Founder
    founderPt: {
      label: "Personal Training with Founder (1-on-1)",
      base: 80000,
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
          if (pkg.isFullPayment) {
            opt.textContent = `${pkg.label} (${formatINR(pkg.base)} One-Time)`;
          } else {
            opt.textContent = `${pkg.label} (${formatINR(pkg.base)} + 18% GST)`;
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
