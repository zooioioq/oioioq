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

    // index.html :: indexSelect
    $('.index').find('table').eq(1).hide();
    $('.indexSelect').on('change', function(){
        const val = $(this).val();
        if(val == 1){
            $('.index').find('table').eq(0).show();
            $('.index').find('table').eq(1).hide();
        }else if(val == 2){
            $('.index').find('table').eq(0).hide();
            $('.index').find('table').eq(1).show();
        }
    });

    // nav :: onOff
    $('.nav a').on('click', function(){
        $('.nav a').removeClass('act');
        $(this).addClass('act');
    });

    // choice :: act
    $('.choice_one > button').on('click', function(){
        $('.choice_one > button').removeClass('act');
        $(this).addClass('act');
    });

    // tab
    $('.tab_header li').on('click', function(){
        $(this).addClass('act');
        $(this).siblings().removeClass('act');
        var _index = $(this).index();
        $('.tab_content').children('div').hide();
        $('.tab_content').children('div').eq(_index).show();
    });

    // late_chat_002.html
    const addChat = $('.add_chat');
    const addChatBtn = addChat.parents().siblings().find('.btn');
    addChat.find('.cb_label').on('click', function(){
        if($('.cb_label input').is(':checked')){
            addChat.parent('.add_chat').addClass('chosen');
            addChatBtn.addClass('btn_on').removeClass('btn_off');
        } else {
            addChat.parent('.add_chat').removeClass('chosen');
            addChatBtn.addClass('btn_off').removeClass('btn_on');
        }
    });
    $('.tab_header li').on('click', function(){
        addChat.parent('.add_chat').removeClass('chosen');
        addChatBtn.addClass('btn_off').removeClass('btn_on');
        $('.cb_label input').prop("checked", false);
    });

    // date_box
    $('.date_box input').on('change',function(){
        $(this).removeClass('empty_input');
        const empty = "";
        const val = $(this).val();
        if( val == empty){
        $(this).addClass('empty_input');
        }
    });
    $('.date_box input').on('focus',function(){
        $(this).removeClass('empty_input');
    });

    // late_chat_004.html :: textarea focus
    const inputTrans = $('.input_trans');

    inputTrans.on('click', function(){
        if(inputTrans.hasClass('result') === false){
            $(this).addClass('act');
            inputTrans.find('.textarea').focus();
        }
    });

    // late_know_002.html :: filter button toggle
    const resultFilter = $('.result_filter');
    const filterBtn = resultFilter.find('button');

    filterBtn.on('click', function(){
        filterBtn.removeClass('act');
        $(this).addClass('act');
    });

    // late_sns_001.html :: like_btn
    $('.like_btn').on('click',function(){
        const hasOn = $(this).hasClass('on');
        if(hasOn == true){
            $(this).removeClass('on');
        }else if(hasOn == false) {
            $(this).addClass('on');
        }
    });

    // late_set_021 :: acco_list
    $('.acco_header').on('click',function(){
        const hasAct = $(this).parent().hasClass('act');
        if(hasAct == true){
            $(this).parent().removeClass('act');
        }else if(hasAct == false) {
            $(this).parent().addClass('act');
        }
    });

    // indef_date
    $('.indef_date .toggle_label').on('click',function(){
        let toggle_ck = $(this).siblings('input').is(':checked');
        if(toggle_ck == true){
            $(this).parent().siblings('div').show();
            $(this).parent().siblings('span').show();
            $(this).parents('.indef_date').removeClass('ck');
        }else if(toggle_ck == false){
            $(this).parent().siblings('div').hide();
            $(this).parent().siblings('span').hide();
            $(this).parents('.indef_date').addClass('ck');
        }
    });

    // scrollTop_btn
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scrollTop_btn').fadeIn(250);
        } else {
            $('.scrollTop_btn').fadeOut(250);
        }
    });
    $('.scrollTop_btn').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // popup_nav
    $('.blind').append('<div></div>');
    $('.popup + div').on('click',function(){
        $(this).parent('.blind').hide();
    });

    // alert_set
    // total_toggle 체크시 전부 활성화 / 비활성화
    // $('.total_toggle .toggle_label').on('click',function(){
    //     let toggle_ck = $(this).siblings('input').is(':checked');
    //     if(toggle_ck == true){
    //         $(this).parent().siblings('.toggle_box').find('input').prop('checked',false)
    //     }else if(toggle_ck == false){
    //         $(this).parent().siblings('.toggle_box').find('input').prop('checked',true)
    //     }
    // });
    // 상세 toggle 하나라도 비활성화 있으면 total_toggle 비활성화
    // $('.alert_set .toggle_label').on('click',function(){
    //     let toggle_ck = $('.toggle_label').siblings('input').is(':checked');
    //     if(toggle_ck == true){
    //         $(this).parent().siblings('.total_toggle').find('input').prop('checked',false)
    //     }
    //     let toggle_ck_len = $('.alert_set input:checkbox:checked').length;
    //     let toggle_len = $('.alert_set input').length - 2;
    //     console.log(toggle_len);
    //     if(toggle_ck_len == toggle_len){
    //         $(this).parent().siblings('.total_toggle').find('input').prop('checked',true)
    //     }else if(toggle_ck_len <= toggle_len){
    //         $(this).parent().siblings('.total_toggle').find('input').prop('checked',false)
    //     }
    // });

})(jQuery);