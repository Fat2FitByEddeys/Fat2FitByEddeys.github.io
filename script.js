/* =========================================================
   META PIXEL TRACKING HELPER LAYER
   ========================================================= */
const F2FAnalytics = {
  track(eventName, params = {}) {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, params);
    }
  },
  trackCustom(eventName, params = {}) {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  },
  getPackageMeta(packageKey) {
    const PACKAGES = window.PACKAGES || {};
    const pkg = PACKAGES[packageKey];
    const fallbackPrices = {
      hostel4: 70000,
      hostel1: 90000,
      villacozy: 121000,
      villapremium: 141000,
      resortsingle: 235000,
      online3m: 9999,
      founderPt: 80000,
    };
    return {
      id: packageKey || "unknown",
      name: pkg ? pkg.label : packageKey || "Fat2Fit Program",
      value: pkg ? pkg.base : fallbackPrices[packageKey] || 0,
      category: pkg && pkg.type === "online" ? "Online Pass" : "Shimla Retreat Camp",
    };
  },
};

document.addEventListener("DOMContentLoaded", () => {
  /* POPUP */
  const popup = document.getElementById("popupOverlay");
  const closePopup = document.querySelector(".close-popup");

  if (popup && closePopup) {
    setTimeout(() => {
      popup.classList.add("show");
      F2FAnalytics.trackCustom("PopupShown", { popup_type: "welcome_overlay" });
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

  /* PROGRAM DETAILS MODAL */
  const modal = document.getElementById("programModal");
  const closeBtn = document.querySelector(".close-program");
  const title = document.getElementById("programTitle");
  const details = document.getElementById("programDetails");
  const roomMedia = document.querySelector(".room-media");
  const programRegisterBtn = document.getElementById("programRegisterBtn");

  const programData = {
    "hostel-program": {
      packageKey: "hostel4",
      title: "Fat2Fit Hostel — Dual Sharing & Private Room",
      images: [
        { src: "assets/hostel-1.jpeg" },
        { src: "assets/hostel-2.jpeg" },
        { src: "assets/hostel-3.jpeg" },
      ],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          A structured fitness bootcamp in the scenic hills of Shimla at an
          accessible price — built for budget-conscious individuals, college
          and school groups, and solo travelers who want a real, economical
          camp experience. No-frills accommodation, a minimalist approach,
          and a focus purely on the fitness program: community, group
          challenges, and physical transformation.
        </p>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Dual sharing room, attached washroom</li>
          <li>Private room option also available</li>
          <li>Group size: 20 people, large group training sessions</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes</h3>
        <ul>
          <li>Stay (dual sharing or private room)</li>
          <li>Large group training, led by our Junior Coaches</li>
          <li>Healthy wholesome meals included</li>
          <li>Wi-Fi available</li>
          <li>Attached washroom</li>
          <li>Supervision and accountability, 24/7</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; Dual Sharing:</strong> <span>₹70,000</span></p>
          <p><strong>30 Days &middot; Private Room:</strong> <span>₹90,000</span></p>
          <small>Per person &middot; Attached washroom &middot; +18% GST extra</small>
        </div>

        <h3>Rules &amp; Discipline</h3>
        <ul>
          <li>No alcohol &middot; No smoking &middot; No non-veg food</li>
          <li>No discounts &middot; No foul language &middot; No disrespect to anyone</li>
        </ul>
      `,
    },

    "villa-program": {
      packageKey: "villacozy",
      title: "Fat2Fit Villa — Cozy Private Room & Premium Villa Room",
      images: [
        { src: "assets/vila/img1.jpeg" },
        { src: "assets/vila/img2.jpeg" },
        { src: "assets/vila/img3.jpeg" },
        { src: "assets/vila/img4.jpeg" },
        { src: "assets/vila/img5.jpeg" },
        { src: "assets/vila/aerial-villa.jpeg" },
        { src: "assets/vila/swimming-villa.jpeg" },
      ],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          Optimal physical outcomes and intensive training without
          compromising on living quality. Upscale, comfortable accommodation
          in a premium villa, with personalized attention, advanced
          amenities and curated healthy meals — built for executives,
          professionals, and busy couples or friends who prioritize real
          results alongside real comfort.
        </p>

        <h3>Choose Your Room Category</h3>
        <p>
          Both categories offer the same villa, programme, training and meals.
          The only difference is the room you stay in — its size and whether it
          comes with a view.
        </p>
        <ul>
          <li>
            <strong>Cozy Private Room (₹1,21,000):</strong> A compact private
            room without a view. A practical and comfortable choice for guests
            who spend most of their day in training and want privacy at a more
            accessible price.
          </li>
          <li>
            <strong>Premium Villa Room (₹1,41,000):</strong> A private room
            with a scenic view. Suited to guests who prefer a more relaxing,
            immersive setting for rest and recovery between sessions.
          </li>
        </ul>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Private room in the villa — Cozy (compact, no view) or Premium (with view)</li>
          <li>Group size: 10 people, semi-private training sessions</li>
          <li>Training led directly by our Head Coach (Program Designer)</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes (Both Room Categories)</h3>
        <ul>
          <li>Independent living in an upscale, private villa room</li>
          <li>Semi-private training &amp; personalized coaching</li>
          <li>Curated healthy meals</li>
          <li>Advanced amenities &amp; high-speed Wi-Fi</li>
          <li>Attached washroom</li>
          <li>24/7 supervision &amp; accountability</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; Cozy Private Room (compact, no view):</strong> <span>₹1,21,000</span></p>
          <p><strong>30 Days &middot; Premium Villa Room (with view):</strong> <span>₹1,41,000</span></p>
          <small>Per person &middot; Attached washroom &middot; +18% GST extra</small>
        </div>
      `,
    },

    "resort-program": {
      packageKey: "resortsingle",
      title: "Fat2Fit Resorts — Individual Resort Cottage",
      images: [
        { src: "assets/premium-main.jpeg" },
        { src: "assets/premiumbamboo.jpeg" },
        { src: "assets/pre-1.jpeg" },
        { src: "assets/pre-2.jpeg" },
        { src: "assets/aerial-resort.jpeg" },
      ],
      html: `
        <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
        <p>
          Immerse yourself in total luxury and exclusive services. Live in
          an expansive resort-style setting with high-end facilities,
          personalized concierge, private training, sophisticated dining,
          and a group of similar HNI clients — ultra-luxury combined with
          expert fitness.
        </p>

        <h3>Room &amp; Batch</h3>
        <ul>
          <li>Individual luxury resort cottage, attached washroom</li>
          <li>Group size: 7 people, precise small-group training sessions</li>
          <li>Training led directly by our Head Coach (Program Designer)</li>
          <li>Joining dates: 1st &amp; 15th of every month, all year round</li>
        </ul>

        <h3>What The Program Includes</h3>
        <ul>
          <li>Stay in a scenic, luxury individual resort cottage</li>
          <li>Precise, small-group training with intensive personal attention</li>
          <li>Sophisticated, specially curated dining</li>
          <li>Personalized concierge &amp; luxury facilities</li>
          <li>Attached washroom</li>
          <li>24/7 supervision &amp; accountability</li>
        </ul>

        <h3>Investment</h3>
        <div class="modal-price-box">
          <p><strong>30 Days &middot; Individual Resort Cottage:</strong> <span>₹2,35,000</span></p>
          <small>Per person &middot; Attached washroom &middot; +18% GST extra</small>
        </div>
      `,
    },
  };

  // Backwards-compatible aliases
  programData["resort-double-program"] = programData["villa-program"];
  programData["resort-single-program"] = programData["resort-program"];

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
          return `<div class="room-media-item"><img src="${img.src}" alt="Program image ${i + 1}"></div>`;
        })
        .join("");

      details.innerHTML = data.html;

      if (programRegisterBtn) {
        programRegisterBtn.dataset.registerPackage = data.packageKey || "hostel4";
      }

      // Track ViewContent when user views full details of a camp tier
      const meta = F2FAnalytics.getPackageMeta(data.packageKey);
      F2FAnalytics.track("ViewContent", {
        content_name: data.title,
        content_ids: [meta.id],
        content_type: "product",
        content_category: meta.category,
        value: meta.value,
        currency: "INR",
      });

      initializeLightbox();
    });
  });

  if (programRegisterBtn) {
    programRegisterBtn.addEventListener("click", () => {
      if (modal) modal.classList.remove("show");
      const pkg = programRegisterBtn.dataset.registerPackage || "hostel4";
      if (typeof window.openRegModal === "function") {
        window.openRegModal(pkg);
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
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
        F2FAnalytics.trackCustom("ViewRoomPhoto", {
          image_src: img.getAttribute("src"),
          image_index: index + 1,
        });
      };
    });

    if (closeLightbox) {
      closeLightbox.onclick = () => lightboxModal.classList.remove("show");
    }

    if (nextBtn) {
      nextBtn.onclick = () => showImage((currentIndex + 1) % images.length);
    }

    if (prevBtn) {
      prevBtn.onclick = () => showImage((currentIndex - 1 + images.length) % images.length);
    }

    lightboxModal.onclick = (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove("show");
    };

    document.addEventListener("keydown", (e) => {
      if (!lightboxModal.classList.contains("show")) return;
      if (e.key === "Escape") lightboxModal.classList.remove("show");
      if (e.key === "ArrowRight") showImage((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft") showImage((currentIndex - 1 + images.length) % images.length);
    });
  }

  /* =========================================================
     BEHAVIORAL & ENGAGEMENT TRACKING (CTAs, Scroll, Sections)
     ========================================================= */

  // 1. WhatsApp Contact Clicks (Navbar, Hero, Popup, Founder PT, Footer)
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (link.id === "regWhatsappCopyBtn") return; // Handled separately in invoice flow
      let placement = "general";
      if (link.classList.contains("nav-btn")) placement = "navbar_join_now";
      else if (link.classList.contains("founder-pt-btn")) placement = "founder_1on1_pt";
      else if (link.classList.contains("footer-whatsapp")) placement = "footer_whatsapp";
      else if (link.closest("#popupOverlay")) placement = "welcome_popup";
      else if (link.closest(".hero")) placement = "hero_book_appointment";

      F2FAnalytics.track("Contact", {
        content_name: "WhatsApp Inquiry",
        content_category: placement,
        value: placement === "founder_1on1_pt" ? 80000 : 0,
        currency: "INR",
      });
    });
  });

  // 2. Brochure Download
  const brochureBtn = document.querySelector(".download-brochure-btn");
  if (brochureBtn) {
    brochureBtn.addEventListener("click", () => {
      F2FAnalytics.trackCustom("DownloadBrochure", {
        content_name: "Fat2Fit Camp Brochure",
      });
    });
  }

  // 3. Google Maps Location Clicks
  document.querySelectorAll(".location-map-btn, .footer-location-link").forEach((link) => {
    link.addEventListener("click", () => {
      F2FAnalytics.track("FindLocation", {
        content_name: "Fat2Fit Shimla Camp Location (171219)",
      });
    });
  });

  // 4. Transformation Reels & Instagram Social Proof
  document.querySelectorAll(".person-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const personCard = btn.closest(".person");
      const personName = personCard?.querySelector("h4")?.innerText || "Transformation Story";
      F2FAnalytics.trackCustom("ViewTransformationReel", {
        person_name: personName,
      });
    });
  });

  document.querySelectorAll('.instagram-section a[href*="instagram.com"]').forEach((link) => {
    link.addEventListener("click", () => {
      F2FAnalytics.trackCustom("FollowInstagram", {
        account: "@fat2fitbyeddeys",
      });
    });
  });

  // 5. Scroll Depth Tracking (25%, 50%, 75%, 100%)
  const scrollMilestones = new Set();
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrolledPct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (scrolledPct >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          F2FAnalytics.trackCustom("ScrollDepth", {
            percentage: milestone,
          });
        }
      });
    },
    { passive: true }
  );

  // 6. Section Visibility Tracking (Know which sections users stop and read)
  if ("IntersectionObserver" in window) {
    const seenSections = new Set();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && !seenSections.has(entry.target.id)) {
            seenSections.add(entry.target.id);
            F2FAnalytics.trackCustom("SectionView", {
              section_id: entry.target.id,
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    ["programs", "founder-pt", "online-pass", "routine", "location", "testimonials", "coach", "about"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      }
    );
  }
});

