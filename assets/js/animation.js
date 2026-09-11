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
  const particleGroup = section.querySelector("#particleGroup");

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
    Build particles in SVG
    8 particles — spread across x
  ──────────────────────────────────────*/
  const NS = "http://www.w3.org/2000/svg";
  const PARTICLE_COUNT = 8;
  const START_Y = 40; // above skin surface

  // Y positions
  const Y_SURFACE  = 95;   // Stratum Corneum
  const Y_EPIDERMIS = 180; // Epidermis
  const Y_DERMIS   = 270;  // Dermis

  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = 40 + i * 52;

    // Glow ring
    const glow = document.createElementNS(NS, "circle");
    glow.setAttribute("cx", x);
    glow.setAttribute("cy", START_Y);
    glow.setAttribute("r", "14");
    glow.setAttribute("fill", "#F26A21");
    glow.setAttribute("opacity", "0");

    // Outer shell (liposome membrane)
    const shell = document.createElementNS(NS, "circle");
    shell.setAttribute("cx", x);
    shell.setAttribute("cy", START_Y);
    shell.setAttribute("r", "8");
    shell.setAttribute("fill", "rgba(255,255,255,0.9)");
    shell.setAttribute("stroke", "#F26A21");
    shell.setAttribute("stroke-width", "2");
    shell.setAttribute("opacity", "0");

    // Inner core (active ingredient)
    const core = document.createElementNS(NS, "circle");
    core.setAttribute("cx", x);
    core.setAttribute("cy", START_Y);
    core.setAttribute("r", "3.5");
    core.setAttribute("fill", "#F26A21");
    core.setAttribute("opacity", "0");

    particleGroup.appendChild(glow);
    particleGroup.appendChild(shell);
    particleGroup.appendChild(core);

    particles.push({ glow, shell, core, x, startY: START_Y });
  }

  /*──────────────────────────────────────
    Animate particles
    
    CONVENTIONAL:
    - Most stop at surface / epidermis
    - 1–2 reach dermis (barely)
    
    LIPOSOMAL:
    - Most reach dermis
    - 1–2 stay at surface
  ──────────────────────────────────────*/
  function animateParticles(mode) {
    particles.forEach((p, i) => {
      let targetY;
      let opacity;
      let shellR;
      let coreOpacity;

      if (mode === "liposomal") {
        // 6 reach dermis, 2 stay at surface/epidermis
        if (i === 0) {
          targetY     = Y_SURFACE;
          opacity     = 0.45;
          shellR      = 6;
          coreOpacity = 0.4;
        } else if (i === 3) {
          targetY     = Y_EPIDERMIS;
          opacity     = 0.6;
          shellR      = 7;
          coreOpacity = 0.7;
        } else {
          targetY     = Y_DERMIS + gsap.utils.random(-18, 18);
          opacity     = 1;
          shellR      = 8;
          coreOpacity = 1;
        }
      } else {
        // CONVENTIONAL: most at surface, 1-2 reach epidermis, none reach dermis
        if (i === 2 || i === 5) {
          targetY     = Y_EPIDERMIS + gsap.utils.random(-10, 10);
          opacity     = 0.55;
          shellR      = 6;
          coreOpacity = 0.5;
        } else {
          targetY     = Y_SURFACE + gsap.utils.random(-12, 12);
          opacity     = 0.75;
          shellR      = 7;
          coreOpacity = 0.7;
        }
      }

      const delay = i * 0.07;

      // Animate shell
      gsap.to(p.shell, {
        attr: { cy: targetY, r: shellR },
        opacity: opacity,
        duration: 0.9,
        delay: delay,
        ease: "power2.inOut"
      });

      // Animate core
      gsap.to(p.core, {
        attr: { cy: targetY },
        opacity: coreOpacity,
        duration: 0.9,
        delay: delay,
        ease: "power2.inOut"
      });

      // Glow — only show for deep particles in liposomal mode
      const glowOpacity = (mode === "liposomal" && targetY >= Y_DERMIS - 20) ? 0.2 : 0;
      gsap.to(p.glow, {
        attr: { cy: targetY },
        opacity: glowOpacity,
        duration: 0.9,
        delay: delay,
        ease: "power2.inOut"
      });

      // Arrival pulse — only for particles that reach dermis
      if (mode === "liposomal" && targetY >= Y_DERMIS - 20) {
        gsap.to([p.shell, p.core], {
          scale: 1.2,
          transformOrigin: `${p.x}px ${targetY}px`,
          repeat: 1,
          yoyo: true,
          duration: 0.3,
          delay: delay + 0.95,
          ease: "power1.inOut"
        });
      }
    });
  }

  /*──────────────────────────────────────
    Reset particles to start position
  ──────────────────────────────────────*/
  function resetParticles() {
    particles.forEach(p => {
      gsap.killTweensOf([p.shell, p.core, p.glow]);
      gsap.set([p.shell, p.core, p.glow], {
        attr: { cy: p.startY },
        opacity: 0,
        scale: 1
      });
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
    resetParticles();
    // Small delay so reset visually clears before animating in
    setTimeout(() => animateParticles(mode), 80);
  }

  /*──────────────────────────────────────
    Events
  ──────────────────────────────────────*/
  btnConv.addEventListener("click", () => switchMode("conventional"));
  btnLipo.addEventListener("click", () => switchMode("liposomal"));

  /*──────────────────────────────────────
    Init — start with conventional
  ──────────────────────────────────────*/
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

