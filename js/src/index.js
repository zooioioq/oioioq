// js/src/index.js


// nav viewBox 영역에서는 background-color 없도록
// 최상단에서 scroll시 100vh 이동
// gallery slide banner 


(function($){
  
  
  // about me box 내부 skills tab menu 
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


})(jQuery);