/*====================================================
    LIPOSOMAL COMPARISON
====================================================*/
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector("#comparison");
    if (!section) return;

    const btnConv       = section.querySelector("#btnConv");
    const btnLipo       = section.querySelector("#btnLipo");
    const toggle        = section.querySelector(".comparison-toggle");
    const particleField = section.querySelector(".comparison-particles");

    let currentMode = null;

    const IMG_CONV      = "assets/images/droplet-conv.png";
    const IMG_LIPO      = "assets/images/droplet-lipo.png";
    const MOVE_DURATION = 1400;

    // Indices that get burst rings in liposomal mode (the deeper ones)
    const BURST_INDICES = [1, 2, 3, 5, 6, 7, 8, 9];

    /*──────────────────────────────────────
      Drop-in on load
      Particles are already in the HTML at
      their CSS positions. We briefly force
      top: 0% then release so CSS takes over,
      triggering the drop animation.
    ──────────────────────────────────────*/
    function dropParticlesIn(mode) {
        if (!particleField) return;
        const imgSrc = mode === "liposomal" ? IMG_LIPO : IMG_CONV;

        // Switch mode class so CSS positions become active
        particleField.classList.remove("is-conventional", "is-liposomal");
        particleField.classList.add(mode === "liposomal" ? "is-liposomal" : "is-conventional");

        particleField.querySelectorAll(".particle").forEach((el, i) => {
            el.querySelector("img").src = imgSrc;
            el.classList.remove("is-floating", "is-dropping");

            // Force to top, then release — CSS transition moves to final position
            el.style.top = "0%";

            setTimeout(() => {
                el.style.top = ""; // hand back to CSS
                el.classList.add("is-dropping");

                el.addEventListener("animationend", function () {
                    el.classList.remove("is-dropping");
                    el.classList.add("is-floating");
                }, { once: true });
            }, i * 60);
        });
    }

    /*──────────────────────────────────────
      Move on toggle
      CSS transition handles the animation —
      just swap the class and PNG src.
    ──────────────────────────────────────*/
    function moveParticles(mode) {
        if (!particleField) return;
        const imgSrc = mode === "liposomal" ? IMG_LIPO : IMG_CONV;

        particleField.classList.remove("is-conventional", "is-liposomal");
        particleField.classList.add(mode === "liposomal" ? "is-liposomal" : "is-conventional");

        particleField.querySelectorAll(".particle").forEach((el, i) => {
            el.classList.remove("is-floating");

            // Swap PNG halfway through the move so it lands with the right image
            clearTimeout(el._srcTimer);
            el._srcTimer = setTimeout(() => {
                el.querySelector("img").src = imgSrc;
            }, MOVE_DURATION / 2 + (i % 5) * 40);

            // Burst rings for deep liposomal particles
            const burstEls = el.querySelectorAll(".particle-burst");
            clearTimeout(el._burstTimer);
            clearTimeout(el._floatTimer);

            if (mode === "liposomal" && BURST_INDICES.includes(i)) {
                // Set stagger delay only on ring 1 — ring 2 keeps its CSS 0.9s offset
                burstEls[0].style.animationDelay = (i % 5 * 0.2) + "s";
                // Clear any inline delay on ring 2 so CSS takes over
                if (burstEls[1]) burstEls[1].style.animationDelay = "";
                el._burstTimer = setTimeout(() => {
                    burstEls.forEach(b => b.classList.add("is-looping"));
                }, MOVE_DURATION + (i % 5) * 80);
            } else {
                burstEls.forEach(b => {
                    b.classList.remove("is-looping");
                    b.style.animationDelay = "";
                });
            }

            el._floatTimer = setTimeout(() => {
                el.classList.add("is-floating");
            }, MOVE_DURATION + (i % 5) * 80);
        });
    }

    /*──────────────────────────────────────
      Content visibility
    ──────────────────────────────────────*/
    function switchContent(mode) {
        section.querySelectorAll(".comparison-state").forEach(el => {
            el.classList.toggle("is-active", el.dataset.state === mode);
        });
    }

    /*──────────────────────────────────────
      Toggle pill + aria
    ──────────────────────────────────────*/
    function switchToggle(mode) {
        toggle.classList.toggle("is-conventional", mode === "conventional");
        toggle.classList.toggle("is-liposomal",    mode === "liposomal");
        btnConv.classList.toggle("active", mode === "conventional");
        btnLipo.classList.toggle("active", mode === "liposomal");
        btnConv.setAttribute("aria-selected", mode === "conventional" ? "true" : "false");
        btnLipo.setAttribute("aria-selected", mode === "liposomal"    ? "true" : "false");
    }

    /*──────────────────────────────────────
      Main switch
    ──────────────────────────────────────*/
    function switchMode(mode, firstLoad = false) {
        currentMode = mode;
        switchToggle(mode);
        switchContent(mode);
        firstLoad ? dropParticlesIn(mode) : moveParticles(mode);
    }

    /*──────────────────────────────────────
      Button events
    ──────────────────────────────────────*/
    btnConv.addEventListener("click", () => {
        if (currentMode !== "conventional") switchMode("conventional");
    });
    btnLipo.addEventListener("click", () => {
        if (currentMode !== "liposomal") switchMode("liposomal");
    });

    /*──────────────────────────────────────
      Init
    ──────────────────────────────────────*/
    switchMode("conventional", true);
});

