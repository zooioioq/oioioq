gsap.registerPlugin(ScrollTrigger);

// mainSamdasoo 위치 고정
ScrollTrigger.create({
  trigger: "#section1",
  start: "top top",
  endTrigger: "#section3",
  end: "bottom center",
  pin: ".fixWrapper",
  pinSpacing: false,
  anticipatePin: 1
});

// mainSamdasoo Fade
gsap.to(".mainSamdasoo", {
  autoAlpha: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "#section3",
    start: "center center",     // section3의 중간이 viewport 중앙에 도달
    end: "center+=20% center",  // 짧은 거리 (viewport 높이의 20%) 동안만 스크럽
    scrub: true,
  }
});

// 접근성(모션 최소화)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  smoother && smoother.kill();
}

window.addEventListener("load", () => ScrollTrigger.refresh());

// header 
const header = document.querySelector('.header');

function headerH() {
  return header ? header.offsetHeight : 0;
}

ScrollTrigger.create({
  trigger: "#section2",
  start: () => "top top+=" + headerH(),
  endTrigger: "#section3",
  end: () => "bottom top+=" + headerH(),
  toggleClass: { targets: header, className: "white" },
  anticipatePin: 1
});

// sub__text fadeIn (모든 섹션 공통)
gsap.set("#section3 .moreBtn", { autoAlpha:0, y:20 });

gsap.utils.toArray(".parallax__item").forEach(section => {
  const sub = section.querySelector(".sub__text");
  if (!sub) return;

  gsap.fromTo(sub,
  { autoAlpha: 0, y: -40 },
  {
    autoAlpha: 1,
    y: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
    trigger: section,
    start: "top 10%",
    toggleActions: "play reverse play reverse",
    onEnter: () => {
      if (section.id === "section3") {
        gsap.to("#section3 .moreBtn", {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.75
        });
      }
    },
    onLeaveBack: () => {
      if (section.id === "section3") {
        gsap.to("#section3 .moreBtn", {
          autoAlpha: 0,
          y: -20,
          duration: 1,
          ease: "power2.inOut"
        });
      }
    }
  }});
});

gsap.from("#section4 .visual__text", {
  autoAlpha: 0,
  y: 40,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#section4",
    start: "top center",
    toggleActions: "play reverse play reverse",
  }
});

const section4 = document.querySelector("#section4");

gsap.from("#section4 .moreInformation", {
  autoAlpha: 0,
  y: 40,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: section4,
    start: () => "top+=" + (section4.offsetHeight * 0.2) + " top", // bottom에서 60% 위 지점
    toggleActions: "play reverse play reverse",
  }
});