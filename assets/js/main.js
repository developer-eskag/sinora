/* =========================================
   Sticky Header
========================================= */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* =========================================
   Responsive Menu Toggle
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".menu-overlay");

function closeMenu(){
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow="";
}
menuToggle.addEventListener("click",()=>{
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow =
        navMenu.classList.contains("active") ? "hidden" : "";
});

overlay.addEventListener("click",closeMenu);
window.addEventListener("resize",()=>{
    if(window.innerWidth>992){
        closeMenu();
    }
});

/* =====================================================
   PARALLAX HERO
===================================================== */
if (window.innerWidth > 991) {
    const hero = document.querySelector(".hero");
    hero.addEventListener("mousemove", e => {
        const activeContent = document.querySelector(".hero-slide.active .hero-content");
        const activeImage = document.querySelector(".hero-slide.active img");
        if (!activeContent || !activeImage) return;
        const x = (e.clientX / window.innerWidth - .5);
        const y = (e.clientY / window.innerHeight - .5);
        activeContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        activeImage.style.transform =
            `scale(1.06) translate(${x * -20}px, ${y * -20}px)`;
    });
}

/* =====================================================
   HERO SLIDER
===================================================== */

const HeroSlider = {
    slides: document.querySelectorAll(".hero-slide"),
    dots: document.querySelectorAll(".hero-dot"),
    prev: document.querySelector(".prev-slide"),
    next: document.querySelector(".next-slide"),
    scroll: document.querySelector(".hero-scroll"),
    current: 0,
    timer: null,
    delay: 6000,
    init() {
        if (!this.slides.length) return;
        this.show(0);
        this.events();
        this.start();
    },

    show(index) {
        this.slides.forEach(slide => slide.classList.remove("active"));
        this.dots.forEach(dot => dot.classList.remove("active"));
        this.slides[index].classList.add("active");
        this.dots[index].classList.add("active");
        this.current = index;
    },

    nextSlide() {
        let index = this.current + 1;
        if (index >= this.slides.length) {
            index = 0;
        }
        this.show(index);
    },

    prevSlide() {
        let index = this.current - 1;
        if (index < 0) {
            index = this.slides.length - 1;
        }
        this.show(index);
    },

    start() {
        this.timer = setInterval(() => {
            this.nextSlide();
        }, this.delay);
    },
    reset() {
        clearInterval(this.timer);
        this.start();
    },

    events() {
        this.next.addEventListener("click", () => {
            this.nextSlide();
            this.reset();
        });
        this.prev.addEventListener("click", () => {
            this.prevSlide();
            this.reset();
        });
        this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                this.show(index);
                this.reset();
            });
        });
    }
};
HeroSlider.init();

/* =====================================================
   KEYBOARD
===================================================== */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        HeroSlider.nextSlide();
        HeroSlider.reset();
    }
    if (e.key === "ArrowLeft") {
        HeroSlider.prevSlide();
        HeroSlider.reset();
    }
});

/* =====================================================
   TOUCH SWIPE
===================================================== */
let startX = 0;
const hero = document.querySelector(".hero");
hero.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});
hero.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 60) {
        HeroSlider.nextSlide();
        HeroSlider.reset();
    }
    if (endX - startX > 60) {
        HeroSlider.prevSlide();
        HeroSlider.reset();
    }
});

/* =====================================================
   SCROLL
===================================================== */
document.querySelector(".hero-scroll").addEventListener("click", () => {
    const next = document.querySelector(".brand-philosophy");
    if (!next) return;
    next.scrollIntoView({
        behavior: "smooth"
    });
});

/* =====================================================
   PAUSE ON HOVER
===================================================== */
const slider = document.querySelector(".hero-slider");
slider.addEventListener("mouseenter", () => {
    clearInterval(HeroSlider.timer);
});
slider.addEventListener("mouseleave", () => {
    HeroSlider.start();
});

