document.addEventListener("DOMContentLoaded", () => {

  /* ================= POPUP ================= */
  const popup = document.getElementById("popupOverlay");
  const closePopup = document.querySelector(".close-popup");

  setTimeout(() => {
    popup.classList.add("show");
  }, 800);

  closePopup.onclick = () => popup.classList.remove("show");

  popup.onclick = (e) => {
    if (e.target === popup) popup.classList.remove("show");
  };


  /* ================= HAMBURGER ================= */
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  };

  document.querySelectorAll(".menu a").forEach(link=>{
    link.onclick = () => {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    }
  });


  /* ================= CALENDLY ================= */
  const calendlyModal = document.getElementById("calendlyModal");
  const openBtns = document.querySelectorAll(".open-calendly");
  const closeCalendly = document.querySelector(".close-calendly");

  openBtns.forEach(btn=>{
    btn.onclick = () => calendlyModal.classList.add("show");
  });

  closeCalendly.onclick = () => calendlyModal.classList.remove("show");

  calendlyModal.onclick = (e)=>{
    if(e.target === calendlyModal){
      calendlyModal.classList.remove("show");
    }
  };

});
document.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("programModal");
  const closeBtn = document.querySelector(".close-program");
  const title = document.getElementById("programTitle");
  const details = document.getElementById("programDetails");

  /* open modal */
  document.querySelectorAll(".view-room-btn").forEach(btn => {

    btn.addEventListener("click", function(){

      modal.classList.add("show");

      const type = this.dataset.program;

      if(type === "14"){
        title.innerText = "14 Days – 5 KG Reset Program";
        details.innerHTML = `
          <h3>Program Includes</h3>
          <ul>
            <li>Fixed daily routine</li>
            <li>Controlled meals</li>
            <li>Guided workouts</li>
            <li>Full supervision</li>
          </ul>
          
        `;
      }

      if(type === "30"){
        title.innerText = "30 Days – 10 KG Transformation";
        details.innerHTML = `
          <h3>Program Includes</h3>
          <ul>
            <li>Full lifestyle reset</li>
            <li>Structured environment</li>
            <li>Accountability tracking</li>
            <li>Habit rebuilding</li>
          </ul>
          
        `;
      }

    });

  });

  /* close modal */
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  /* outside click close */
  modal.addEventListener("click", (e)=>{
    if(e.target === modal){
      modal.classList.remove("show");
    }
  });

});

/* ================= LIGHTBOX GALLERY ================= */
document.addEventListener("DOMContentLoaded", function() {

  const lightbox = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const closeLightbox = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const counter = document.querySelector(".lightbox-counter");

  let currentIndex = 0;
  let mediaItems = [];

  /* Open lightbox when clicking images/videos in modal */
  document.addEventListener("click", function(e) {
    
    // Check if clicked element is inside .room-media
    if (e.target.closest(".room-media") && (e.target.tagName === "IMG" || e.target.tagName === "VIDEO")) {
      
      const roomMedia = e.target.closest(".room-media");
      mediaItems = Array.from(roomMedia.querySelectorAll("img, video"));
      currentIndex = mediaItems.indexOf(e.target);
      
      openLightbox();
    }
  });

  function openLightbox() {
    lightbox.classList.add("show");
    showMedia(currentIndex);
  }

  function showMedia(index) {
    
    const item = mediaItems[index];
    
    // Hide both first
    lightboxImage.classList.remove("active");
    lightboxVideo.classList.remove("active");
    
    if (item.tagName === "VIDEO") {
      lightboxVideo.src = item.querySelector("source").src;
      lightboxVideo.classList.add("active");
      lightboxVideo.play();
    } else {
      lightboxImage.src = item.src;
      lightboxImage.classList.add("active");
    }
    
    // Update counter
    counter.textContent = `${index + 1} / ${mediaItems.length}`;
  }

  /* Close lightbox */
  closeLightbox.onclick = () => {
    lightbox.classList.remove("show");
    lightboxVideo.pause();
  };

  /* Previous button */
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    showMedia(currentIndex);
  };

  /* Next button */
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % mediaItems.length;
    showMedia(currentIndex);
  };

  /* Close on outside click */
  lightbox.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
      lightboxVideo.pause();
    }
  };

  /* Keyboard navigation */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
      showMedia(currentIndex);
    }
    
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % mediaItems.length;
      showMedia(currentIndex);
    }
    
    if (e.key === "Escape") {
      lightbox.classList.remove("show");
      lightboxVideo.pause();
    }
  });

});
