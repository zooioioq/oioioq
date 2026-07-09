// publish.js 내 혹은 별도 JS 파일에 추가
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  initSideNav();
});

function initSideNav() {
  const container = document.querySelector("#smooth-wrapper");
  if (!container) return;

  const sections = gsap.utils.toArray("#parallax__cont .parallax__item");
  if (!sections.length) return;

  // 기존 sideNav 있으면 제거 (중복 생성 방지)
  const oldNav = container.querySelector(":scope > .sideNav");
  if (oldNav) oldNav.remove();

  // 1) sideNav 생성 및 #smooth-wrapper 첫번째 자식으로 삽입
  const nav = document.createElement("ul");
  nav.className = "sideNav";
  const first = container.firstElementChild;
  if (first) {
    first.after(nav);          // 첫 번째 자식 뒤(=두 번째 위치)에 삽입
  } else {
    container.appendChild(nav); // 자식이 없으면 그냥 추가(첫 번째가 됨)
  }

  // 2) 섹션 수만큼 items 생성
  sections.forEach((sec, i) => {
  const li = document.createElement("li");
  li.className = "sideNav__items";

  const a = document.createElement("a");
  a.href = "#";
  a.setAttribute("data-index", i);
  // 필요 시 표시 텍스트(번호 등): a.textContent = i + 1;

  a.addEventListener("click", (e) => {
    e.preventDefault();
    // 3) 클릭 시 해당 섹션으로 즉시 스크롤 (duration 0)
    // 헤더 고정 높이 고려 필요 시 offset 조정: const headerH = document.querySelector('.header')?.offsetHeight || 0;
    // gsap.set(window, { scrollTo: sec.offsetTop - headerH });
    if (gsap.plugins.ScrollToPlugin) {
      gsap.to(window, { duration: 0, scrollTo: { y: sec, autoKill: true } });
    } else {
      window.scrollTo({ top: sec.getBoundingClientRect().top + window.pageYOffset, behavior: "auto" });
    }
  });

  li.appendChild(a);
  nav.appendChild(li);
});

const navItems = Array.from(nav.querySelectorAll(".sideNav__items"));
let currentIndex = -1;

function setActive(index) {
  if (currentIndex === index) return;
  currentIndex = index;
  navItems.forEach((li, i) => {
    if (i === index) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
  // 첫 번째 아이템이 활성화된 경우 .sideNav 에 .blue 클래스 부여
  if (index === 0) {
    nav.classList.add("blue");
  } else {
    nav.classList.remove("blue");
  }
}

// 4) 스크롤 감지하여 active 클래스 반영
sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(i),
    onEnterBack: () => setActive(i)
  });
});

// 초기 활성 섹션 설정 (새로고침 시 중간 위치 대응)
requestAnimationFrame(() => {
  let initIndex = 0;
  const centerLine = window.innerHeight / 2;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= centerLine && rect.bottom >= centerLine) {
      initIndex = i;
  }
});
setActive(initIndex);
});

// (선택) 리프레시 시 다시 계산
ScrollTrigger.addEventListener("refreshInit", () => {
  let idx = 0;
  const centerLine = window.innerHeight / 2;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= centerLine && rect.bottom >= centerLine) idx = i;
  });
  setActive(idx);
});

ScrollTrigger.refresh();
}