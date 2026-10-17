document.addEventListener("DOMContentLoaded", () => {
  /* POPUP */

  const popup = document.getElementById("popupOverlay");
  const closePopup = document.querySelector(".close-popup");

  if (popup && closePopup) {
    setTimeout(() => {
      popup.classList.add("show");
    }, 800);

    closePopup.addEventListener("click", () => {
      popup.classList.remove("show");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("show");
      }
    });
  }

  /* HAMBURGER */

  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
      });
    });
  }

  /* PROGRAM MODAL */

  const modal = document.getElementById("programModal");
  const closeBtn = document.querySelector(".close-program");
  const title = document.getElementById("programTitle");
  const details = document.getElementById("programDetails");
  const roomMedia = document.querySelector(".room-media");
  const whatsappBtn = document.getElementById("programWhatsappBtn");

  const programData = {
    "hostel-program": {
      title: "Fat2Fit Hostel — Quadruple Sharing & Single Occupancy",
      whatsappText:
        "Hi%2C%20I%20want%20to%20book%20the%20Fat2Fit%20Hostel%20program",
      images: [{ src: "assets/hostel.jpeg", label: null }],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          A structured, supervised weight-loss program for people who are stuck
          despite trying diets, gyms, and home workouts. Fat2Fit Hostel gives you
          the full Fat2Fit routine at the most affordable price point, with a
          quadruple sharing room or a private single occupancy upgrade.
        </p>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Quadruple sharing room, attached washroom</li>
          <li>Single occupancy option also available</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes</h3>
        <ul>
          <li>Stay (quadruple sharing or single occupancy)</li>
          <li>Structured daily training</li>
          <li>Healthy meals included</li>
          <li>Wi-Fi available</li>
          <li>Attached washroom</li>
          <li>Supervision and accountability, 24/7</li>
        </ul>

        <h3>Who Should Join</h3>
        <ul>
          <li>People serious about weight loss</li>
          <li>Those who need routine and discipline</li>
          <li>Men and women ready to commit for results</li>
          <li>People who want to improve stamina</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; 4-Sharing:</strong> <span>₹56,000</span></p>
          <p><strong>30 Days &middot; Single Occupancy:</strong> <span>₹85,000</span></p>
          <small>Per person · Attached washroom · +18% GST extra</small>
        </div>

        <h3>How To Join</h3>
        <ul>
          <li>Message us on WhatsApp.</li>
          <li>Share your goal and availability.</li>
          <li>Choose your slot and confirm your booking.</li>
          <li>Make 50% payment to book your slot at least 15 days in advance.</li>
          <li>Receive confirmation with all essential details.</li>
        </ul>

        <h3>Paid Services Extra</h3>
        <ul>
          <li>Car parking</li>
          <li>Massages</li>
          <li>Laundry</li>
          <li>Blood test</li>
          <li>Doctor visit</li>
          <li>Local cab service</li>
        </ul>

        <h3>Rules</h3>
        <ul>
          <li>No discounts</li>
          <li>No transportation</li>
          <li>No non-vegetarian food</li>
          <li>No alcohol</li>
          <li>No smoking</li>
          <li>No foul language</li>
          <li>No disrespect to anyone</li>
        </ul>

        <h3>Location</h3>
        <p>
          Fat2Fit Hostel is roughly 1 km up the hill off NH5, pincode 171219,
          13 km before Shimla.
          <a href="https://maps.app.goo.gl/SNdd1Ea5osSbSBqU8?g_st=iwb" target="_blank" class="modal-location-link">
            View location on Google Maps
          </a>
        </p>
      `,
    },

    "resort-double-program": {
      title: "Fat2Fit Resort — Double Sharing Bamboo Cottage",
      whatsappText:
        "Hi%2C%20I%20want%20to%20book%20the%20Fat2Fit%20Resort%20Double%20Sharing%20program",
      images: [
        { src: "assets/double-1.jpeg", label: null },
        { src: "assets/double-2.jpeg", label: null },
        { src: "assets/double-3.jpeg", label: null },
        { src: "assets/pre-4.jpeg", label: null },
      ],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          The same structured, supervised program, delivered in a natural luxury
          bamboo cottage shared with one other guest — serene, close to nature,
          with premium coaching and personal attention built in.
        </p>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Double sharing bamboo cottage, attached washroom</li>
          <li>Shared with one other guest</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes</h3>
        <ul>
          <li>Stay in natural luxury cottages</li>
          <li>Premium coaching &amp; personal attention</li>
          <li>Structured daily training</li>
          <li>Specially curated meals</li>
          <li>High-speed Wi-Fi</li>
          <li>Attached washroom</li>
          <li>Supervision and accountability, 24/7</li>
        </ul>

        <h3>Who Should Join</h3>
        <ul>
          <li>People serious about weight loss</li>
          <li>Those who need routine and discipline</li>
          <li>Men and women ready to commit for results</li>
          <li>People who want a premium, shared setting</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; Double Sharing:</strong> <span>₹1,15,000</span></p>
          <small>Per person · Attached washroom · +18% GST extra</small>
        </div>

        <h3>How To Join</h3>
        <ul>
          <li>Message us on WhatsApp.</li>
          <li>Share your goal and availability.</li>
          <li>Confirm your booking.</li>
          <li>Make 50% payment to book your slot at least 15 days in advance.</li>
          <li>Receive confirmation with all essential details.</li>
        </ul>

        <h3>Paid Services Extra</h3>
        <ul>
          <li>Car parking</li>
          <li>Massages</li>
          <li>Laundry</li>
          <li>Blood test</li>
          <li>Doctor visit</li>
          <li>Local cab service</li>
        </ul>

        <h3>Rules</h3>
        <ul>
          <li>No discounts</li>
          <li>No transportation</li>
          <li>No non-vegetarian food</li>
          <li>No alcohol</li>
          <li>No smoking</li>
          <li>No foul language</li>
          <li>No disrespect to anyone</li>
        </ul>

        <h3>Location</h3>
        <p>
          Fat2Fit Resort is roughly 6 km up from NH5, pincode 171219, 13 km
          before Shimla.
          <a href="https://maps.app.goo.gl/SNdd1Ea5osSbSBqU8?g_st=iwb" target="_blank" class="modal-location-link">
            View location on Google Maps
          </a>
        </p>
      `,
    },

    "resort-single-program": {
      title: "Fat2Fit Resort — Private Single Occupancy",
      whatsappText:
        "Hi%2C%20I%20want%20to%20book%20the%20Fat2Fit%20Resort%20Private%20Single%20program",
      images: [
        { src: "assets/pre-1.jpeg", label: null },
        { src: "assets/pre-2.jpeg", label: null },
        { src: "assets/pre-3.jpeg", label: null },
        { src: "assets/pre-4.jpeg", label: null },
      ],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          The same structured, supervised program, in a fully private resort
          room of your own — a different, more exclusive room type from the
          double sharing cottage, with premium coaching and personal attention
          built in.
        </p>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Private resort room, one guest only, attached washroom</li>
          <li>Serene, close to nature</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes</h3>
        <ul>
          <li>Stay in a private natural luxury cottage</li>
          <li>Premium coaching &amp; personal attention</li>
          <li>Structured daily training</li>
          <li>Specially curated meals</li>
          <li>High-speed Wi-Fi</li>
          <li>Attached washroom</li>
          <li>Supervision and accountability, 24/7</li>
        </ul>

        <h3>Who Should Join</h3>
        <ul>
          <li>People serious about weight loss</li>
          <li>Those who need routine and discipline</li>
          <li>Men and women ready to commit for results</li>
          <li>People who want a fully private, premium setting</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; Private Single Occupancy:</strong> <span>₹2,35,000</span></p>
          <small>Per person · Attached washroom · +18% GST extra</small>
        </div>

        <h3>How To Join</h3>
        <ul>
          <li>Message us on WhatsApp.</li>
          <li>Share your goal and availability.</li>
          <li>Confirm your booking.</li>
          <li>Make 50% payment to book your slot at least 15 days in advance.</li>
          <li>Receive confirmation with all essential details.</li>
        </ul>

        <h3>Paid Services Extra</h3>
        <ul>
          <li>Car parking</li>
          <li>Massages</li>
          <li>Laundry</li>
          <li>Blood test</li>
          <li>Doctor visit</li>
          <li>Local cab service</li>
        </ul>

        <h3>Rules</h3>
        <ul>
          <li>No discounts</li>
          <li>No transportation</li>
          <li>No non-vegetarian food</li>
          <li>No alcohol</li>
          <li>No smoking</li>
          <li>No foul language</li>
          <li>No disrespect to anyone</li>
        </ul>

        <h3>Location</h3>
        <p>
          Fat2Fit Resort is roughly 6 km up from NH5, pincode 171219, 13 km
          before Shimla.
          <a href="https://maps.app.goo.gl/SNdd1Ea5osSbSBqU8?g_st=iwb" target="_blank" class="modal-location-link">
            View location on Google Maps
          </a>
        </p>
      `,
    },
  };

  document.querySelectorAll(".view-room-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!modal || !title || !details || !roomMedia) return;

      const type = this.dataset.program;
      const data = programData[type];
      if (!data) return;

      modal.classList.add("show");

      title.innerText = data.title;

      roomMedia.innerHTML = data.images
        .map((img, i) => {
          const label = img.label
            ? `<span class="room-media-label">${img.label}</span>`
            : "";
          const alt = img.label
            ? `${img.label} room`
            : `Program image ${i + 1}`;
          return `<div class="room-media-item">${label}<img src="${img.src}" alt="${alt}"></div>`;
        })
        .join("");

      details.innerHTML = data.html;

      if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/919873420987?text=${data.whatsappText}`;
      }

      initializeLightbox();
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  /* LIGHTBOX */

  function initializeLightbox() {
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.querySelector(".close-lightbox");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const counter = document.querySelector(".lightbox-counter");

    const images = Array.from(document.querySelectorAll(".room-media img"));
    let currentIndex = 0;

    if (!lightboxModal || !lightboxImage || images.length === 0) return;

    function showImage(index) {
      currentIndex = index;
      lightboxImage.src = images[currentIndex].src;
      lightboxImage.alt = images[currentIndex].alt || "Program image";

      if (counter) {
        counter.innerText = `${currentIndex + 1} / ${images.length}`;
      }
    }

    images.forEach((img, index) => {
      img.onclick = () => {
        showImage(index);
        lightboxModal.classList.add("show");
      };
    });

    if (closeLightbox) {
      closeLightbox.onclick = () => {
        lightboxModal.classList.remove("show");
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        showImage((currentIndex + 1) % images.length);
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        showImage((currentIndex - 1 + images.length) % images.length);
      };
    }

    lightboxModal.onclick = (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("show");
      }
    };

    document.addEventListener("keydown", (e) => {
      if (!lightboxModal.classList.contains("show")) return;

      if (e.key === "Escape") {
        lightboxModal.classList.remove("show");
      }

      if (e.key === "ArrowRight") {
        showImage((currentIndex + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        showImage((currentIndex - 1 + images.length) % images.length);
      }
    });
  }
});

