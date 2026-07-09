gsap.registerPlugin(ScrollSmoother, ScrollToPlugin);

// 전체 스크롤 스무스
const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.5,          // 값 ↑ = 더 느릿/부드러움 (1~2 정도부터 테스트)
  effects: true,        // data-speed 등 패럴랙스 효과 활성화
  normalizeScroll: true // 모바일 튕김 등 보정
});

// toTopBtn
document.querySelector(".toTopBtn a").addEventListener("click", e => {
  e.preventDefault();
  const target = "#section1";
  const sm = ScrollSmoother.get();
  if (sm) {
    sm.scrollTo(target, true);
  } else {
    gsap.to(window, {
      duration: 1,
      scrollTo: target,
      ease: "power2.out"
    });
  }
});