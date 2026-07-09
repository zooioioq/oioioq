(function($){
    
    // reload
    var winW = $(window).outerWidth();
    $(window).on('resize', function() {
        var currentWidth = $(window).width();
        if (winW < 1024 && currentWidth >= 1024) {
            document.location.reload();
        }else if(winW > 1024 && currentWidth <= 1024){
            document.location.reload();
        }
        winW = currentWidth;
    });

    // scroll
    let hasPrjctdtl = $('.wrap').hasClass('prjctdtl');
    if(hasPrjctdtl == false){
        $(window).scroll(function () {
            let scrollPos = $(window).scrollTop();
            let headerH2 = $('.header h2');
            let topIntro = $('#introduction').offset().top - 120;
            let topSkill = $('#skill').offset().top - 120;
            let topPrjct = $('#project').offset().top - 120;
            let topOther = $('#other').offset().top - 120;
            let topDesign = $('#design').offset().top - 120;
            let topContct = $('#contact').offset().top - 120;
            if(scrollPos > 1){
                $('.section').addClass('out');
                $('.header').removeClass('top');
                if(scrollPos > topContct){
                    headerH2.text('Contact');
                    headerH2.css({'color':'#8E91CE'});
                }else if(scrollPos > topDesign){
                    headerH2.text('Design Works');
                    headerH2.css({'color':'#8eafce'});
                }else if(scrollPos > topOther){
                    headerH2.text('Side Project');
                    headerH2.css({'color':'#8E91CE'});
                }else if(scrollPos > topPrjct){
                    headerH2.text('Project');
                    headerH2.css({'color':'#8eafce'});
                }else if(scrollPos > topSkill){
                    headerH2.text('Skill');
                    headerH2.css({'color':'#8E91CE'});
                }else if(scrollPos > topIntro){
                    headerH2.text('Introduction');
                    headerH2.css({'color':'#8eafce'});
                }
            }else if(scrollPos < 1) {
                $('.section').removeClass('out');
                $('.header').addClass('top');
            }
        });
    }

    // cursor
    let mouseCursor = $('.cursor');
    $(window).mousemove(function(e){
        let cursorX = e.pageX + "px";
        let cursorY = e.pageY + "px";
        mouseCursor.css({"left": cursorX, "top": cursorY});
    });
    let sectionSpan = $('.section span');
    let headerH1 = $('.header > h1');
    let headerA = $('.header > a');
    let notionBtn = $('.notion_btn');
    let sendBtn = $('.sendBtn');
    let otherLi = $('#other .side_list li');
    let designLi = $('#design .design_list li');
    let conInput = $('.input');
    let projectA = $('#project > ul li a');
    let projectD = $('.project_layout > a');
    $(headerH1).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':1});
        let hasTop = $(this).parent('.header').hasClass('top');
        if(hasTop == true){ mouseCursor.addClass('cursor_grow_l') }
    });
    $(headerH1).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_l');
    });
    $(headerA).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':1});
        let hasTop = $(this).parent('.header').hasClass('top');
        if(hasTop == true){ mouseCursor.addClass('cursor_grow_l') }
    });
    $(headerA).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_l');
    });
    $(sectionSpan).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.addClass('cursor_grow_p')
    });
    $(sectionSpan).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_p')
    });
    $(notionBtn).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':-1});
        notionBtn.css({'margin-left':'2rem', 'color':'#fff'});
    });
    $(notionBtn).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.css({'z-index':1000});
        notionBtn.css({'margin-left':'0rem', 'color':'#767676'});
    });
    $(sendBtn).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':0});
        sendBtn.css({'right':'1rem', 'color':'#fff'});
    });
    $(sendBtn).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.css({'z-index':1000});
        sendBtn.css({'right':'4rem', 'color':'#333'});
    });
    $(conInput).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':1});
        mouseCursor.addClass('cursor_grow_s');
    });
    $(conInput).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_s');
    });
    $(otherLi).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':1});
        mouseCursor.addClass('cursor_grow_s');
        let _thisClass = $(this).attr('class');
        if(_thisClass == "jeju"){
            $('.side_content').text('제주항공 :: React, CSS');
        }else if(_thisClass == "gsap"){
            $('.side_content').text('GSAP :: Html, GSAP');
        }else if(_thisClass == "eli"){
            $('.side_content').text('엘리하이 :: React, CSS');
        }else if(_thisClass == "cardNews"){
            $('.side_content').text('사내 캠페인 카드뉴스 디자인 :: Figma, 미리캔버스');
        }
    });
    $(otherLi).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_s');
        $('.side_content').text('퍼블리싱 연습용으로 진행한 사이드 프로젝트입니다');
    });
    $(designLi).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.css({'z-index':1});
        mouseCursor.addClass('cursor_grow_s');
    });
    $(designLi).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_s');
    });
    $(projectA).mouseover(function(){
        let thisIndex = $(this).parent().index();
        if(thisIndex == 1){
            mouseCursor.addClass('cursor_grow_b');
        }else if(thisIndex == 2) {
            mouseCursor.addClass('cursor_grow_y');
        }else if(thisIndex == 3) {
            mouseCursor.addClass('cursor_grow_n');
        }
        mouseCursor.addClass('cursor_grow');
        mouseCursor.addClass('cursor_grow_l');
        mouseCursor.css({'z-index':-1});
    });
    $(projectA).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_l');
        mouseCursor.removeClass('cursor_grow_p');
        mouseCursor.removeClass('cursor_grow_b');
        mouseCursor.removeClass('cursor_grow_n');
        mouseCursor.removeClass('cursor_grow_y');
        mouseCursor.css({'z-index':1000});
    });
    $(projectD).mouseover(function(){
        mouseCursor.addClass('cursor_grow');
        mouseCursor.addClass('cursor_grow_s');
    });
    $(projectD).mouseleave(function(){
        mouseCursor.removeClass('cursor_grow');
        mouseCursor.removeClass('cursor_grow_s');
    });

    // project detail timer
    let timer;
    let winWidth = $(window).outerWidth(true);
    if(winWidth < 1024){
    }else if(winWidth > 1024){
        $(projectD).mouseover(function() {
            let link = $(this).attr('href');
            timer = setTimeout(function() {
                window.open(link, '_blank');
            }, 1500);
        }).mouseout(function() {
            clearTimeout(timer);
        });
    }

    // contact
    function getFormData(form) {
    var elements = form.elements;
    var honeypot;
    var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
        }
        return true;
    }).map(function(k) {
        if(elements[k].name !== undefined) {
            return elements[k].name;
        }else if(elements[k].length > 0){
            return elements[k].item(0).name;
        }
    }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var formData = {};
    fields.forEach(function(name){
        var element = elements[name];
        formData[name] = element.value;
        if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                data.push(item.value);
                }       
            }   
        formData[name] = data.join(', ');
        }
    });
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses";
    formData.formGoogleSendEmail
        = form.dataset.email || "";
    return {data: formData, honeypot: honeypot};
    }
    function handleFormSubmit(event) {  
    event.preventDefault();
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;
    if (formData.honeypot) {
        return false;
    }
    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            var formElements = form.querySelector(".form-elements")
            if (formElements) {
            formElements.style.display = "none";
            }
            alert("문의가 완료되었습니다. 빠른 시일 내에 답변 드리겠습니다 : )")
        }
    };
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
    }
    function loaded() {
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }

})(jQuery);