// js/src/index.js


// nav viewBox 영역에서는 background-color 없도록


(function($){
  
  // 최상단에서 scroll시 100vh 이동
  var win = $(window);
  var viewDoc = $('html,body');
  var viewBox = $('#viewBox');
  var recommend = true;
  var countScroll = 0;
  var winH = win.outerHeight();

  var setWinHFn = function(){
    viewBox.css({height:winH + 'px'});
  };
  
  var setScrollFn = function(n){
    recommend = false;
    var moveH = winH * n;
    viewDoc.animate({scrollTop:moveH + 'px'}, function(){
      recommend = true;
    });
  };

  setWinHFn();
  setScrollFn(0);

  viewDoc.on('mousewheel DOMMouseScroll', function(e){
    var winScrollTop = win.scrollTop();
                           
    var evt = e.originalEvent;
    var delta = 0;
    (e.type === 'DOMMouseScroll') ? delta = evt.detail * -40 :  delta = evt.wheelDelta;
    
    if(recommend){
      if(delta < 0 && winScrollTop >= 0 && countScroll <= 0){
        countScroll += 1;
        setScrollFn(countScroll);
      }else if(winScrollTop <= winH && delta > 0 && countScroll > 0){
        countScroll = 0;
        setScrollFn(countScroll);
      }
    }
  
  });




  
  // aboutmeBox 내부 skills tab menu 
  var aboutme = $('#aboutMeBox');
  var skills = aboutme.find('.skills');
  var skillsCateUl = skills.children('.skills_category');
  var skillsCateLi = skillsCateUl.children('li');
  var skillsDetail = skills.children('div');
  var skillsDetailUl = skillsDetail.children('ul');

  skillsCateLi.eq(0).addClass('act');
  skillsDetailUl.eq(1).css({display : 'none'});

  skillsCateLi.on('click focus',function(){
    var _this = $(this).index();

    skillsCateLi.eq(_this).siblings().removeClass('act');
    skillsCateLi.eq(_this).addClass('act');
    skillsDetailUl.eq(_this).siblings().hide();
    skillsDetailUl.eq(_this).show();
  });





  // aboutmeBox 내부 대표 img landing
  var meImg = $('.me_img');

  win.on('scroll',function(){
    var meImgOffset = meImg.offset().Top;
    var winScrollTop = win.scrollTop();
    var meMoveImg = meImgOffset - winH;

    if(meMoveImg = winScrollTop){
      meImg.addClass('act');
    }
  });





  // aboutmeBox 내부 대표 img parallax
  var projectImg = $('.yanolja_mokup');







  // gallery slide banner 
  var gallery = $('#galleryBox');
  var galImgArea = gallery.find('.gallery_img_area');
  var galImgUl = galImgArea.children('ul');
  var galLiLen = galImgUl.children('li').length;
  var galBtn = gallery.find('.gallery_btn');
  var galPrevBtn = galBtn.find('.prev');
  var galNextBtn = galBtn.find('.next');
  var permission = true;
  var i = 0;

  var cloneLiLast = galImgUl.children('li').eq(-1).clone();
  var cloneLiFirst = galImgUl.children('li').eq(0).clone();
  galImgUl.prepend(cloneLiLast);
  galImgUl.append(cloneLiFirst);

  galNextBtn.on('click', function(e){
    e.preventDefault();
    if(permission){
      permission = false;
      i += 1;
      if(i > galLiLen-1){
        i = 0;
        galImgUl.stop().css({marginLeft : 750 +'px'});
      }
      galImgUl.stop().animate({marginLeft : -(750 * i) + 'px'},function(){
        permission = true;
      })
    }
  });

  galPrevBtn.on('click', function(e){
    e.preventDefault();
    if(permission){
      permission = false;
      i -= 1;
      galImgUl.stop().animate({marginLeft : -(750 * i) + 'px'},function(){
        if(i < 0){
          i = galLiLen -1;
          galImgUl.stop().css({marginLeft : -(750 * i) + 'px'});
        }
        permission = true;
      })
    }
  });





})(jQuery);