/* =========================================================
   REGISTRATION -> RAZORPAY PAYMENT -> INVOICE FLOW
   ---------------------------------------------------------
   1. The registration form is collected entirely in the
      browser — no backend needed for this part.

   2. "Pay Advance via Razorpay" opens your razorpay.me link
      in a NEW TAB. IMPORTANT: a razorpay.me link does not
      reliably accept amount/email/contact as URL query
      params — passing them caused Razorpay's own "Oops,
      something went wrong" error page. So this now links to
      the PLAIN base URL with no query string, and the exact
      amount to type in is shown to the customer on-page
      instead. If you later create a proper Razorpay Payment
      Page (not just a razorpay.me short link) with prefill
      fields explicitly enabled in the dashboard, this can be
      revisited — ask if you want that wired back in.

   3. A razorpay.me link has no built-in way to call back into
      a static page the instant payment succeeds. So the
      customer taps "I've Completed The Payment" themselves
      once they're done in the other tab (optionally pasting
      the Payment ID Razorpay shows them). This is the normal
      workaround for using a Payment Link with no backend, but
      it is a self-declared confirmation, not a cryptographically
      verified one. If you want real verification, that needs
      Razorpay's "Redirect to your website" Payment Page setting
      plus (properly) a webhook to a small server — ask if you
      want that built.

   4. The invoice below is generated immediately and can be
      printed / saved as a PDF from the browser's print dialog.
      It now uses the real Fat2Fit logo (assets/logo.png).

   5. A copy goes to Fat2Fit via a pre-filled WhatsApp message —
      it takes one tap to send, since WhatsApp can't be fired
      silently from a webpage. For a fully automatic emailed
      copy to both the customer and yourself the instant they
      tap "I've Completed The Payment", sign up free at
      emailjs.com and fill in EMAILJS_CONFIG below — nothing
      else needs to change. Leave it blank and this step is
      simply skipped (the WhatsApp copy + print/download still
      work either way). See the step-by-step setup notes sent
      alongside this file for exactly what to paste in.
   ========================================================= */