/* =========================================
   Product Slider
========================================= */
const productSlider = new Swiper(".product-slider",{
    slidesPerView:3,
    spaceBetween:28,
    centeredSlides:true,
    watchSlidesProgress:true,
    loop:true,
    speed:700,
    grabCursor:true,
    autoplay:{
        delay:3500,
        disableOnInteraction:false,
        pauseOnMouseEnter:true,
    },
    navigation:{
        nextEl:".product-next",
        prevEl:".product-prev",
    },
    pagination:{
        el:".product-pagination",
        clickable:true,
    },
    breakpoints:{
        0:{
            slidesPerView:1.1,
            spaceBetween:16,
        },

        768:{
            slidesPerView:2,
            spaceBetween:20,
        },

        1200:{
            slidesPerView:3,
            spaceBetween:28,
        }
    }
});


 /* =========================================
     LIPOSOMAL PROCESS STICKY SCROLL
     With heading INSIDE sticky area
  ========================================= */
const processSteps = [
  {
    count: "01 / 06",
    title: "Ingredient Selection",
    body: "Clinically selected active ingredients chosen for maximum efficacy and stability.",
    points: ["Pharmaceutical Grade", "High Potency", "Stable Formula"],
    image: "assets/images/journey-1.png"
  },
  {
    count: "02 / 06",
    title: "Liposomal Encapsulation",
    body: "Every active ingredient is enclosed inside a phospholipid membrane, protecting it from oxidation.",
    points: ["Protective Shell", "Better Stability", "Longer Activity"],
    image: "assets/images/journey-2.png"
  },
  {
    count: "03 / 06",
    title: "Skin Contact",
    body: "The formulation spreads evenly across the skin while maintaining structural integrity.",
    points: ["Uniform Coverage", "Gentle Application", "Barrier Friendly"],
    image: "assets/images/journey-3.png"
  },
  {
    count: "04 / 06",
    title: "Deep Penetration",
    body: "Liposomes travel beyond the outer skin barrier, allowing active ingredients to reach deeper layers.",
    points: ["Better Absorption", "Efficient Delivery", "Enhanced Penetration"],
    image: "assets/images/journey-4.png"
  },
  {
    count: "05 / 06",
    title: "Targeted Release",
    body: "The phospholipid membrane gradually releases ingredients exactly where they are needed.",
    points: ["Controlled Delivery", "Maximum Efficiency", "Sustained Action"],
    image: "assets/images/journey-5.png"
  },
  {
    count: "06 / 06",
    title: "Visible Results",
    body: "Enhanced absorption helps improve hydration, radiance, firmness and long-lasting skin health.",
    points: ["Radiance", "Hydration", "Healthy Skin"],
    image: "assets/images/journey-6.png"
  }
];

const processSection = document.querySelector(".liposomal-process");
const processTrack = document.querySelector("[data-process-track]");
const processSticky = document.querySelector(".process-sticky");
const processImages = document.querySelector("[data-process-images]");
const processCopy = document.querySelector("[data-process-copy]");
const processCount = document.querySelector("[data-process-count]");
const processBar = document.querySelector("[data-process-bar]");
const processMobile = document.querySelector("[data-process-mobile]");

