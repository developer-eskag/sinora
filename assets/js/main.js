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
   Lucide Icons
========================================= */
lucide.createIcons();