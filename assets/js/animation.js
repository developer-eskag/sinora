/* =========================================
   LIPOSOMAL COMPARISON
========================================= */
const btnConv = document.getElementById("btnConv");
const btnLipo = document.getElementById("btnLipo");
const pill = document.querySelector(".comparison-pill");
const depth = document.getElementById("kpiDepth");
const intact = document.getElementById("kpiIntact");
const note = document.getElementById("vizNote");
const title = document.getElementById("compareTitle");
const svg = document.getElementById("skinSvg");

if (
    btnConv &&
    btnLipo &&
    svg &&
    depth &&
    intact
) {
    const comparisonData = {
        conventional: {
            depth: 18,
            intact: 31,
            title: "Conventional Delivery",
            note: "Most active ingredients remain on the skin surface where they are exposed to oxidation, evaporation and cleansing before reaching deeper layers."
        },
        liposomal: {
            depth: 92,
            intact: 89,
            title: "Liposomal Delivery",
            note: "Encapsulated active ingredients remain protected while travelling deeper into the skin, allowing controlled release and improved absorption."
        }
    };

    /*----------------------------------
        Animate Number
    ----------------------------------*/
    function animateNumber(element, target) {
        if (!window.gsap) {
            element.textContent = target + "%";
            return;
        }
        const obj = {
            value: parseInt(element.textContent) || 0
        };
        gsap.to(obj, {
            value: target,
            duration: .8,
            ease: "power2.out",
            onUpdate() {
                element.textContent = Math.round(obj.value) + "%";
            }
        });
    }

    /*----------------------------------
        Toggle
    ----------------------------------*/
    function updateToggle(mode) {
        btnConv.classList.toggle(
            "active",
            mode === "conventional"
        );
        btnLipo.classList.toggle(
            "active",
            mode === "liposomal"
        );
        if (pill) {
            pill.style.left =
                mode === "liposomal" ? "calc(50% - 2px)" : "6px";
        }
    }

    /*----------------------------------
        KPI
    ----------------------------------*/
    function updateContent(mode) {
        const data = comparisonData[mode];
        animateNumber(depth, data.depth);
        animateNumber(intact, data.intact);
        if (title)
            title.textContent = data.title;

        if (note)
            note.textContent = data.note;
    }

    /*==================================================
        SVG
    ==================================================*/
    const NS = "http://www.w3.org/2000/svg";
    const W = 460;
    const H = 360;
    const surface = 70;
    const layers = [
        {
            y: surface,
            name: "Stratum Corneum",
            color: "#F7EBDD"
        },
        {
            y: 145,
            name: "Epidermis",
            color: "#F2E2CF"
        },
        {
            y: 235,
            name: "Dermis",
            color: "#ECD6BF"
        }
    ];

    layers.forEach((layer, index) => {
        const next = layers[index + 1] ? layers[index + 1].y : H;
        const rect = document.createElementNS(NS, "rect");
        rect.setAttribute("x", 0);
        rect.setAttribute("y", layer.y);
        rect.setAttribute("width", W);
        rect.setAttribute("height", next - layer.y);
        rect.setAttribute("fill", layer.color);
        svg.appendChild(rect);
        const line = document.createElementNS(NS, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("x2", W);
        line.setAttribute("y1", layer.y);
        line.setAttribute("y2", layer.y);
        line.setAttribute("stroke", "#D7C9B7");
        svg.appendChild(line);

        const text = document.createElementNS(NS, "text");

        text.setAttribute("x", 445);
        text.setAttribute("y", layer.y + 18);
        text.setAttribute("text-anchor", "end");
        text.setAttribute("font-size", "10");
        text.setAttribute("fill", "#8B8174");
        text.textContent = layer.name.toUpperCase();
        svg.appendChild(text);
    });

    /*----------------------------------
        Surface Line
    ----------------------------------*/

    const top = document.createElementNS(NS, "line");
    top.setAttribute("x1", 0);
    top.setAttribute("x2", W);
    top.setAttribute("y1", surface);
    top.setAttribute("y2", surface);
    top.setAttribute("stroke", "#C3B6A8");
    top.setAttribute("stroke-width", "2");
    svg.appendChild(top);

    /*==================================================
        PARTICLES
    ==================================================*/

    const particles = [];

    for (let i = 0; i < 8; i++) {
        const group = document.createElementNS(NS, "g");
        const glow = document.createElementNS(NS, "circle");
        glow.setAttribute("r", 16);
        glow.setAttribute("fill", "#F26A21");
        glow.setAttribute("opacity", "0");
        const shell = document.createElementNS(NS, "circle");
        shell.setAttribute("r", 8);
        shell.setAttribute("fill", "#fff");
        shell.setAttribute("stroke", "#F26A21");
        shell.setAttribute("stroke-width", "2");
        const core = document.createElementNS(NS, "circle");
        core.setAttribute("r", 3);
        core.setAttribute("fill", "#F26A21");
        const x = 60 + i * 42;

        [glow, shell, core].forEach(el => {
            el.setAttribute("cx", x);
            el.setAttribute("cy", 35);
        });

        group.appendChild(glow);
        group.appendChild(shell);
        group.appendChild(core);
        svg.appendChild(group);
        particles.push({
            shell,
            core,
            glow
        });
    }

    /*==================================================
        PARTICLE ANIMATION
    ==================================================*/

    function updateParticles(mode) {
        const deepY = 255;
        const shallowY = 88;
        particles.forEach((particle, index) => {
            const x = 60 + index * 42;
            if (mode === "liposomal") {
                gsap.to(
                    [particle.shell, particle.core],
                    {
                        attr: {
                            cx: x,
                            cy: deepY
                        },
                        opacity: 1,
                        duration: 1,
                        delay: index * .08,
                        ease: "power2.inOut"
                    }
                );
                gsap.to(particle.shell, {
                    attr: {
                        r: 8
                    },

                    duration: 1
                });
                gsap.to(
                    [particle.shell, particle.core],
                    {
                        scale: 1.15,
                        repeat: 1,
                        yoyo: true,
                        transformOrigin: "center center",
                        duration: .35,
                        delay: 1 + index * .08
                    }
                );
                gsap.fromTo(
                    particle.glow,
                    {
                        attr: {
                            cx: x,
                            cy: deepY
                        },
                        opacity: 0
                    },
                    {
                        attr: {
                            cx: x,
                            cy: deepY
                        },
                        opacity: .18,
                        repeat: 1,
                        yoyo: true,
                        duration: .35,
                        delay: 1 + index * .08
                    }
                );
            } else {
                gsap.to(
                    [particle.shell, particle.core],
                    {
                        attr: {
                            cx: x + gsap.utils.random(-20, 20),
                            cy: shallowY + gsap.utils.random(-8, 8)
                        },
                        opacity: .35,
                        duration: .9,
                        delay: index * .05,
                        ease: "power2.out"
                    }
                );
                gsap.to(
                    particle.shell,
                    {
                        attr: {
                            r: 6
                        },
                        duration: .9
                    }
                );
                gsap.to(
                    particle.glow,
                    {
                        opacity: 0,
                        duration: .2
                    }
                );
            }
        });
    }

    /*----------------------------------
        Main
    ----------------------------------*/

    function setMode(mode) {
        updateToggle(mode);
        updateContent(mode);
        updateParticles(mode);
    }

    btnConv.addEventListener("click", () => {
        setMode("conventional");
    });

    btnLipo.addEventListener("click", () => {
        setMode("liposomal");
    });

    /*----------------------------------
        Init
    ----------------------------------*/

    if (window.ScrollTrigger) {
        ScrollTrigger.create({
            trigger: ".comparison",
            start: "top 70%",
            once: true,
            onEnter() {
                setMode("liposomal");
            }
        });
    } else {
        setMode("liposomal");
    }
}

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

