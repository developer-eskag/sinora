/* =========================================
   LIPOSOMAL COMPARISON
========================================= */
/*====================================================
    LIPOSOMAL COMPARISON
====================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const section =
        document.querySelector("#comparison");

    if (!section) return;


    /*----------------------------------
        Elements
    ----------------------------------*/

    const toggle =
        section.querySelector(".comparison-toggle");

    const btnConv =
        section.querySelector("#btnConv");

    const btnLipo =
        section.querySelector("#btnLipo");

    const image =
        section.querySelector("#comparisonImage");

    const kpiDepth =
        section.querySelector("#kpiDepth");

    const kpiIntact =
        section.querySelector("#kpiIntact");

    const compareTitle =
        section.querySelector("#compareTitle");

    const vizNote =
        section.querySelector("#vizNote");

    const benefitTitle1 =
        section.querySelector("#benefitTitle1");

    const benefitText1 =
        section.querySelector("#benefitText1");

    const benefitTitle2 =
        section.querySelector("#benefitTitle2");

    const benefitText2 =
        section.querySelector("#benefitText2");

    const benefitTitle3 =
        section.querySelector("#benefitTitle3");

    const benefitText3 =
        section.querySelector("#benefitText3");


    /*----------------------------------
        Images
    ----------------------------------*/

    const images = {

        conventional:
            "assets/images/comparison-conventional.png",

        liposomal:
            "assets/images/comparison-sinora-liposomal.png"

    };

    /*----------------------------------
        Preload Comparison Images
    ----------------------------------*/

    Object.values(images).forEach(function (src) {

        const preload =
            new Image();

        preload.src = src;

    });


    /*----------------------------------
        Content
    ----------------------------------*/

    const states = {

        conventional: {

            depth: "18%",

            stability: "31%",

            title:
                "Conventional Delivery",

            description:
                "Most active ingredients remain around the skin's surface, where exposure and rapid release can limit how effectively they are delivered.",

            benefit1: {
                title: "Stays on the Surface",
                text:
                    "Most active ingredients remain around the skin's outer surface."
            },

            benefit2: {
                title: "Limited Absorption",
                text:
                    "Less of the active ingredient may reach deeper layers of the skin."
            },

            benefit3: {
                title: "Less Efficient",
                text:
                    "Ingredients can be exposed before reaching their intended destination."
            }

        },


        liposomal: {

            depth: "92%",

            stability: "89%",

            title:
                "Liposomal Delivery",

            description:
                "Encapsulated active ingredients remain protected while travelling deeper into the skin, allowing controlled release and improved absorption.",

            benefit1: {
                title: "Protected",
                text:
                    "Active ingredients are surrounded by a protective liposomal structure."
            },

            benefit2: {
                title: "Deeper Delivery",
                text:
                    "Liposomes help carry active ingredients beyond the skin's outer barrier."
            },

            benefit3: {
                title: "Controlled Release",
                text:
                    "The delivery system supports controlled release of active ingredients."
            }

        }

    };


    /*----------------------------------
        Image Cross Dissolve
    ----------------------------------*/

    const imageA =
        section.querySelector("#comparisonImageA");

    const imageB =
        section.querySelector("#comparisonImageB");

    let activeImage = imageA;


    function changeImage(src, alt) {

        const nextImage =
            activeImage === imageA
                ? imageB
                : imageA;


        /* Load the new image first */

        const preload =
            new Image();


        preload.onload = function () {

            nextImage.src =
                src;

            nextImage.alt =
                alt;


            /* Make new image visible */

            nextImage.classList.add(
                "is-visible"
            );


            /* Fade old image out */

            activeImage.classList.remove(
                "is-visible"
            );


            /* New image becomes active */

            activeImage =
                nextImage;

        };


        preload.src = src;

    }


    /*----------------------------------
        Update Comparison
    ----------------------------------*/

    function updateComparison(mode) {

        const data =
            states[mode];

        if (!data) return;


        /* Toggle */

        toggle.classList.remove(
            "is-conventional",
            "is-liposomal"
        );

        toggle.classList.add(
            mode === "conventional"
                ? "is-conventional"
                : "is-liposomal"
        );


        /* Buttons */

        btnConv.classList.toggle(
            "active",
            mode === "conventional"
        );

        btnLipo.classList.toggle(
            "active",
            mode === "liposomal"
        );


        /* Accessibility */

        btnConv.setAttribute(
            "aria-selected",
            mode === "conventional"
                ? "true"
                : "false"
        );

        btnLipo.setAttribute(
            "aria-selected",
            mode === "liposomal"
                ? "true"
                : "false"
        );


        /* KPI */

        kpiDepth.textContent =
            data.depth;

        kpiIntact.textContent =
            data.stability;


        /* Description */

        compareTitle.textContent =
            data.title;

        vizNote.textContent =
            data.description;


        /* Benefits */

        benefitTitle1.textContent =
            data.benefit1.title;

        benefitText1.textContent =
            data.benefit1.text;


        benefitTitle2.textContent =
            data.benefit2.title;

        benefitText2.textContent =
            data.benefit2.text;


        benefitTitle3.textContent =
            data.benefit3.title;

        benefitText3.textContent =
            data.benefit3.text;


        /* Image */

        changeImage(
            images[mode],
            data.title + " skin delivery illustration"
        );

    }


    /*----------------------------------
        Click Events
    ----------------------------------*/

    btnConv.addEventListener(
        "click",
        function () {

            updateComparison(
                "conventional"
            );

        }
    );


    btnLipo.addEventListener(
        "click",
        function () {

            updateComparison(
                "liposomal"
            );

        }
    );


    /*----------------------------------
        Initial State
    ----------------------------------*/

    updateComparison(
        "liposomal"
    );

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

