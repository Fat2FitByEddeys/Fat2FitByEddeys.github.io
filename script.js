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

});

document.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("programModal");
  const closeBtn = document.querySelector(".close-program");
  const title = document.getElementById("programTitle");
  const details = document.getElementById("programDetails");
  const roomMedia = document.querySelector(".room-media");

  /* open modal */
  document.querySelectorAll(".view-room-btn").forEach(btn => {

    btn.addEventListener("click", function(){

      modal.classList.add("show");

      const type = this.dataset.program;

      if(type === "basic"){
        title.innerText = "Basic Program - General Health Vacation";
        
        // UPDATE IMAGES FOR BASIC PROGRAM
        roomMedia.innerHTML = `
          <img src="assets/basicroom1.jpeg" alt="Basic accommodation">
          <img src="assets/basicroom2.jpeg" alt="Basic room view">
          <img src="assets/basicroom3.jpeg" alt="Basic facilities">
          <img src="assets/basicroom4.jpeg" alt="Basic dining">
        `;
        
        details.innerHTML = `
          <h3>Perfect For General Wellness</h3>
          <p><strong>Who Should Join:</strong> Anyone looking for a general health vacation while enjoying private comfort at our resort.</p>
          
          <h3>Training & Workouts</h3>
          <ul>
            <li><strong>Group Fitness Sessions:</strong> Daily morning and evening group workouts</li>
            <li><strong>Yoga & Stretching:</strong> Flexibility and relaxation sessions</li>
            <li><strong>Nature Walks:</strong> Guided treks through scenic mountain trails</li>
            <li><strong>Outdoor Activities:</strong> Group exercises in fresh mountain air</li>
            <li><strong>Wellness Workshops:</strong> Nutrition and healthy living sessions</li>
          </ul>

          <h3>Accommodation</h3>
          <ul>
            <li><strong>Tent Style Cottage</strong> - Non AC</li>
            <li>Comfortable private resort rooms</li>
            <li>Clean and hygienic facilities</li>
            <li>Peaceful mountain views</li>
            <li>Shared resort amenities</li>
          </ul>

          <h3>Meals & Nutrition</h3>
          <ul>
            <li>3 healthy meals per day (Pure Veg)</li>
            <li>Balanced vegetarian diet</li>
            <li>Portion-controlled servings</li>
            <li>Fresh, locally sourced ingredients</li>
          </ul>

          <h3>What's Included</h3>
          <ul>
            <li>Resort Stay with Breakfast, Lunch & Dinner (Pure Veg)</li>
            <li>Group workout sessions & walks</li>
            <li>Initial health consultation</li>
            <li>Daily activity schedule</li>
            <li>Facilities: WiFi, Swimming Pool, Badminton, Cafe, Sunset Point</li>
          </ul>

          <h3>Pricing</h3>
          <div style="background: rgba(44, 122, 63, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="font-size: 22px; margin-bottom: 15px;"><strong>14 Days Program:</strong> <span style="color: #2c7a3f; font-weight: 700;">₹60,000 + 18% GST</span></p>
            <p style="font-size: 22px; margin-bottom: 0;"><strong>30 Days Program:</strong> <span style="color: #2c7a3f; font-weight: 700;">₹90,000 + 18% GST</span></p>
          </div>

          <h3>Special Discounts</h3>
          <ul>
            <li><strong>Shared Room with Activities:</strong> 10% discount on Grand Total</li>
            <li><strong>Shared Room without Activities:</strong> 25% discount on Grand Total</li>
          </ul>
          
          <p style="margin-top: 20px;"><em>Ideal for those seeking general wellness, relaxation, and a healthy lifestyle reset in a supportive group environment.</em></p>
        `;
      }

      if(type === "premium"){
        title.innerText = "Premium Program - Serious Goals & Private Cottages";
        
        // UPDATE IMAGES FOR PREMIUM PROGRAM
        roomMedia.innerHTML = `
          <img src="assets/premium1.jpeg" alt="Premium cottage exterior">
          <img src="assets/premium2.jpeg" alt="Premium cottage interior">
          <img src="assets/premium3.jpeg" alt="Premium facilities">
          <img src="assets/premium4.jpeg" alt="Premium training area">
        `;
        
        details.innerHTML = `
          <h3>For Serious Health Transformation</h3>
          <p><strong>Who Should Join:</strong> Individuals serious about achieving health goals and making lasting lifestyle changes in premium private cottages.</p>
          
          <h3>Training & Workouts</h3>
          <ul>
            <li><strong>Enhanced Group Sessions:</strong> Intensive group training with advanced techniques</li>
            <li><strong>Strength & Conditioning:</strong> Focused muscle-building and endurance training</li>
            <li><strong>High-Intensity Workouts:</strong> HIIT and circuit training sessions</li>
            <li><strong>Functional Training:</strong> Real-world movement patterns</li>
            <li><strong>Progress Tracking:</strong> Weekly assessments and body composition analysis</li>
          </ul>

          <h3>Accommodation</h3>
          <ul>
            <li><strong>Wooden Cottage</strong> - Non AC</li>
            <li>Premium private cottage with modern amenities</li>
            <li>Spacious and comfortable living space</li>
            <li>Private balcony with mountain views</li>
            <li>Enhanced privacy and comfort</li>
            <li>Premium resort facilities access</li>
          </ul>

          <h3>Meals & Nutrition</h3>
          <ul>
            <li>Customized meal plans based on goals (Pure Veg)</li>
            <li>Macro-balanced nutrition</li>
            <li>High-protein vegetarian options</li>
            <li>Nutritional counseling sessions</li>
          </ul>

          <h3>What's Included</h3>
          <ul>
            <li>Premium private cottage accommodation</li>
            <li>Enhanced group training sessions</li>
            <li>Lifestyle & nutrition coaching</li>
            <li>Weekly progress assessments</li>
            <li>All meals (customized plans)</li>
            <li>Dedicated support team</li>
            <li>Priority access to facilities</li>
          </ul>

          <h3>Pricing</h3>
          <div style="background: rgba(44, 122, 63, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="font-size: 22px; margin-bottom: 15px;"><strong>14 Days Program:</strong> <span style="color: #2c7a3f; font-weight: 700;">₹70,000 + 18% GST</span></p>
            <p style="font-size: 22px; margin-bottom: 0;"><strong>30 Days Program:</strong> <span style="color: #2c7a3f; font-weight: 700;">₹1,25,000 + 18% GST</span></p>
          </div>

          <h3>Special Discounts</h3>
          <ul>
            <li><strong>Shared Room with Activities:</strong> 10% discount on Grand Total</li>
            <li><strong>Shared Room without Activities:</strong> 25% discount on Grand Total</li>
          </ul>
          
          <p style="margin-top: 20px;"><em>Perfect for those committed to serious health transformation with enhanced training, premium accommodation, and dedicated support.</em></p>
        `;
      }

      if(type === "luxury"){
        title.innerText = "Luxury Program - Personal Training & Ultimate Recovery";
        
        // UPDATE IMAGES FOR LUXURY PROGRAM
        roomMedia.innerHTML = `
          <img src="assets/luxury1.jpeg" alt="Luxury cottage exterior">
          <img src="assets/luxury2.jpeg" alt="Luxury cottage interior">
          <img src="assets/luxury3.jpeg" alt="Luxury amenities">
          <img src="assets/luxury4.jpeg" alt="Personal training area">
        `;
        
        details.innerHTML = `
          <h3>Ultimate Health Recovery Experience</h3>
          <p><strong>Who Should Join:</strong> Individuals with health issues seeking personalized recovery, luxury comfort, and one-on-one training with Coach Aditya Sharma.</p>
          
          <h3>Personal Guidance by Coach Aditya Sharma</h3>
          <ul>
            <li><strong>Customized Programs:</strong> Tailored specifically to your health condition</li>
            <li><strong>Rehabilitation Focus:</strong> Specialized exercises for injury recovery</li>
            <li><strong>Medical Monitoring:</strong> Continuous health assessment and adaptation</li>
            <li><strong>Psychological Support:</strong> Counseling for mindset and motivation</li>
            <li><strong>24/7 Availability:</strong> Coach Aditya's direct support throughout your stay</li>
          </ul>

          <h3>Luxury Accommodation</h3>
          <ul>
            <li><strong>AC Cottage</strong> with premium amenities</li>
            <li>Premium luxury cottage with top-tier facilities</li>
            <li>Spacious private living area</li>
            <li>Exclusive mountain-view terrace</li>
            <li>Premium bedding and furnishings</li>
            <li>Personal butler service</li>
            <li>Ultimate privacy and comfort</li>
          </ul>

          <h3>Specialized Meals & Nutrition</h3>
          <ul>
            <li>Fully customized dietary plans (Pure Veg)</li>
            <li>Meals designed for health recovery</li>
            <li>Specialized supplements (if needed)</li>
            <li>Personal nutritionist consultation</li>
            <li>Gourmet healthy cuisine</li>
          </ul>

          <h3>Medical & Wellness Support</h3>
          <ul>
            <li>Initial comprehensive health assessment</li>
            <li>Regular medical check-ups</li>
            <li>Blood work and vitals monitoring</li>
            <li>Stress management & mental wellness</li>
          </ul>

          <h3>What's Included</h3>
          <ul>
            <li>Luxury cottage accommodation</li>
            <li>Personalized health recovery program</li>
            <li>Medical consultation & monitoring</li>
            <li>All meals (specialized diet plans)</li>
            <li>24/7 dedicated support</li>
            <li>Priority access to all facilities</li>
            <li>Personal concierge service</li>
          </ul>

          <h3>Pricing Options</h3>
          <div style="background: rgba(44, 122, 63, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="font-size: 22px; margin-bottom: 15px;"><strong>14 Days Program:</strong> <span style="color: #2c7a3f; font-weight: 700;">₹1,00,000 + 18% GST</span></p>
            <p style="font-size: 22px; margin-bottom: 15px;"><strong>30 Days Program (Non-Bathtub):</strong> <span style="color: #2c7a3f; font-weight: 700;">₹1,50,000 + 18% GST</span></p>
            <p style="font-size: 22px; margin-bottom: 0;"><strong>30 Days Program (With Bathtub):</strong> <span style="color: #2c7a3f; font-weight: 700;">₹1,75,000 + 18% GST</span></p>
          </div>

          <h3>Special Discounts</h3>
          <ul>
            <li><strong>Shared Room with Activities:</strong> 10% discount on Grand Total</li>
            <li><strong>Shared Room without Activities:</strong> 25% discount on Grand Total</li>
          </ul>
          
          <div style="margin-top: 30px; padding: 20px; background: rgba(44, 122, 63, 0.15); border-left: 5px solid #2c7a3f; border-radius: 8px;">
            <p style="margin: 0; font-size: 19px; line-height: 1.9;">
              <strong style="color: #2c7a3f; font-size: 21px;">📌 Important Note:</strong><br><br>
              This is our most comprehensive program designed for individuals requiring specialized attention for health recovery. Coach Aditya Sharma personally oversees every aspect of your transformation journey with maximum comfort and luxury.
            </p>
          </div>
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
  const closeLightbox = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const counter = document.querySelector(".lightbox-counter");

  let currentIndex = 0;
  let mediaItems = [];

  /* Open lightbox when clicking images in modal */
  document.addEventListener("click", function(e) {
    
    // Check if clicked element is an image inside .room-media
    if (e.target.closest(".room-media") && e.target.tagName === "IMG") {
      
      const roomMedia = e.target.closest(".room-media");
      mediaItems = Array.from(roomMedia.querySelectorAll("img"));
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
    
    // Hide all images first
    document.querySelectorAll('.lightbox-content img').forEach(img => {
      img.classList.remove('active');
    });
    
    // Show current image
    lightboxImage.src = item.src;
    lightboxImage.classList.add('active');
    
    // Update counter
    counter.textContent = `${index + 1} / ${mediaItems.length}`;
  }

  /* Close lightbox */
  closeLightbox.onclick = () => {
    lightbox.classList.remove("show");
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
    }
  });

});
