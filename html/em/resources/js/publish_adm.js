(function($){

    // nav
    $('.nav li').on('click',function(){
        let hasAct = $(this).hasClass('act');
        if(hasAct == true) {
            $(this).removeClass('act');
        }else if(hasAct == false){
            $(this).siblings().removeClass('act');
            $(this).addClass('act');
        }
    });

    // search_form
    let btnLocationFn = function(){
        let formHeight = $('.search_form').outerHeight();
        let btnTop = formHeight + 58 + 'px';
        $('.search_form_btn').css({'top': btnTop});
    };
    btnLocationFn();
    $('.search_form_btn').on('click',function(){
        let hasHide = $('.search_form').hasClass('hide');
        if(hasHide == true){
            $('.search_form').removeClass('hide');
            $('.search_form_btn').removeClass('hide');
            $('.title_btn').removeClass('hide');
            btnLocationFn();
        }else if(hasHide == false){
            $('.search_form').addClass('hide');
            $('.search_form_btn').addClass('hide');
            $('.search_form_btn').css({'top':'2.2rem'});
            $('.title_btn').addClass('hide');
        }
    });

})(jQuery);