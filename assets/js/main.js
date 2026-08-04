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
   Lucide Icons
========================================= */
lucide.createIcons();

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