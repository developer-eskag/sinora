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

/* =========================================
   Hero Mouse Parallax
========================================= */
/*const hero = document.querySelector(".hero");
if(window.innerWidth > 991){
    hero.addEventListener("mousemove",(e)=>{
        const content=document.querySelector(".hero-slide.active .hero-content");
        if(!content) return;
        const x=(e.clientX/window.innerWidth-.5)*8;
        const y=(e.clientY/window.innerHeight-.5)*8;
        content.style.transform=`translate(${x}px, ${y}px)`;
    });
}*/

/* =====================================================
   PARALLAX
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
    const next = document.querySelector(".about-section");
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
  const processImages = document.querySelector("[data-process-images]");
  const processCopy = document.querySelector("[data-process-copy]");
  const processCount = document.querySelector("[data-process-count]");
  const processBar = document.querySelector("[data-process-bar]");
  const processMobile = document.querySelector("[data-process-mobile]");

  if(processSection && processTrack && processImages && processCopy){
    let activeProcessIndex = 0;
    processSection.style.setProperty("--process-step-count", processSteps.length);

    processImages.innerHTML = processSteps.map((step, index) => `
      <img class="process-image ${index === 0 ? "active" : ""}" src="${step.image}" alt="">
    `).join("");

    processMobile.innerHTML = processSteps.map(step => `
      <article class="process-mobile-card">
        <img src="${step.image}" alt="">
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
      void processCopy.offsetWidth;
      processCopy.classList.add("changing");

      processCopy.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.body}</p>
        <ul class="process-points">
          ${step.points.map(point => `<li>${point}</li>`).join("")}
        </ul>
      `;

      processCount.textContent = step.count;
      processBar.style.transform = `scaleX(${(index + 1) / processSteps.length})`;

      processImages.querySelectorAll(".process-image").forEach((image, imageIndex) => {
        image.classList.toggle("active", imageIndex === index);
      });
    }

    function clampProcess(value, min, max){
      return Math.min(Math.max(value, min), max);
    }

    function updateProcessStep(){
      if(window.innerWidth <= 991) return;

      const rect = processTrack.getBoundingClientRect();
      const scrollableDistance = processTrack.offsetHeight - window.innerHeight;
      const progress = clampProcess(-rect.top / scrollableDistance, 0, 0.9999);
      const nextIndex = clampProcess(
        Math.floor(progress * processSteps.length),
        0,
        processSteps.length - 1
      );

      if(nextIndex !== activeProcessIndex){
        activeProcessIndex = nextIndex;
        renderProcessStep(activeProcessIndex);
      }
    }

    renderProcessStep(0);
    updateProcessStep();
    window.addEventListener("scroll", updateProcessStep, { passive:true });
    window.addEventListener("resize", updateProcessStep);
  }


/* =========================================
   Lucide Icons
========================================= */
lucide.createIcons();