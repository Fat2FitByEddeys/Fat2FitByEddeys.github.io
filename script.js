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

  document.querySelectorAll(".view-room-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!modal || !title || !details || !roomMedia) return;

      const type = this.dataset.program;

      if (type === "single-program") {
        modal.classList.add("show");

        title.innerText = "30 Days Weight Loss Reset - Private Wooden Room";

        roomMedia.innerHTML = `
          <img src="assets/room-1.jpeg" alt="Program image 1">
          <img src="assets/room-2.jpeg" alt="Program image 2">
          <img src="assets/room-3.jpeg" alt="Program image 3">
          <img src="assets/villa-4.jpeg" alt="Program image 4">
        `;

        details.innerHTML = `
          <h3>This Is Not A Holiday. This Is A Weight Loss Reset.</h3>
          <p>
            This is a structured, supervised weight-loss program for people who
            are stuck despite trying diets, gyms, and home workouts. The program
            removes guesswork and replaces it with routine, discipline, and consistency.
          </p>

          <h3>What Makes This Bootcamp Different</h3>
          <p>
            Most programs depend only on motivation and flexibility. This program
            works because it removes decision-making. You follow a fixed routine
            in a controlled environment so your body can finally respond.
          </p>

          <h3>What The Program Includes</h3>
          <ul>
            <li>Fixed daily routine</li>
            <li>Controlled and timed meals</li>
            <li>Guided workouts and walks</li>
            <li>Supervision and accountability</li>
            <li>Workout learnings</li>
            <li>Breakfast, lunch and dinner</li>
            <li>Precise attention to workouts and meals</li>
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
            <p>
              <strong>30 Days Program:</strong>
              <span>₹1,35,000</span>
            </p>
            <small>Private Wooden Room • Single Accommodation</small>
          </div>

          <h3>How To Join</h3>
          <ul>
            <li>Message us on WhatsApp.</li>
            <li>Share your goal and availability.</li>
            <li>Choose your slot and confirm your booking.</li>
            <li>Make 50% payment to book your slot.</li>
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
            <a href="https://maps.app.goo.gl/SNdd1Ea5osSbSBqU8?g_st=iwb" target="_blank" class="modal-location-link">
              View program location on Google Maps
            </a>
          </p>
        `;

        initializeLightbox();
      }
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
