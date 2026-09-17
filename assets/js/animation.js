/*====================================================
    LIPOSOMAL COMPARISON — Droplet Particles
====================================================*/
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector("#comparison");
    if (!section) return;

    /*──────────────────────────────────────
      Elements
    ──────────────────────────────────────*/
    const toggle        = section.querySelector(".comparison-toggle");
    const btnConv       = section.querySelector("#btnConv");
    const btnLipo       = section.querySelector("#btnLipo");
    const kpiDepth      = section.querySelector("#kpiDepth");
    const kpiIntact     = section.querySelector("#kpiIntact");
    const kpiNote       = section.querySelector("#kpiNote");
    const compareTitle  = section.querySelector("#compareTitle");
    const vizNote       = section.querySelector("#vizNote");
    const benefitTitle1 = section.querySelector("#benefitTitle1");
    const benefitText1  = section.querySelector("#benefitText1");
    const benefitTitle2 = section.querySelector("#benefitTitle2");
    const benefitText2  = section.querySelector("#benefitText2");
    const benefitTitle3 = section.querySelector("#benefitTitle3");
    const benefitText3  = section.querySelector("#benefitText3");
    const imageWrap     = section.querySelector(".comparison-image-wrap");

    /*──────────────────────────────────────
      Content states
    ──────────────────────────────────────*/
    const states = {
        conventional: {
            depth: "18%", stability: "31%",
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            title: "Conventional Delivery",
            description: "Most active ingredients remain around the skin's surface, where exposure and rapid release limit how effectively they are delivered.",
            benefit1: { title: "Stays on the Surface",  text: "Most active ingredients remain around the skin's outer surface." },
            benefit2: { title: "Limited Absorption",     text: "Less of the active ingredient may reach deeper layers of the skin." },
            benefit3: { title: "Less Efficient",         text: "Ingredients can be exposed before reaching their intended destination." }
        },
        liposomal: {
            depth: "92%", stability: "89%",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            title: "Liposomal Delivery",
            description: "Encapsulated active ingredients remain protected while travelling deeper into the skin, allowing controlled release and improved absorption.",
            benefit1: { title: "Protected",          text: "Active ingredients are surrounded by a protective liposomal structure." },
            benefit2: { title: "Deeper Delivery",    text: "Liposomes help carry active ingredients beyond the skin's outer barrier." },
            benefit3: { title: "Controlled Release", text: "The delivery system supports controlled release of active ingredients." }
        }
    };

    /*──────────────────────────────────────
      Particle positions — responsive
      x    = horizontal % (same across breakpoints)
      conv = vertical % for conventional state
      lipo = vertical % for liposomal state

      Tune tablet/mobile Y values to match
      where the skin layer boundaries appear
      on your actual image at those sizes.
      Tip: in DevTools at that width, run:
        document.querySelectorAll('.particle')
          .forEach(p => p.style.top = '45%')
      …and adjust until droplets sit on the
      right layer, then copy the values here.
    ──────────────────────────────────────*/

    /* Desktop — ≥ 1024px (your original tuned values) */
    const configDesktop = [
        { x: 50, conv: 46, lipo: 48 },
        { x: 25, conv: 44, lipo: 46 },
        { x: 75, conv: 39, lipo: 50 },
        { x: 12, conv: 45, lipo: 75 },
        { x: 35, conv: 40, lipo: 78 },
        { x: 65, conv: 51, lipo: 80 },
        { x: 88, conv: 50, lipo: 82 },
        { x: 45, conv: 53, lipo: 85 },
        { x: 20, conv: 67, lipo: 79 },
        { x: 80, conv: 75, lipo: 81 }
    ];

    /* Slim Desktop — 1200px (adjust Y values as needed) */
    const configSlimDesktop = [
        { x: 50, conv: 44, lipo: 38 },
        { x: 25, conv: 42, lipo: 40 },
        { x: 75, conv: 37, lipo: 42 },
        { x: 12, conv: 43, lipo: 71 },
        { x: 35, conv: 38, lipo: 65 },
        { x: 65, conv: 40, lipo: 66 },
        { x: 88, conv: 32, lipo: 72 },
        { x: 45, conv: 37, lipo: 65 },
        { x: 20, conv: 64, lipo: 68 },
        { x: 80, conv: 70, lipo: 70 }
    ];

    /* Tablet — 640px–1023px (adjust Y values as needed) */
    const configTablet = [
        { x: 50, conv: 44, lipo: 46 },
        { x: 25, conv: 42, lipo: 44 },
        { x: 75, conv: 37, lipo: 48 },
        { x: 12, conv: 43, lipo: 72 },
        { x: 35, conv: 38, lipo: 75 },
        { x: 65, conv: 49, lipo: 77 },
        { x: 88, conv: 48, lipo: 79 },
        { x: 45, conv: 51, lipo: 78 },
        { x: 20, conv: 64, lipo: 76 },
        { x: 80, conv: 72, lipo: 78 }
    ];

    /* Mobile — < 640px (adjust Y values as needed) */
    const configMobile = [
        { x: 50, conv: 42, lipo: 39 },
        { x: 25, conv: 40, lipo: 40 },
        { x: 75, conv: 35, lipo: 38 },
        { x: 12, conv: 41, lipo: 69 },
        { x: 35, conv: 36, lipo: 72 },
        { x: 65, conv: 47, lipo: 71 },
        { x: 88, conv: 46, lipo: 73 },
        { x: 45, conv: 49, lipo: 70 },
        { x: 20, conv: 61, lipo: 73 },
        { x: 80, conv: 69, lipo: 72 }
    ];

    /* Returns the right config for the current viewport */
    function getConfig() {
        const w = window.innerWidth;
        if (w < 640)  return configMobile;
        if (w < 1024) return configTablet;
        if (w < 1200) return configSlimDesktop;
        return configDesktop;
    }

    const burstIndices   = [3, 4, 5, 6, 7];
    const MOVE_DURATION  = 1400;
    let   particleField  = null;
    let   currentMode    = null;

    /*──────────────────────────────────────
      SVG droplet — two skins, swapped via CSS class
      Conventional : water (clear blue)
      Liposomal    : oil/golden (amber, translucent shell)
    ──────────────────────────────────────*/
    function dropletSVG() {
        return `<svg viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>

    <!-- CONVENTIONAL: water droplet — cool blue, semi-transparent -->
    <radialGradient id="wFill" cx="38%" cy="32%" r="62%">
      <stop offset="0%"   stop-color="#e8f6ff" stop-opacity="0.95"/>
      <stop offset="45%"  stop-color="#90c8f0" stop-opacity="0.80"/>
      <stop offset="100%" stop-color="#3a8bbf" stop-opacity="0.70"/>
    </radialGradient>
    <radialGradient id="wShine" cx="35%" cy="28%" r="40%">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <!-- LIPOSOMAL: oil drop — warm amber core, glassy shell -->
    <radialGradient id="lShell" cx="40%" cy="30%" r="65%">
      <stop offset="0%"   stop-color="#FBF6EF" stop-opacity="0.60"/>
      <stop offset="60%"  stop-color="#F3EADD" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#FBE1C9" stop-opacity="0.50"/>
    </radialGradient>
    <!-- Inner golden oil core -->
    <radialGradient id="lCore" cx="38%" cy="35%" r="60%">
      <stop offset="0%"   stop-color="#FBEADB" stop-opacity="1"/>
      <stop offset="50%"  stop-color="#F26A21" stop-opacity="1"/>
      <stop offset="100%" stop-color="#C6510E" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="lShine" cx="32%" cy="26%" r="38%">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

  </defs>

  <!-- ── CONVENTIONAL droplet ── -->
  <g class="drop-conv">
    <path d="M10 1 C10 1, 1 11, 1 15.5 a9 9 0 0 0 18 0 C19 11, 10 1, 10 1 Z"
          fill="url(#wFill)" stroke="#60aad8" stroke-width="0.6" stroke-opacity="0.55"/>
    <ellipse cx="7.5" cy="11" rx="3" ry="4.5"
             fill="url(#wShine)" opacity="0.9"/>
  </g>

  <!-- ── LIPOSOMAL droplet (oil-in-shell) ── -->
  <g class="drop-lipo">
    <path d="M10 1 C10 1, 1 11, 1 15.5 a9 9 0 0 0 18 0 C19 11, 10 1, 10 1 Z"
          fill="url(#lShell)" stroke="#3a8bbf" stroke-width="0.7" stroke-opacity="0.60"/>
    <path d="M10 5 C10 5, 3.5 12.5, 3.5 15.8 a6.5 6.5 0 0 0 13 0 C16.5 12.5, 10 5, 10 5 Z"
          fill="url(#lCore)"/>
    <ellipse cx="7.2" cy="10.5" rx="2.5" ry="4"
             fill="url(#lShine)" opacity="0.85"/>
  </g>
</svg>`;
    }

    /*──────────────────────────────────────
      Show the right droplet layer via CSS
    ──────────────────────────────────────*/
    const style = document.createElement("style");
    style.textContent = `
        .particle .drop-conv { display: block; }
        .particle .drop-lipo { display: none;  }
        .particle.is-liposomal .drop-conv { display: none;  }
        .particle.is-liposomal .drop-lipo { display: block; }
    `;
    document.head.appendChild(style);

    /*──────────────────────────────────────
      Build particle DOM (once)
    ──────────────────────────────────────*/
    function createParticles(wrapEl) {
        const field = document.createElement("div");
        field.className = "comparison-particles";
        field.id = "particleField";

        getConfig().forEach((p, i) => {
            const el = document.createElement("div");
            el.className = "particle is-conventional";
            el.dataset.index = i;
            el.style.left = p.x + "%";
            /* Start particles just above the image for the drop-in */
            el.style.top = "0%";
            el.style.transitionDelay = (i % 5) * 0.08 + "s";

            el.innerHTML = dropletSVG();

            const burst = document.createElement("div");
            burst.className = "particle-burst";
            el.appendChild(burst);

            field.appendChild(el);
        });

        wrapEl.appendChild(field);
        return field;
    }

    /*──────────────────────────────────────
      Drop-in animation on load / toggle
    ──────────────────────────────────────*/
    function dropParticlesIn(mode) {
        if (!particleField) return;

        const cfg = getConfig();
        const els = particleField.querySelectorAll(".particle");

        els.forEach((el, i) => {
            const targetY = mode === "liposomal" ? cfg[i].lipo : cfg[i].conv;

            el.classList.remove("is-floating", "is-dropping");
            el.style.top = "0%";

            const staggerMs = i * 60;

            setTimeout(() => {
                el.style.top = targetY + "%";
                el.classList.add("is-dropping");

                el.addEventListener("animationend", function onEnd() {
                    el.removeEventListener("animationend", onEnd);
                    el.classList.remove("is-dropping");
                    el.classList.add("is-floating");
                }, { once: true });

            }, staggerMs);
        });
    }

    /*──────────────────────────────────────
      Move existing particles (mode switch)
      — no re-drop, just slide to new Y
    ──────────────────────────────────────*/
    function updateParticles(mode, firstLoad) {
        if (!particleField) return;

        const cfg = getConfig();
        const els = particleField.querySelectorAll(".particle");

        if (firstLoad) {
            dropParticlesIn(mode);
            return;
        }

        els.forEach((el, i) => {
            const targetY = mode === "liposomal" ? cfg[i].lipo : cfg[i].conv;

            el.classList.remove("is-floating");
            el.style.top = targetY + "%";

            clearTimeout(el._floatTimer);
            el._floatTimer = setTimeout(() => {
                el.classList.add("is-floating");
            }, MOVE_DURATION + (i % 5) * 80);

            el.classList.toggle("is-liposomal",    mode === "liposomal");
            el.classList.toggle("is-conventional", mode !== "liposomal");

            const burstEl = el.querySelector(".particle-burst");
            clearTimeout(el._burstTimeout);

            if (mode === "liposomal" && burstIndices.includes(i)) {
                const delay = MOVE_DURATION + (i % 5) * 80;
                burstEl.style.animationDelay = ((i % 5) * 0.25) + "s";
                el._burstTimeout = setTimeout(() => {
                    burstEl.classList.add("is-looping");
                }, delay);
            } else {
                burstEl.classList.remove("is-looping");
            }
        });
    }

    /*──────────────────────────────────────
      Update UI content
    ──────────────────────────────────────*/
    function updateContent(mode) {
        const data = states[mode];

        toggle.classList.remove("is-conventional", "is-liposomal");
        toggle.classList.add(mode === "liposomal" ? "is-liposomal" : "is-conventional");

        btnConv.classList.toggle("active", mode === "conventional");
        btnLipo.classList.toggle("active", mode === "liposomal");
        btnConv.setAttribute("aria-selected", mode === "conventional" ? "true" : "false");
        btnLipo.setAttribute("aria-selected", mode === "liposomal"    ? "true" : "false");

        kpiDepth.textContent      = data.depth;
        kpiIntact.textContent     = data.stability;
        kpiNote.textContent       = data.text;
        compareTitle.textContent  = data.title;
        vizNote.textContent       = data.description;

        benefitTitle1.textContent = data.benefit1.title;
        benefitText1.textContent  = data.benefit1.text;
        benefitTitle2.textContent = data.benefit2.title;
        benefitText2.textContent  = data.benefit2.text;
        benefitTitle3.textContent = data.benefit3.title;
        benefitText3.textContent  = data.benefit3.text;
    }

    /*──────────────────────────────────────
      Main switch
    ──────────────────────────────────────*/
    function switchMode(mode, firstLoad = false) {
        updateContent(mode);
        updateParticles(mode, firstLoad);
        currentMode = mode;
    }

    /*──────────────────────────────────────
      Events
    ──────────────────────────────────────*/
    btnConv.addEventListener("click", () => { if (currentMode !== "conventional") switchMode("conventional"); });
    btnLipo.addEventListener("click", () => { if (currentMode !== "liposomal")   switchMode("liposomal"); });

    /*──────────────────────────────────────
      ResizeObserver — re-apply positions
      when the container changes size
      (breakpoint crossing, orientation flip)
    ──────────────────────────────────────*/
    if (imageWrap) {
        let resizeTimer;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                /* Slide particles to their new breakpoint Y positions */
                if (currentMode) updateParticles(currentMode, false);
            }, 150);
        });
        ro.observe(imageWrap);
    }

    /*──────────────────────────────────────
      Init
    ──────────────────────────────────────*/
    if (imageWrap) {
        particleField = createParticles(imageWrap);
    }
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