const RAZORPAY_LINK = "https://razorpay.me/@fat2fitbyeddeys";
const BUSINESS_WHATSAPP = "919873420987";
const BUSINESS_EMAIL = "info@fat2fit.in";

// Optional, no-backend email automation. Get these 3-4 values free from
// https://dashboard.emailjs.com (Account > API Keys, Email Services, and
// Email Templates). Leave publicKey/serviceId blank to skip emailing
// entirely — everything else on the site keeps working.
const EMAILJS_CONFIG = {
  publicKey: "",          // e.g. "AbCdEfGhIjKlMnOp"
  serviceId: "",          // e.g. "service_xxxxxxx"
  customerTemplateId: "", // template that emails the customer their invoice
  adminTemplateId: "",    // template that emails Fat2Fit a copy
};

const PACKAGES = {
  hostel4: { label: "Fat2Fit Hostel — 4 Sharing", base: 56000 },
  hostel1: { label: "Fat2Fit Hostel — Single Occupancy", base: 85000 },
  resortdouble: { label: "Fat2Fit Resort — Double Sharing", base: 115000 },
  resortsingle: { label: "Fat2Fit Resort — Private Single Occupancy", base: 235000 },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function populateMonths(selectEl) {
  selectEl.innerHTML = "";
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const label = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    const opt = document.createElement("option");
    opt.value = label;
    opt.textContent = label;
    selectEl.appendChild(opt);
  }
}