/* =========================================================
   REGISTRATION -> RAZORPAY PAYMENT -> INVOICE FLOW
   ========================================================= */

const SUPABASE_URL = "https://xizhqapprrojjftplqbi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7z4mUIERb9kTQseuMJQhA_FODOq_Ei";
const RAZORPAY_KEY_ID = "rzp_live_TorLuZvWLLSzRN";
const BUSINESS_WHATSAPP = "919873420987";
const BUSINESS_EMAIL = "info@fat2fit.in";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function populateMonths(selectEl) {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  // If today is past the 15th of the current month, both batch dates (1st and 15th)
  // have already passed. We start the selectable months from next month.
  // If today is on or before the 15th, the current month still has the 15th batch.
  const startOffset = currentDate > 15 ? 1 : 0;

  for (let i = startOffset; i < startOffset + 12; i++) {
    const d = new Date(currentYear, currentMonth + i, 1);
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
  const PACKAGES = window.PACKAGES || {};
  const formatINR =
    window.formatINR ||
    function (n) {
      return "₹" + Math.round(n).toLocaleString("en-IN");
    };

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
  const campDatesRow = document.getElementById("campDatesRow");
  const regSummary = document.getElementById("regSummary");
  const regPayBtn = document.getElementById("regPayBtn");
  const regLoadingNote = document.getElementById("regLoadingNote");
  const regBackBtn = document.getElementById("regBackBtn");
  const invoiceContent = document.getElementById("invoiceContent");
  const regPrintBtn = document.getElementById("regPrintBtn");
  const regWhatsappCopyBtn = document.getElementById("regWhatsappCopyBtn");
  const regNewBookingBtn = document.getElementById("regNewBookingBtn");

  populateMonths(monthSelect);

  function updateBatchDayOptions() {
    if (!monthSelect) return;
    const monthVal = monthSelect.value;
    if (!monthVal) return;

    const day1Input = document.getElementById("regDay1");
    const day15Input = document.getElementById("regDay15");
    const day1Label = document.getElementById("regDay1Label");
    const day15Label = document.getElementById("regDay15Label");

    if (!day1Input || !day15Input) return;

    const parts = monthVal.split(" ");
    const monthName = parts[0];
    const year = parseInt(parts[1], 10);
    const monthIndex = MONTH_NAMES.indexOf(monthName);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const batch1Date = new Date(year, monthIndex, 1);
    const batch15Date = new Date(year, monthIndex, 15);

    const isBatch1Past = batch1Date < todayStart;
    const isBatch15Past = batch15Date < todayStart;

    // 1st of Month
    day1Input.disabled = isBatch1Past;
    if (day1Label) {
      if (isBatch1Past) {
        day1Label.classList.add("disabled");
        day1Label.title = "This batch date has already passed";
        if (!day1Label.querySelector(".batch-passed-tag")) {
          const tag = document.createElement("span");
          tag.className = "batch-passed-tag";
          tag.textContent = "Passed";
          day1Label.appendChild(tag);
        }
      } else {
        day1Label.classList.remove("disabled");
        day1Label.removeAttribute("title");
        const tag = day1Label.querySelector(".batch-passed-tag");
        if (tag) tag.remove();
      }
    }

    // 15th of Month
    day15Input.disabled = isBatch15Past;
    if (day15Label) {
      if (isBatch15Past) {
        day15Label.classList.add("disabled");
        day15Label.title = "This batch date has already passed";
        if (!day15Label.querySelector(".batch-passed-tag")) {
          const tag = document.createElement("span");
          tag.className = "batch-passed-tag";
          tag.textContent = "Passed";
          day15Label.appendChild(tag);
        }
      } else {
        day15Label.classList.remove("disabled");
        day15Label.removeAttribute("title");
        const tag = day15Label.querySelector(".batch-passed-tag");
        if (tag) tag.remove();
      }
    }

    // Auto-switch radio if currently checked option is disabled
    const currentChecked = form.querySelector('input[name="regDay"]:checked');
    if (!currentChecked || currentChecked.disabled) {
      if (!day1Input.disabled) {
        day1Input.checked = true;
      } else if (!day15Input.disabled) {
        day15Input.checked = true;
      }
    }
  }

  if (monthSelect) {
    monthSelect.addEventListener("change", updateBatchDayOptions);
  }

  let currentBooking = null;

  function handlePackageChange() {
    const pkg = PACKAGES[packageSelect.value];
    if (campDatesRow) {
      if (pkg && pkg.type === "online") {
        campDatesRow.style.display = "none";
      } else {
        campDatesRow.style.display = "grid";
        updateBatchDayOptions();
      }
    }
  }

  if (packageSelect) {
    packageSelect.addEventListener("change", () => {
      handlePackageChange();
      const meta = F2FAnalytics.getPackageMeta(packageSelect.value);
      F2FAnalytics.trackCustom("SelectProgramOption", {
        content_name: meta.name,
        content_ids: [meta.id],
        value: meta.value,
        currency: "INR",
      });
    });
  }

  function showStep(step) {
    [step1, step2, step3].forEach((s) => (s.style.display = "none"));
    step.style.display = "block";
  }

  function openRegModal(packageKey) {
    currentBooking = null;
    form.reset();
    formError.textContent = "";
    resetPayBtn();
    populateMonths(monthSelect);

    if (packageKey && PACKAGES[packageKey]) {
      packageSelect.value = packageKey;
    }
    handlePackageChange();
    updateBatchDayOptions();
    showStep(step1);
    regModal.classList.add("show");

    // Track AddToCart when user opens registration modal for a specific package
    const selectedKey = packageSelect ? packageSelect.value : packageKey || "hostel4";
    const meta = F2FAnalytics.getPackageMeta(selectedKey);
    F2FAnalytics.track("AddToCart", {
      content_name: meta.name,
      content_ids: [meta.id],
      content_type: "product",
      content_category: meta.category,
      value: meta.value,
      currency: "INR",
    });
  }

  window.openRegModal = openRegModal;

  function closeRegModal() {
    regModal.classList.remove("show");
    resetPayBtn();
    showStep(step1);
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
    const place = document.getElementById("regPlace").value.trim();
    const age = document.getElementById("regAge").value.trim();
    const weight = document.getElementById("regWeight").value.trim();
    const height = document.getElementById("regHeight").value.trim();
    const goal = document.getElementById("regGoal").value;
    const allergies = document.getElementById("regAllergies").value.trim() || "None declared";
    const additional = document.getElementById("regAdditional").value.trim() || "None";
    const packageKey = packageSelect.value;

    if (!name || !email || !phone || !place || !age || !weight || !height || !packageKey) {
      formError.textContent = "Please fill in all required fields marked with an asterisk (*).";
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
    let month = "Immediate Activation";
    let day = "Immediate";

    if (pkg.type === "camp") {
      month = monthSelect ? monthSelect.value : "Upcoming Batch";
      const dayInput = form.querySelector('input[name="regDay"]:checked');
      if (!dayInput || dayInput.disabled) {
        formError.textContent =
          "The selected batch date has already passed. Please select an upcoming batch date.";
        return;
      }
      day = dayInput.value;

      // Ensure joining date is strictly in the future
      const parts = month.split(" ");
      if (parts.length >= 2) {
        const mIdx = MONTH_NAMES.indexOf(parts[0]);
        const yr = parseInt(parts[1], 10);
        const dayNum = parseInt(day, 10);
        const batchDate = new Date(yr, mIdx, dayNum);
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (batchDate < todayStart) {
          formError.textContent =
            "The selected batch date has already passed. Please select an upcoming joining batch.";
          return;
        }
      }
    }

    let gst = 0;
    let total = pkg.base;
    let advance = pkg.base;
    let balance = 0;

    if (pkg.isFullPayment) {
      // Online Pass: One-time all-inclusive fee
      gst = 0;
      total = pkg.base;
      advance = pkg.base;
      balance = 0;
    } else {
      // 30-Day In-Person Camp: 50% advance + 18% GST
      gst = Math.round(pkg.base * 0.18);
      total = pkg.base + gst;
      advance = Math.round(total / 2);
      balance = total - advance;
    }

    currentBooking = {
      name,
      email,
      phone,
      place,
      age,
      weight,
      height,
      goal,
      allergies,
      additional,
      packageKey,
      packageLabel: pkg.label,
      isOnline: !!pkg.isFullPayment,
      month,
      day,
      base: pkg.base,
      gst,
      total,
      advance,
      balance,
      txnId: "",
      bookingId: null,
    };

    // Track Lead when user completes registration & health assessment (Step 1)
    F2FAnalytics.track("Lead", {
      content_name: currentBooking.packageLabel,
      content_category: currentBooking.goal,
      content_ids: [currentBooking.packageKey],
      city: currentBooking.place,
      value: currentBooking.total,
      currency: "INR",
    });

    renderSummary(currentBooking);
    resetPayBtn();
    regPayBtn.textContent = `Pay ${formatINR(currentBooking.advance)} via Razorpay`;
    showStep(step2);
  });

  function renderSummary(b) {
    regSummary.innerHTML = `
      <div class="reg-summary-section">
        <h5>Customer &amp; Health Profile</h5>
        <div class="reg-summary-row"><span>Name</span><span><strong>${escapeHtml(b.name)}</strong></span></div>
        <div class="reg-summary-row"><span>Email / Phone</span><span>${escapeHtml(b.email)} | ${escapeHtml(b.phone)}</span></div>
        <div class="reg-summary-row"><span>Age / City</span><span>${escapeHtml(b.age)} yrs &middot; ${escapeHtml(b.place)}</span></div>
        <div class="reg-summary-row"><span>Weight &amp; Height</span><span>${escapeHtml(b.weight)} &middot; ${escapeHtml(b.height)}</span></div>
        <div class="reg-summary-row"><span>Primary Goal</span><span>${escapeHtml(b.goal)}</span></div>
        <div class="reg-summary-row"><span>Diet / Allergies</span><span>${escapeHtml(b.allergies)}</span></div>
      </div>

      <div class="reg-summary-section">
        <h5>Selected Program &amp; Batch</h5>
        <div class="reg-summary-row"><span>Program</span><span><strong>${escapeHtml(b.packageLabel)}</strong></span></div>
        <div class="reg-summary-row"><span>Schedule</span><span>${b.isOnline ? "Starts Immediately after onboarding" : `${escapeHtml(b.month)}, ${b.day === "1" ? "1st" : "15th"}`}</span></div>
      </div>

      <div class="reg-summary-section">
        <h5>Payment Details</h5>
        <div class="reg-summary-row"><span>${b.isOnline ? "Plan Fee" : "Base Program Fee"}</span><span>${formatINR(b.base)}</span></div>
        ${b.gst > 0 ? `<div class="reg-summary-row"><span>GST (18%)</span><span>${formatINR(b.gst)}</span></div>` : ""}
        <div class="reg-summary-row reg-total"><span>Total Payable</span><span>${formatINR(b.total)}</span></div>
        <div class="reg-summary-row reg-advance"><span>Pay Now (${b.isOnline ? "Full Payment" : "50% Advance"})</span><span>${formatINR(b.advance)}</span></div>
        ${b.balance > 0 ? `<div class="reg-summary-row"><span>Balance Due on Arrival</span><span>${formatINR(b.balance)}</span></div>` : ""}
      </div>
    `;
  }

  regBackBtn.addEventListener("click", () => {
    resetPayBtn();
    showStep(step1);
  });

  regPayBtn.addEventListener("click", async () => {
    if (!currentBooking) return;

    // Track InitiateCheckout when user clicks Pay via Razorpay
    F2FAnalytics.track("InitiateCheckout", {
      content_name: currentBooking.packageLabel,
      content_ids: [currentBooking.packageKey],
      content_type: "product",
      num_items: 1,
      value: currentBooking.advance,
      currency: "INR",
    });

    regPayBtn.style.display = "none";
    regBackBtn.style.display = "none";
    if (regLoadingNote) {
      regLoadingNote.innerText = "Securely opening Razorpay... Please wait.";
      regLoadingNote.style.display = "block";
    }

    try {
      // 1. Create Razorpay order on backend
      const { data: orderData, error: orderError } = await supabaseClient.functions.invoke(
        "create-order",
        {
          body: { packageKey: currentBooking.packageKey },
        }
      );

      if (orderError || !orderData) {
        let errorMsg = "Failed to create order on server";
        if (orderError) {
          try {
            const errBody = await orderError.context.json();
            if (errBody && errBody.error) errorMsg = errBody.error;
          } catch (_) {
            errorMsg = orderError.message || errorMsg;
          }
        }
        throw new Error(errorMsg);
      }

      // 2. Open Razorpay Checkout modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Fat2Fit",
        description: currentBooking.isOnline ? "3-Month Online Pass" : "Advance Booking Payment",
        order_id: orderData.order_id,
        prefill: {
          name: currentBooking.name,
          email: currentBooking.email,
          contact: currentBooking.phone,
        },
        theme: {
          color: "#2c7a3f",
        },
        handler: async function (response) {
          try {
            currentBooking.txnId = response.razorpay_payment_id;
            currentBooking.bookingId = generateBookingId();

            if (regLoadingNote)
              regLoadingNote.innerText = "Verifying payment... Please do not close this window.";

            // 3. Verify payment on backend
            const { data: verifyData, error: verifyError } =
              await supabaseClient.functions.invoke("verify-payment", {
                body: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingData: currentBooking,
                },
              });

            if (verifyError || !verifyData?.success) {
              console.error("Payment Verification Error:", verifyError, verifyData);
              let detailMsg = "Payment verification failed on server";
              if (verifyData && verifyData.error) {
                detailMsg = verifyData.error;
              } else if (verifyError) {
                try {
                  const errorBody = await verifyError.context.json();
                  if (errorBody && errorBody.error) detailMsg = errorBody.error;
                } catch (_) {
                  detailMsg = verifyError.message || detailMsg;
                }
              }
              throw new Error(detailMsg);
            }

            if (verifyData && verifyData.pdfBase64) {
              currentBooking.pdfBase64 = verifyData.pdfBase64;
            }

            // Track verified Purchase in Meta Pixel
            F2FAnalytics.track("Purchase", {
              content_name: currentBooking.packageLabel,
              content_ids: [currentBooking.packageKey],
              content_type: "product",
              value: currentBooking.advance,
              total_contract_value: currentBooking.total,
              currency: "INR",
              order_id: currentBooking.bookingId,
              transaction_id: currentBooking.txnId,
            });

            // 4. Show Invoice
            renderInvoice(currentBooking);
            saveBookingLocally(currentBooking);
            buildWhatsappCopyLink(currentBooking);

            resetPayBtn();
            showStep(step3);
          } catch (err) {
            console.error(err);
            F2FAnalytics.trackCustom("PaymentVerificationError", {
              error_message: err.message,
              package_key: currentBooking?.packageKey,
            });
            alert("Payment recorded, but server verification failed: " + err.message);
            resetPayBtn();
          }
        },
        modal: {
          ondismiss: function () {
            F2FAnalytics.trackCustom("CheckoutDismissed", {
              content_name: currentBooking?.packageLabel,
              value: currentBooking?.advance,
            });
            resetPayBtn();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      F2FAnalytics.trackCustom("PaymentInitError", {
        error_message: err.message,
        package_key: currentBooking?.packageKey,
      });
      alert("Error initiating payment: " + err.message);
      resetPayBtn();
    }
  });

  function resetPayBtn() {
    if (regPayBtn) {
      regPayBtn.style.display = "block";
      regPayBtn.disabled = false;
    }
    if (regBackBtn) {
      regBackBtn.style.display = "block";
      regBackBtn.disabled = false;
    }
    if (regLoadingNote) {
      regLoadingNote.style.display = "none";
      regLoadingNote.innerText = "Securely opening Razorpay... Please wait.";
    }
  }

  function renderInvoice(b) {
    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const paid = !!b.txnId;

    invoiceContent.innerHTML = `
      <div class="invoice-topbar"></div>
      <div class="invoice-header">
        <img class="invoice-logo-img" src="assets/logo.png" alt="Fat2Fit logo" />
        <div>
          <h2>FAT2FIT</h2>
          <p>Weight Loss &amp; Detox Camp Retreat, Shimla &middot; Online Coaching</p>
          <p class="invoice-tagline">Better Health, A Brighter You</p>
        </div>
      </div>

      <div class="invoice-meta-strip">
        <div><strong>Booking ID:</strong> ${b.bookingId}</div>
        <div><strong>Issue Date:</strong> ${issueDate}</div>
        <div><strong>Payment ID:</strong> ${b.txnId || "N/A"}</div>
      </div>

      <div class="invoice-body">
        <div class="invoice-box">
          <h4>Client &amp; Health Profile</h4>
          <div class="invoice-row"><span>Name</span><span><strong>${escapeHtml(b.name)}</strong></span></div>
          <div class="invoice-row"><span>Email</span><span>${escapeHtml(b.email)}</span></div>
          <div class="invoice-row"><span>Phone</span><span>${escapeHtml(b.phone)}</span></div>
          <div class="invoice-row"><span>City</span><span>${escapeHtml(b.place)}</span></div>
          <div class="invoice-row"><span>Age / Weight / Height</span><span>${escapeHtml(b.age)} yrs &middot; ${escapeHtml(b.weight)} &middot; ${escapeHtml(b.height)}</span></div>
          <div class="invoice-row"><span>Primary Goal</span><span>${escapeHtml(b.goal)}</span></div>
          <div class="invoice-row"><span>Diet / Allergies</span><span>${escapeHtml(b.allergies)}</span></div>
        </div>

        <div class="invoice-box">
          <h4>Program Details</h4>
          <div class="invoice-row"><span>Program</span><span><strong>${escapeHtml(b.packageLabel)}</strong></span></div>
          <div class="invoice-row"><span>Schedule</span><span>${b.isOnline ? "Starts Immediately upon onboarding" : `${escapeHtml(b.month)}, ${b.day === "1" ? "1st" : "15th"}`}</span></div>
          <div class="invoice-row"><span>Location</span><span>${b.isOnline ? "Online (Home Transformation)" : "Retreat Camp, Shimla (Pincode 171219)"}</span></div>
          <div class="invoice-row"><span>Payment Status</span><span><strong>${paid ? "PAID" : "PENDING"}</strong></span></div>
        </div>
      </div>

      <div class="invoice-table-wrap">
        <table class="invoice-table">
          <thead>
            <tr><th>Description</th><th>Amount (₹)</th></tr>
          </thead>
          <tbody>
            <tr><td>${b.isOnline ? "3-Month Online Pass Fee" : "Program Fee (per person)"}</td><td>${formatINR(b.base)}</td></tr>
            ${b.gst > 0 ? `<tr><td>GST (18%)</td><td>${formatINR(b.gst)}</td></tr>` : ""}
            <tr class="invoice-table-total"><td>Total Amount</td><td>${formatINR(b.total)}</td></tr>
            <tr><td>Amount Paid</td><td>${formatINR(b.advance)}</td></tr>
            ${b.balance > 0 ? `<tr><td>Remaining Balance Due on Arrival</td><td>${formatINR(b.balance)}</td></tr>` : ""}
            ${b.txnId ? `<tr><td>Razorpay Transaction ID</td><td>${escapeHtml(b.txnId)}</td></tr>` : ""}
          </tbody>
        </table>
      </div>

      <div class="invoice-confirmed ${paid ? "" : "pending"}">
        <div class="invoice-confirmed-icon">${paid ? "&#10003;" : "!"}</div>
        <div>
          <strong>${paid ? "Registration & Payment Confirmed!" : "Booking Received — Pending Confirmation"}</strong>
          <p>${
            paid
              ? b.isOnline
                ? "Your 3-Month Online Pass is confirmed! Coach Aditya's team will contact you on WhatsApp/Email for onboarding."
                : "Thank you for choosing Fat2Fit! Your slot is confirmed. We will follow up with travel and joining guidance."
              : "We have recorded your details. Please share your payment ID on WhatsApp to complete verification."
          }</p>
        </div>
      </div>

      <div class="invoice-footer">
        <p><strong>Next Steps:</strong> ${b.isOnline ? "Look out for your onboarding message on WhatsApp and Week 1 guide over email." : "We'll be in touch regarding travel instructions and camp arrival protocols."}</p>
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
      console.warn("Could not save booking locally:", err);
    }
  }

  function buildWhatsappCopyLink(b) {
    const lines = [
      "New Fat2Fit Registration & Payment",
      `Booking ID: ${b.bookingId}`,
      `Name: ${b.name}`,
      `Email: ${b.email}`,
      `Phone: ${b.phone}`,
      `City: ${b.place}`,
      `Age: ${b.age}`,
      `Weight: ${b.weight}`,
      `Height: ${b.height}`,
      `Goal: ${b.goal}`,
      `Allergies/Diet: ${b.allergies}`,
      `Medical History: ${b.additional}`,
      `Program: ${b.packageLabel}`,
      `Schedule: ${b.isOnline ? "Immediate Online Start" : `${b.month}, ${b.day === "1" ? "1st" : "15th"}`}`,
      `Total Fee: ${formatINR(b.total)}`,
      `Amount Paid: ${formatINR(b.advance)}`,
      b.balance > 0 ? `Balance Due on Arrival: ${formatINR(b.balance)}` : "Balance: ₹0 (Paid in Full)",
      b.txnId ? `Razorpay Payment ID: ${b.txnId}` : "Razorpay Payment ID: (Pending)",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    regWhatsappCopyBtn.href = `https://wa.me/${BUSINESS_WHATSAPP}?text=${text}`;
  }

  if (regWhatsappCopyBtn) {
    regWhatsappCopyBtn.addEventListener("click", () => {
      F2FAnalytics.track("Contact", {
        content_name: "Invoice WhatsApp Confirmation",
        booking_id: currentBooking?.bookingId,
      });
    });
  }

  function downloadPdfInvoice(base64Data, filename) {
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      console.error("PDF Download error, falling back to window.print():", err);
      window.print();
    }
  }

  if (regPrintBtn) {
    regPrintBtn.addEventListener("click", () => {
      F2FAnalytics.trackCustom("DownloadInvoice", {
        booking_id: currentBooking?.bookingId,
        package_key: currentBooking?.packageKey,
      });
      if (currentBooking && currentBooking.pdfBase64) {
        const fname = `Fat2Fit_Invoice_${currentBooking.bookingId || "receipt"}.pdf`;
        downloadPdfInvoice(currentBooking.pdfBase64, fname);
      } else {
        window.print();
      }
    });
  }

  if (regNewBookingBtn) {
    regNewBookingBtn.addEventListener("click", () => {
      openRegModal();
    });
  }
});
