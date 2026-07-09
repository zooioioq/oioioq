(function($){

    // index.html :: iframe
    $('.iframeBox').hide();
    $('.index a').on({
        mouseenter :function(){
            let $this = $(this);
            let href = $this.attr('href');
            $('.iframeBox').show();
            $('.iframeBox iframe').attr('src',href);
        },
        mouseleave : function(){
            $('.iframeBox').hide();
        }
    })

    // login form focus
    $('.login input').on('focus',function(){
        $(this).parents('label').addClass('focus');
    });
    $('.login input').on('focusout',function(){
        $(this).parents('label').removeClass('focus');
    });

    // btn_nav 클릭 시 nav_list 열기
    $('.nav > button').on('click', function(){
        if ($('.nav').hasClass('act')) {
            $('.nav').removeClass('act');
        } else {
            $('.nav').addClass('act');
        }
    });

    // 외부영역 클릭 시 nav_list 닫기
    $(document).mouseup(function (e){
        const nav = $(".nav");
        const top_l = $(".top_l");
        if (nav.has(e.target).length === 0) {
            nav.removeClass("act");
        }
        if (top_l.has(e.target).length === 0) {
            $('.header').removeClass("search_pop");
        }
    });

    // file list 클릭 시 해당 label에 addClass('act')
    $('.label_cb > input').on('click', function(){
        if($(this).is(':checked')){
            $(this).parent('.label_cb').removeClass('act');
        } else { 
            $(this).parent('.label_cb').addClass('act');
        }
    });

    // faq_list 클릭 시 해당 li에 addClass('act')
    $('.li_q').on('click', function(){
        // if($(this).parent('li').hasClass('act')){
        //     $(this).parent('li').removeClass('act');
        // } else { 
        //     $(this).parent('li').addClass('act');
        // }
        $(this).siblings('.li_a').stop().slideToggle(150);
    });

    //////////////////// 반응형 ////////////////////
    $(window).resize(function() {
        var winWidth = window.innerWidth;
        if(winWidth < 768){
            ///// Mobile

            // header의 돋보기 아이콘 클릭 시 검색창 띄우기
            $('.header .top_l').on('click', function(){
                $('.header').addClass('search_pop');
            });
            
        } else if (768 <= winWidth < 1280) {
            ///// Tablet
            
        }  else {
            ///// PC
            
        }
     }).resize();

})(jQuery);