function generateBookingId() {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const counterKey = "f2f_booking_counter_" + ymd;
  let n = parseInt(localStorage.getItem(counterKey) || "0", 10) + 1;
  try {
    localStorage.setItem(counterKey, String(n));
  } catch (err) {
    n = Math.floor(Math.random() * 900) + 100;
  }
  return `FTF-${ymd}-${String(n).padStart(3, "0")}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const regModal = document.getElementById("registrationModal");
  if (!regModal) return;

  const closeReg = document.querySelector(".close-registration");
  const step1 = document.getElementById("regStep1");
  const step2 = document.getElementById("regStep2");
  const step3 = document.getElementById("regStep3");
  const form = document.getElementById("registrationForm");
  const formError = document.getElementById("regFormError");
  const packageSelect = document.getElementById("regPackage");
  const monthSelect = document.getElementById("regMonth");
  const regSummary = document.getElementById("regSummary");
  const regPayBtn = document.getElementById("regPayBtn");
  const regPayAmountHint = document.getElementById("regPayAmountHint");
  const regTxnId = document.getElementById("regTxnId");
  const regConfirmPaidBtn = document.getElementById("regConfirmPaidBtn");
  const regBackBtn = document.getElementById("regBackBtn");
  const invoiceContent = document.getElementById("invoiceContent");
  const regPrintBtn = document.getElementById("regPrintBtn");
  const regWhatsappCopyBtn = document.getElementById("regWhatsappCopyBtn");

  populateMonths(monthSelect);

  let currentBooking = null;

  function showStep(step) {
    [step1, step2, step3].forEach((s) => (s.style.display = "none"));
    step.style.display = "block";
  }

  function openRegModal(packageKey) {
    form.reset();
    formError.textContent = "";
    populateMonths(monthSelect);
    if (packageKey && PACKAGES[packageKey]) {
      packageSelect.value = packageKey;
    }
    showStep(step1);
    regModal.classList.add("show");
  }

  function closeRegModal() {
    regModal.classList.remove("show");
  }

  document.querySelectorAll("[data-register-package]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openRegModal(btn.dataset.registerPackage);
    });
  });

  if (closeReg) {
    closeReg.addEventListener("click", closeRegModal);
  }

  regModal.addEventListener("click", (e) => {
    if (e.target === regModal) closeRegModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formError.textContent = "";

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const age = document.getElementById("regAge").value.trim();
    const place = document.getElementById("regPlace").value.trim();
    const packageKey = packageSelect.value;
    const month = monthSelect.value;
    const dayInput = form.querySelector('input[name="regDay"]:checked');
    const day = dayInput ? dayInput.value : "1";

    if (!name || !email || !phone || !age || !place || !packageKey || !month) {
      formError.textContent = "Please fill in every field before continuing.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formError.textContent = "Please enter a valid email address.";
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) {
      formError.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    const pkg = PACKAGES[packageKey];
    const gst = pkg.base * 0.18;
    const total = pkg.base + gst;
    const advance = Math.round(total / 2);
    const balance = Math.round(total) - advance;

    currentBooking = {
      name, email, phone, age, place,
      packageKey, packageLabel: pkg.label,
      month, day,
      base: pkg.base, gst,
      total: Math.round(total), advance, balance,
      txnId: "",
      bookingId: null,
    };

    renderSummary(currentBooking);
    updatePayLink(currentBooking);
    showStep(step2);
  });

  function renderSummary(b) {
    regSummary.innerHTML = `
      <div class="reg-summary-row"><span>Name</span><span>${escapeHtml(b.name)}</span></div>
      <div class="reg-summary-row"><span>Package</span><span>${escapeHtml(b.packageLabel)}</span></div>
      <div class="reg-summary-row"><span>Joining</span><span>${escapeHtml(b.month)}, ${b.day === "1" ? "1st" : "15th"}</span></div>
      <div class="reg-summary-row"><span>Program Fee</span><span>${formatINR(b.base)}</span></div>
      <div class="reg-summary-row"><span>GST (18%)</span><span>${formatINR(b.gst)}</span></div>
      <div class="reg-summary-row reg-total"><span>Total Program Fee</span><span>${formatINR(b.total)}</span></div>
      <div class="reg-summary-row reg-advance"><span>Pay Now (50% Advance)</span><span>${formatINR(b.advance)}</span></div>
      <div class="reg-summary-row"><span>Remaining Balance (on arrival)</span><span>${formatINR(b.balance)}</span></div>
    `;
  }

  function updatePayLink(b) {
    // NOTE: razorpay.me does not reliably accept amount/email/contact as
    // URL query params — appending them previously caused Razorpay's own
    // "Oops, something went wrong" error page. Linking to the plain base
    // URL avoids that; the amount to enter is shown to the customer instead.
    regPayBtn.href = RAZORPAY_LINK;
    regPayBtn.textContent = `Open Razorpay to Pay ${formatINR(b.advance)}`;
    if (regPayAmountHint) {
      regPayAmountHint.textContent = formatINR(b.advance);
    }
  }

  regBackBtn.addEventListener("click", () => showStep(step1));

  regConfirmPaidBtn.addEventListener("click", () => {
    if (!currentBooking) return;
    currentBooking.txnId = regTxnId.value.trim();
    currentBooking.bookingId = generateBookingId();

    renderInvoice(currentBooking);
    saveBookingLocally(currentBooking);
    buildWhatsappCopyLink(currentBooking);
    sendConfirmationEmails(currentBooking);
    showStep(step3);
  });

  function renderInvoice(b) {
    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const paid = !!b.txnId;

    invoiceContent.innerHTML = `
      <div class="invoice-topbar"></div>
      <div class="invoice-header">
        <img class="invoice-logo-img" src="assets/logo.png" alt="Fat2Fit Retreat, Shimla logo" />
        <div>
          <h2>FAT2FIT</h2>
          <p>30 Days Weight Loss &amp; Detox Camp Retreat, Shimla</p>
          <p class="invoice-tagline">Better Health, A Brighter You</p>
        </div>
      </div>

      <div class="invoice-meta-strip">
        <div><strong>Booking ID:</strong> ${b.bookingId}</div>
        <div><strong>Issue Date:</strong> ${issueDate}</div>
      </div>

      <div class="invoice-body">
        <div class="invoice-box">
          <h4>Customer Details</h4>
          <div class="invoice-row"><span>Name</span><span>${escapeHtml(b.name)}</span></div>
          <div class="invoice-row"><span>Email</span><span>${escapeHtml(b.email)}</span></div>
          <div class="invoice-row"><span>Phone</span><span>${escapeHtml(b.phone)}</span></div>
          <div class="invoice-row"><span>Age</span><span>${escapeHtml(b.age)}</span></div>
          <div class="invoice-row"><span>Place</span><span>${escapeHtml(b.place)}</span></div>
        </div>
        <div class="invoice-box">
          <h4>Program Details</h4>
          <div class="invoice-row"><span>Program</span><span>30 Days Weight Loss &amp; Detox Camp</span></div>
          <div class="invoice-row"><span>Accommodation</span><span>${escapeHtml(b.packageLabel)}</span></div>
          <div class="invoice-row"><span>Joining Month</span><span>${escapeHtml(b.month)}</span></div>
          <div class="invoice-row"><span>Joining Day</span><span>${b.day === "1" ? "1st" : "15th"}</span></div>
          <div class="invoice-row"><span>Place</span><span>${escapeHtml(b.place)}</span></div>
        </div>
      </div>

      <div class="invoice-table-wrap">
        <table class="invoice-table">
          <thead>
            <tr><th>Description</th><th>Amount (₹)</th></tr>
          </thead>
          <tbody>
            <tr><td>Program Fee (per person)</td><td>${formatINR(b.base)}</td></tr>
            <tr><td>GST (18%)</td><td>${formatINR(b.gst)}</td></tr>
            <tr class="invoice-table-total"><td>Total Program Fee</td><td>${formatINR(b.total)}</td></tr>
            <tr><td>Advance Paid (50%)</td><td>${formatINR(b.advance)}</td></tr>
            <tr><td>Remaining Balance (50%, on arrival)</td><td>${formatINR(b.balance)}</td></tr>
            ${b.txnId ? `<tr><td>Razorpay Payment ID</td><td>${escapeHtml(b.txnId)}</td></tr>` : ""}
          </tbody>
        </table>
      </div>

      <div class="invoice-confirmed ${paid ? "" : "pending"}">
        <div class="invoice-confirmed-icon">${paid ? "&#10003;" : "!"}</div>
        <div>
          <strong>${paid ? "Payment Confirmed" : "Booking Received — Confirming Payment"}</strong>
          <p>${paid
            ? "Thanks for choosing Fat2Fit! Your slot is reserved. We'll follow up with joining and travel details."
            : "We've recorded your booking. If your payment is still processing, please share your Razorpay payment ID with us on WhatsApp so we can confirm your slot."}</p>
        </div>
      </div>

      <div class="invoice-footer">
        <p><strong>Next Steps:</strong> We'll be in touch about your joining date, travel guidance and pre-arrival instructions.</p>
        <p>+91 9873420987 &middot; ${BUSINESS_EMAIL} &middot; Retreat, Shimla &middot; www.fat2fit.in</p>
        <p>GSTIN: 07FJKPS7637P1Z1 &middot; Aditya Sharma, trading as Eddey's</p>
      </div>
    `;
  }

  function saveBookingLocally(b) {
    try {
      const key = "f2f_bookings";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(b);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (err) {
      // localStorage can fail (private browsing, storage full). The booking
      // still displays and can be printed or sent via WhatsApp regardless.
      console.warn("Could not save booking locally:", err);
    }
  }

  function buildWhatsappCopyLink(b) {
    const lines = [
      "New Fat2Fit Booking",
      `Booking ID: ${b.bookingId}`,
      `Name: ${b.name}`,
      `Email: ${b.email}`,
      `Phone: ${b.phone}`,
      `Age: ${b.age}`,
      `Place: ${b.place}`,
      `Package: ${b.packageLabel}`,
      `Joining: ${b.month}, ${b.day === "1" ? "1st" : "15th"}`,
      `Total Fee: ${formatINR(b.total)}`,
      `Advance Paid: ${formatINR(b.advance)}`,
      `Balance Due: ${formatINR(b.balance)}`,
      b.txnId ? `Razorpay Payment ID: ${b.txnId}` : "Razorpay Payment ID: (not provided yet)",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    regWhatsappCopyBtn.href = `https://wa.me/${BUSINESS_WHATSAPP}?text=${text}`;
  }

  function sendConfirmationEmails(b) {
    const cfg = EMAILJS_CONFIG;
    if (!cfg.publicKey || !cfg.serviceId || typeof emailjs === "undefined") {
      return; // not configured — WhatsApp copy + print/download still work
    }
    try {
      emailjs.init({ publicKey: cfg.publicKey });
      const payload = {
        booking_id: b.bookingId,
        customer_name: b.name,
        customer_phone: b.phone,
        package_label: b.packageLabel,
        joining: `${b.month}, ${b.day === "1" ? "1st" : "15th"}`,
        total: formatINR(b.total),
        advance: formatINR(b.advance),
        balance: formatINR(b.balance),
        txn_id: b.txnId || "Not provided",
      };
      if (cfg.customerTemplateId) {
        emailjs.send(cfg.serviceId, cfg.customerTemplateId, { ...payload, to_email: b.email } );
      }
      if (cfg.adminTemplateId) {
        emailjs.send(cfg.serviceId, cfg.adminTemplateId, { ...payload, to_email: BUSINESS_EMAIL });
      }
    } catch (err) {
      console.warn("EmailJS send failed:", err);
    }
  }

  if (regPrintBtn) {
    regPrintBtn.addEventListener("click", () => window.print());
  }
});