if(processSection && processTrack && processImages && processCopy){
  let activeProcessIndex = 0;
  const totalSteps = processSteps.length;
  
  processSection.style.setProperty("--process-step-count", totalSteps);

  // Populate images
  processImages.innerHTML = processSteps.map((step, index) => `
    <img class="process-image ${index === 0 ? "active" : ""}" src="${step.image}" alt="${step.title}">
  `).join("");

  // Populate mobile cards
  processMobile.innerHTML = processSteps.map(step => `
    <article class="process-mobile-card">
      <img src="${step.image}" alt="${step.title}">
      <div class="process-mobile-body">
        <div class="process-mobile-count">${step.count}</div>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
        <ul class="process-points">
          ${step.points.map(point => `<li>${point}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");

  function renderProcessStep(index){
    const step = processSteps[index];

    processCopy.classList.remove("changing");
    void processCopy.offsetWidth; // Trigger reflow
    processCopy.classList.add("changing");

    processCopy.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.body}</p>
      <ul class="process-points">
        ${step.points.map(point => `<li>${point}</li>`).join("")}
      </ul>
    `;

    processCount.textContent = step.count;
    const progressPercentage = (index + 1) / totalSteps;
    processBar.style.transform = `scaleX(${progressPercentage})`;

    // Update active image
    processImages.querySelectorAll(".process-image").forEach((image, imageIndex) => {
      image.classList.toggle("active", imageIndex === index);
    });
  }

  function updateProcessStep(){
    // Disable on mobile
    if(window.innerWidth <= 1024) return;

    // Get positions
    const trackRect = processTrack.getBoundingClientRect();
    const trackHeight = processTrack.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate scroll progress
    // When track top reaches top of viewport = 0
    // When track bottom reaches bottom of viewport = 1
    const distanceToScroll = trackHeight - viewportHeight;
    const scrollProgress = (-trackRect.top) / distanceToScroll;
    
    // Clamp between 0 and 0.9999
    const clampedProgress = Math.max(0, Math.min(scrollProgress, 0.9999));
    
    // Get current step
    const stepIndex = Math.floor(clampedProgress * totalSteps);
    const nextIndex = Math.min(stepIndex, totalSteps - 1);

    if(nextIndex !== activeProcessIndex){
      activeProcessIndex = nextIndex;
      renderProcessStep(activeProcessIndex);
    }
  }

  // Initial render
  renderProcessStep(0);
  
  // Listen for scroll and resize
  window.addEventListener("scroll", updateProcessStep, { passive: true });
  window.addEventListener("resize", updateProcessStep);
  
  // Initial calculation
  updateProcessStep();
}

  /* =========================================
   CLINICAL RESULTS - COMPARISON SLIDER
   Fixed: Correct image order + Progressive badge hiding
========================================= */

const comparison = document.querySelector(".comparison-slider");
if (comparison) {
    const beforeImage = document.querySelector(".comparison-before");
    const afterWrapper = document.querySelector(".comparison-after");
    const afterImage = document.getElementById("afterImage");
    const divider = document.querySelector(".comparison-divider");
    const beforeLabel = document.querySelector(".comparison-slider-label.before");
    const afterLabel = document.querySelector(".comparison-slider-label.after");
    const tabs = document.querySelectorAll(".results-tab");
    
    const resultsData = {
        7: {
            image: "assets/images/after-7.png"
        },
        14: {
            image: "assets/images/after-14.png"
        },
        28: {
            image: "assets/images/after-28.png"
        }
    };

    let position = 50;
    let dragging = false;
    
    updateSlider(position);

    function updateSlider(value) {
        position = Math.max(0, Math.min(100, value));
        
        // BEFORE image: Show from left edge to slider position (0% to position%)
        // Clip the right side to reveal gradually
        const beforeClipRight = (100 - position);
        beforeImage.style.clipPath = `inset(0 ${beforeClipRight}% 0 0)`;
        
        // Move divider
        divider.style.left = position + "%";
        
        // Progressive badge hiding based on slider overlap
        updateBadgeClipping(position);
    }

    function updateBadgeClipping(sliderPosition) {
        const badgeWidth = 8;  // Rough width percentage of badge (120px in ~1100px = ~11%)
        const badgeSpacing = 3; // Spacing from edge (30px in ~1100px = ~3%)
        
        // BEFORE badge (left side)
        // Badge is at left: 3%, width: 8% (spans 3% to 11%)
        // Show badge only when slider is to the RIGHT of badge or over it gradually revealing
        const beforeBadgeLeft = badgeSpacing;
        const beforeBadgeRight = badgeSpacing + badgeWidth;
        
        if (sliderPosition < beforeBadgeLeft) {
            // Slider is LEFT of badge (0-3%) - FULLY HIDDEN
            beforeLabel.style.clipPath = `inset(0 100% 0 0)`;
        } else if (sliderPosition > beforeBadgeRight) {
            // Slider is RIGHT of badge (11%+) - FULLY VISIBLE
            beforeLabel.style.clipPath = `inset(0 0 0 0)`;
        } else {
            // Slider is OVER badge (3-11%) - gradually reveal from left to right
            const clipAmount = ((beforeBadgeRight - sliderPosition) / badgeWidth) * 100;
            beforeLabel.style.clipPath = `inset(0 ${clipAmount}% 0 0)`;
        }
        
        // AFTER badge (right side)
        // Badge is at right: 3%, width: 8% (spans (100-11)% to (100-3)%)
        const afterBadgeRight = badgeSpacing;
        const afterBadgeLeft = badgeSpacing + badgeWidth;
        
        // If slider is before badge, don't clip (badge fully visible)
        // If slider is within badge range, clip the left side
        // If slider is past badge, don't clip
        if (sliderPosition < (100 - afterBadgeLeft)) {
            // Slider before badge - fully visible
            afterLabel.style.clipPath = `inset(0 0 0 0)`;
        } else if (sliderPosition > (100 - afterBadgeRight)) {
            // Slider past badge - fully hidden
            afterLabel.style.clipPath = `inset(0 0 0 100%)`;
        } else {
            // Slider overlapping badge - progressively hide from left
            const clipAmount = ((100 - sliderPosition - afterBadgeRight) / afterBadgeLeft) * 100;
            afterLabel.style.clipPath = `inset(0 0 0 ${100 - clipAmount}%)`;
        }
    }

    function pointerPosition(e) {
        const rect = comparison.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        return ((clientX - rect.left) / rect.width) * 100;
    }

    /* ----------------------------------
       Drag Event Listeners
    ---------------------------------- */

    comparison.addEventListener("mousedown", () => {
        dragging = true;
        comparison.classList.add("dragging");
    });

    comparison.addEventListener("touchstart", () => {
        dragging = true;
        comparison.classList.add("dragging");
    });

    window.addEventListener("mouseup", () => {
        dragging = false;
        comparison.classList.remove("dragging");
    });

    window.addEventListener("touchend", () => {
        dragging = false;
        comparison.classList.remove("dragging");
    });

    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        updateSlider(pointerPosition(e));
    });

    window.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        updateSlider(pointerPosition(e));
    }, {
        passive: true
    });

    /* ----------------------------------
       Tab Click Handlers
    ---------------------------------- */

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const day = tab.dataset.day;
            const data = resultsData[day];
            
            if (window.gsap) {
                // Preload the new image to prevent flash
                const preloadImage = new Image();
                preloadImage.onload = () => {
                    // Image is loaded, now fade it in
                    gsap.to(afterImage, {
                        opacity: 0,
                        duration: .25,
                        onComplete() {
                            afterImage.src = data.image;
                            gsap.to(afterImage, {
                                opacity: 1,
                                duration: .35
                            });
                        }
                    });
                };
                preloadImage.src = data.image;
            } else {
                afterImage.src = data.image;
            }
            
            // Reset slider position to middle
            updateSlider(50);
        });
    });

    /* ----------------------------------
       Keyboard Controls (Optional)
    ---------------------------------- */

    document.addEventListener("keydown", (e) => {
        if (!comparison.matches(":hover")) return;
        
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            updateSlider(position - 2);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            updateSlider(position + 2);
        }
    });

    /* ----------------------------------
       Initial Setup
    ---------------------------------- */

    afterImage.src = resultsData[7].image;
}

    /* =========================================
       BLOG SLIDER
    ========================================= */
    if (document.querySelector(".blog-slider")) {
        new Swiper(".blog-slider", {
            slidesPerView:1.15,
            spaceBetween:24,
            speed:700,
            grabCursor:true,
            autoplay:{
                delay:3500,
                disableOnInteraction:false,
                pauseOnMouseEnter:true,
            },
            pagination:{
                el:".blog-pagination",
                clickable:true
            },
            breakpoints:{
                640:{
                    slidesPerView:1.5
                },
                768:{
                    slidesPerView:2.2
                },
                1200:{
                    slidesPerView:3.2
                }
            }
        });
    }

    /* =========================================
       Lucide Icons
    ========================================= */
    lucide.createIcons();