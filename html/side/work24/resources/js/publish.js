$(document).ready(function() {

  // toTop
  $('.quickTools__link.toTop').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  // tebMenu
  $('.tabMenu__title__btn').on('click', function() {
    var $parentLi = $(this).closest('li');
    var $tabMenu = $parentLi.closest('.tabMenu');
    var index = $parentLi.index();
  
    $parentLi.addClass('active').siblings().removeClass('active');
  
    var $contentItems = $tabMenu.find('.tabMenu__content__items');
    $contentItems.removeClass('active').eq(index).addClass('active');
  });

  // mainContent - quick Swiper
  var quickSwiper = new Swiper(".mainContent__quick__swiper", {
    slidesPerView: 6,
    slidesPerGroup: 6,
    centeredSlides: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // mainContent - banner Swiper
  var BannerSwiper = new Swiper(".mainContent__banner__swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // BannerSwiper - autoPlay 제어
  var isPaused = false;
  document.querySelector('.pause').addEventListener('click', function() {
    if (isPaused) {
      BannerSwiper.autoplay.start(); // autoplay 재개
      this.classList.remove('active');
    } else {
      BannerSwiper.autoplay.stop(); // autoplay 정지
      this.classList.add('active');
    }
    isPaused = !isPaused;
  });

  // siteLink__title > button 클릭 이벤트
  $(".siteLink__title > button").on("click", function() {
    var parent = $(this).closest(".siteLink__title"); // button의 부모 요소인 siteLink__title 선택

    // hasClass 체크 후 active 클래스 추가/제거
    if (parent.hasClass("active")) {
      parent.removeClass("active"); // active 클래스 제거
    } else {
      parent.addClass("active"); // active 클래스 추가
    }
  });
});