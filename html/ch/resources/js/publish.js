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

    // 접속 기기 체크
    var filter = "win16|win32|win64|macintel|mac|";
    if( navigator.platform) {
        if( filter.indexOf(navigator.platform.toLowerCase())<0 ) {// mobile
        }else{ // PC
            // resize - reload
            let delay = 250;
            let timer = null; 
            $(window).on('resize', function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                document.location.reload();
                }, delay);
            });
        }
    }

    // 반응형
    let winW = $("body").outerWidth(true);
    $(window).resize(function() {
        winW = $("body").outerWidth(true);
    });
    if(winW >= 768){
        // pc
    } else {
        // mob
        const mobMainLink = '<ul class="mobMainLink"><li><a href="./phiples_kr_company.html">회사소개</a></li><li><a href="./phiples_kr_business.html">비즈니스</a></li><li><a href="./phiples_kr_notice.html">공지사항</a></li></ul>';
        const mobHeaderBtn = '<button type="button" class="mobHeaderBtn"></button>';
        const mobGnbCloseBtn = '<button type="button" class="mobGnbCloseBtn"></button>';
        $('.content .main_box').append(mobMainLink);
        $('.header .header_inner_wrap').append(mobHeaderBtn);
        $('.header .gnb').append(mobGnbCloseBtn);
        $('.mobHeaderBtn').on('click',function(){
            $('.header').addClass('on');
            $('body').css({'height':'100%','overflow':'hidden'});
        });
        $('.mobGnbCloseBtn').on('click',function(){
            $('.header').removeClass('on');
            $('body').css({'height':'auto','overflow':'unset'});
        });
        $('.gnb a').on('click',function(){
            $('.header').removeClass('on');
            $('body').css({'height':'auto','overflow':'unset'});
        });
    }

    // main_box img 변경
    var imgT = 1;
    setInterval(function(){
        imgT++;
        if(imgT > 3){ imgT = 1; }
        var imgUrl = '../resources/images/main_0' + imgT + '.webp'
        $('.main_box').css({'backgroundImage':'url('+ imgUrl +')'})
    },10000);

    // company - vision
    $('.content_vision li').addClass('off');
    $('.content_vision li').on('mouseenter',function(){ $(this).removeClass('off'); });
    $('.content_vision li').on('mouseleave',function(){ $(this).addClass('off'); });

    // business - business
    $('.content_business li').addClass('off');
    $('.content_business li').on('mouseenter',function(){ $(this).removeClass('off'); });
    $('.content_business li').on('mouseleave',function(){ $(this).addClass('off'); });

})(jQuery);