/* =========================================
   AI SKIN ANALYSIS
========================================= */
const skinSection = document.querySelector(".skin-ai");
const scanLine = document.querySelector(".scan-line");
const scanPoints = gsap.utils.toArray(".scan-point");
const face = document.querySelector(".skin-face");
const glow = document.querySelector(".scan-glow");
const button = document.querySelector(".skin-ai .btn");

if (
    skinSection &&
    face &&
    scanLine &&
    window.gsap &&
    window.ScrollTrigger
) {
    gsap.registerPlugin(ScrollTrigger);
    const faceHeight = face.offsetHeight;
    const startY = -(faceHeight * 0.35);
    const endY = faceHeight * 0.25;
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger:skinSection,
            start:"top 65%",
            once:true
        }
    });

    /* -----------------------------
       Face Reveal
    ----------------------------- */

    tl.from(face,{
        opacity:0,
        y:40,
        duration:1,
        ease:"power3.out"
    });

    tl.from(glow,{
        opacity:0,
        scale:.8,
        duration:.8
    },"<");

    tl.from(scanLine,{
        opacity:0,
        scaleX:.2,
        duration:.4
    },"<");

    /* -----------------------------
       Initial Scan
    ----------------------------- */
    tl.fromTo(
        scanLine,
        {
            y:startY
        },
        {
            y:endY,
            duration:2.3,
            ease:"none"
        }
    );
    /* -----------------------------
       Detection Points
    ----------------------------- */
    scanPoints.forEach((point)=>{
        tl.fromTo(
            point,
            {
                opacity:0,
                scale:.4,
                y:20
            },
            {
                opacity:1,
                scale:1,
                y:0,
                duration:.35,
                ease:"back.out(2)",
                onComplete(){
                    gsap.to(point,{
                        scale:1.18,
                        duration:.28,
                        repeat:1,
                        yoyo:true,
                        ease:"power2.out"
                    });
                }
            },
            "-=1.75"
        );
    });

    /* -----------------------------
       CTA Reveal
    ----------------------------- */
    tl.from(button,{
        opacity:0,
        y:20,
        duration:.45
    },"-=.3");
    /* -----------------------------
       Start Infinite Scanner
    ----------------------------- */
    tl.call(()=>{
        const loop = gsap.timeline({
            repeat:-1
        });
        loop
        // currently already at bottom
        .to(scanLine,{
            y:startY,
            duration:2.8,
            ease:"sine.inOut"
        })
        .to(scanLine,{
            y:endY,
            duration:2.8,
            ease:"sine.inOut"
        });
    });
}

/* =========================================
   Ambient Glow Animation
========================================= */
if(glow){
    gsap.to(glow,{
        scale:1.08,
        duration:5,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
    });
}

/* =========================================
   FOOTER REVEAL
========================================= */
if (document.querySelector(".footer")) {
    gsap.from(".footer-grid > *", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
    });
}

