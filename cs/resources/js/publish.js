(function ($) {
    // index.html :: iframe
    $(".iframeBox").hide();
    $(".index a").on({
        mouseenter: function () {
            let $this = $(this);
            let href = $this.attr("href");
            $(".iframeBox").show();
            $(".iframeBox iframe").attr("src", href);
        },
        mouseleave: function () {
            $(".iframeBox").hide();
        },
    });

    // index.html :: indexSelect
    $(".index").find("table").eq(1).hide();
    $(".indexSelect").on("change", function () {
        const val = $(this).val();
        if (val == 1) {
            $(".index").find("table").eq(0).show();
            $(".index").find("table").eq(1).hide();
        } else if (val == 2) {
            $(".index").find("table").eq(0).hide();
            $(".index").find("table").eq(1).show();
        }
    });

    // popup
    $(".popup .close_btn").on("click", function () {
        $(".popup").hide();
    });

    // datepicker
    $(function () {
        $(".datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            changeYear: true,
            changeMonth: true,
        });
        $(".datepicker").attr("placeholder", "YYYY-MM-DD");
    });

    // tab
    $(".con_tab li").on("click", function () {
        $(this).addClass("act");
        $(this).siblings().removeClass("act");
        var _index = $(this).index();
        $(this).parents(".con_tab").siblings(".con_tab_content").children("ul").children("li").hide();
        $(this).parents(".con_tab").siblings(".con_tab_content").children("ul").children("li").eq(_index).show();
    });

    // con_block
    $(".con_block .toggle_btn").on("click", function () {
        var hasAct = $(this).parents("li").hasClass("act");
        if (hasAct == true) {
            $(this).parents("li").removeClass("act");
        } else {
            $(this).parents("li").addClass("act");
        }
    });

    // tera_regi_003 :: tooltip
    $(".con--list button").on({
        mouseenter: function () {
            var tooltip = $(this).find(".tooltip");
            var info = $(this).find("p");
            var tooltipTxt = info.text();
            tooltip.text(tooltipTxt);
            tooltip.css("display", "block");
        },
        mouseleave: function () {
            $(".tooltip").css("display", "none");
        },
    });

    // accordion_btn
    $(".accordion_btn").on("click", function () {
        var hasAct = $(this).hasClass("act");
        if (hasAct == true) {
            $(this).removeClass("act");
            $(this).parent().siblings("ul").hide();
        } else {
            $(this).addClass("act");
            $(this).parent().siblings("ul").show();
        }
    });

    //checkbox
    const info_ck = $('.cb_td input[type="checkbox"]');
    info_ck.on("click", function () {
        const this_tr = $(this).parents("tr");
        const hasCheck = this_tr.hasClass("checked");
        if (hasCheck) {
            this_tr.removeClass("checked");
        } else {
            this_tr.addClass("checked");
        }
    });
    const header_ck = $('.ck_header input[type="checkbox"]');
    header_ck.on("click", function () {
        const this_header = $(this).parents(".ck_header");
        const hasCheck = this_header.hasClass("checked");
        if (hasCheck) {
            this_header.removeClass("checked");
        } else {
            this_header.addClass("checked");
        }
    });

    // table :: tooltip
    $(".table td").on("mouseenter", function () {
        var hasMedi = $(this).hasClass("medicine_input");
        if (hasMedi == false) {
            var _td = $(this).text();
            $(this).attr("title", _td);
        }
    });

    // tera_regi_003 :: file chosen
    $('.input--file input[type="file"]').change(function () {
        const fileName = $(this).val().split("\\").pop();
        $(this).parent(".input--file").addClass("file_chosen");
        $(this).siblings(".input--item").val(fileName);
    });

    // tera_regi_003 :: chosen file delete
    $(".input--file .delete").on("click", function () {
        $(this).parent(".input--file").removeClass("file_chosen");
        $(this).siblings("input").val("");
    });

    // mob_con_list
    $(".tab_menu li").on("click", function () {
        $(this).addClass("act");
        $(this).siblings().removeClass("act");
        var _index = $(this).index();
        $(this).parents(".tab_menu").siblings(".con_tab_content").children("ul").children("li").hide();
        $(this).parents(".tab_menu").siblings(".con_tab_content").children("ul").children("li").eq(_index).show();
    });

    // 20230811 :: 자동완성 위로 띄우기
    $(".medicine_input > .input").on("click focus", function () {
        let clicked = $(this);
        let clickedOffset = clicked.offset();
        let scrollTop = $(window).scrollTop();

        $(".fixed").removeClass("fixed");
        clicked.siblings("div").addClass("fixed");
        clicked.parents(".scroll_table").addClass("fixed");

        $(".medicine_input > .fixed").css({
            top: clickedOffset.top - scrollTop + clicked.outerHeight() + "px",
            left: clickedOffset.left + "px",
            width: clicked.outerWidth() + "px",
        });
    });

    // 클릭한 요소 이외의 곳을 클릭하면 팝업 숨기기
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".medicine_input").length) {
            $(".fixed").removeClass("fixed");
        }
    });

    // 자동완성 input 너비 지정
    const autoCompInput = $(".medicine_input:nth-of-type(2) > .input");
    autoCompInput.on("focus click", function () {
        let tdWidth = $(this).parents(".medicine_input").width();
        let trWidth = $(this).parents(".medi_wrap").width();
        $(this).innerWidth(tdWidth);
        $(this).siblings("div").innerWidth(trWidth);
    });

    // 창 사이즈 조정 시 input 사이즈도 즉시 조정 반영
    $(window).resize(function () {
        let tdWidth = autoCompInput.parent(".medicine_input").width();
        autoCompInput.innerWidth(tdWidth);
    });
})(jQuery);
