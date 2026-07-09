$(document).ready(function() {

  // depth01__btn
  $('.depth01__btn').on('click', function() {
    var $this = $(this);
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
      $this.parent().siblings().find('.depth01__btn').removeClass('active');
    }
  });

  // depth02__btn
  $('.depth02__btn').on('click', function() {
    var $this = $(this);
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
      $this.parent().siblings().find('.depth02__btn').removeClass('active');
    }
  });

  // siteType toggle
  $('[data-toggle="data-toggle"]').on('click', 'li > a', function(e) {
    e.preventDefault();
    const $li = $(this).parent();
    $li.addClass('active')
    .siblings().removeClass('active');
  });

  // noti Swiper
  var notiSwiper = new Swiper(".header__noti__swiper", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // notiSwiper - autoPlay 제어
  var isPaused = false;
  document.querySelector('.header__noti__pause').addEventListener('click', function() {
    if (isPaused) {
      notiSwiper.autoplay.start(); // autoplay 재개
      this.classList.remove('active');
    } else {
      notiSwiper.autoplay.stop(); // autoplay 정지
      this.classList.add('active');
    }
    isPaused = !isPaused;
  });
});