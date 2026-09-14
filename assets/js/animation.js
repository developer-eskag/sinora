/*====================================================
    LIPOSOMAL COMPARISON
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
      depth: "18%", stability: "31%", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      title: "Conventional Delivery",
      description: "Most active ingredients remain around the skin's surface, where exposure and rapid release limit how effectively they are delivered.",
      benefit1: { title: "Stays on the Surface",   text: "Most active ingredients remain around the skin's outer surface." },
      benefit2: { title: "Limited Absorption",      text: "Less of the active ingredient may reach deeper layers of the skin." },
      benefit3: { title: "Less Efficient",          text: "Ingredients can be exposed before reaching their intended destination." }
    },
    liposomal: {
      depth: "92%", stability: "89%", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      title: "Liposomal Delivery",
      description: "Encapsulated active ingredients remain protected while travelling deeper into the skin, allowing controlled release and improved absorption.",
      benefit1: { title: "Protected",         text: "Active ingredients are surrounded by a protective liposomal structure." },
      benefit2: { title: "Deeper Delivery",   text: "Liposomes help carry active ingredients beyond the skin's outer barrier." },
      benefit3: { title: "Controlled Release",text: "The delivery system supports controlled release of active ingredients." }
    }
  };

  /*──────────────────────────────────────
    Particle configuration
    x    = horizontal position (%)
    conv = vertical position (%) for Conventional state
    lipo = vertical position (%) for Liposomal state

    Distribution:
      Conventional -> 7 surface, 1 mid, 2 deep
      Liposomal    -> 1 surface (stays), 2 mid, 7 deep
  ──────────────────────────────────────*/
  const particlesConfig = [
    { x: 50, conv: 28, lipo: 29 }, // 1 — stays on surface
    { x: 25, conv: 26, lipo: 36 }, // 2 — surface -> mid
    { x: 75, conv: 28, lipo: 38 }, // 3 — surface -> mid
    { x: 12, conv: 29, lipo: 68 }, // 4 — surface -> deep
    { x: 35, conv: 27, lipo: 72 }, // 5 — surface -> deep
    { x: 65, conv: 28, lipo: 66 }, // 6 — surface -> deep
    { x: 88, conv: 29, lipo: 74 }, // 7 — surface -> deep
    { x: 45, conv: 34, lipo: 70 }, // 8 — mid -> deep
    { x: 20, conv: 65, lipo: 65 }, // 9 — deep, stays
    { x: 80, conv: 70, lipo: 70 }  // 10 — deep, stays
  ];

  // indices (0-based) of particles that newly ARRIVE at the deep layer
  // when switching to Liposomal — these get the burst effect
  const burstIndices = [3, 4, 5, 6, 7];

  const MOVE_DURATION = 1400; // ms — must match .particle transition time in CSS

  let particleField = null;

  /*──────────────────────────────────────
    Build particle DOM (once)
  ──────────────────────────────────────*/
  function createParticles(wrapEl) {
    const field = document.createElement("div");
    field.className = "comparison-particles";
    field.id = "particleField";

    particlesConfig.forEach((p, i) => {
      const el = document.createElement("div");
      el.className = "particle";
      el.dataset.index = i;
      el.style.left = p.x + "%";
      el.style.top  = p.conv + "%";
      el.style.transitionDelay = (i % 5) * 0.08 + "s";

      const floatEl = document.createElement("div");
      floatEl.className = "particle-float";
      floatEl.style.animationDelay = (i * 0.3) + "s";

      const core = document.createElement("div");
      core.className = "particle-core";
      core.style.animationDelay = (i * 0.25) + "s";

      floatEl.appendChild(core);

      const burst = document.createElement("div");
      burst.className = "particle-burst";

      el.appendChild(floatEl);
      el.appendChild(burst);
      field.appendChild(el);
    });

    wrapEl.appendChild(field);
    return field;
  }

  /*──────────────────────────────────────
    Move particles to match current mode
  ──────────────────────────────────────*/
  function updateParticles(mode) {
    if (!particleField) return;

    const els = particleField.querySelectorAll(".particle");
    els.forEach((el, i) => {
      const cfg = particlesConfig[i];
      const targetY = mode === "liposomal" ? cfg.lipo : cfg.conv;
      el.style.top = targetY + "%";

      const burstEl = el.querySelector(".particle-burst");

      // always clear any pending "start looping" timer first
      clearTimeout(el._burstTimeout);

      if (mode === "liposomal" && burstIndices.includes(i)) {
        // start the continuous burst loop once the particle has
        // finished travelling down to the deep layer
        const delay = MOVE_DURATION + (i % 5) * 80;
        burstEl.style.animationDelay = ((i % 5) * 0.25) + "s";

        el._burstTimeout = setTimeout(() => {
          burstEl.classList.add("is-looping");
        }, delay);
      } else {
        // switching back to conventional (or not a deep-layer particle):
        // stop the loop immediately
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

    kpiDepth.textContent     = data.depth;
    kpiIntact.textContent    = data.stability;
    kpiNote.textContent      = data.text;

    compareTitle.textContent = data.title;
    vizNote.textContent      = data.description;

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
  function switchMode(mode) {
    updateContent(mode);
    updateParticles(mode);
  }

  /*──────────────────────────────────────
    Events
  ──────────────────────────────────────*/
  btnConv.addEventListener("click", () => switchMode("conventional"));
  btnLipo.addEventListener("click", () => switchMode("liposomal"));

  /*──────────────────────────────────────
    Init — build particles, start with conventional
  ──────────────────────────────────────*/
  if (imageWrap) {
    particleField = createParticles(imageWrap);
  }
  switchMode("conventional");
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

