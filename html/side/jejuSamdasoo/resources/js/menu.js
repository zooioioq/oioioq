const menuBtn  = document.querySelector('.header__menuBtn');
const menuWrap = document.querySelector('.menu__wrap');
const closeBtn = document.querySelector('.menu__closeBtn');

let lockedScrollY = 0;

function getSmoother() {
  return (window.ScrollSmoother && ScrollSmoother.get && ScrollSmoother.get()) || null;
}

// 스크롤 잠금
function lockScroll() {
  const smoother = getSmoother();

  // 현재 스크롤 위치 저장
  if (smoother) {
    lockedScrollY = smoother.scrollTop(); // ScrollSmoother 전용
    smoother.paused(true);               // 스무딩/애니메이션 정지
  } else {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop;
  }

  document.documentElement.classList.add('scroll-lock');

  // (선택) 스크롤바 사라질 때 레이아웃 흔들림 방지: 필요하면 아래 주석 해제
  // const barW = window.innerWidth - document.documentElement.clientWidth;
  // if (barW > 0) document.documentElement.style.setProperty('--sbw', barW + 'px');
}

// 스크롤 해제
function unlockScroll() {
  const smoother = getSmoother();

  document.documentElement.classList.remove('scroll-lock');
  // document.documentElement.style.removeProperty('--sbw');

  if (smoother) {
    smoother.paused(false);
    // false: 애니메이션 없이 즉시 위치
    smoother.scrollTo(lockedScrollY, false);
  } else {
    window.scrollTo(0, lockedScrollY);
  }
}

function openMenu() {
  if (!menuWrap) return;
  if (!menuWrap.classList.contains('active')) {
    menuWrap.classList.add('active');
    lockScroll();
  }
}

function closeMenu() {
  if (!menuWrap) return;
  if (menuWrap.classList.contains('active')) {
    menuWrap.classList.remove('active');
    unlockScroll();
  }
}

function toggleMenu() {
  if (!menuWrap) return;
  if (menuWrap.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

// 열기(토글) 버튼
menuBtn?.addEventListener('click', toggleMenu);

// 닫기 버튼
closeBtn?.addEventListener('click', closeMenu);

// (옵션) ESC 로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});