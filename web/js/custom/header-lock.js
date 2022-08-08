/**
 * Code for changing the header to fixed top once we've scrolled past a certain point on desktop.
 */
$(function () {
    $(document).ready(function () {
        //Are we on a desktop?
        if ($(window).width() > 990) {
            //On scroll
            $(window).scroll(function () {
                //If we've scrolled down more than 200px
                if ($(this).scrollTop() > 200) {
                    const height = $(".header--default").height();
                    $("#header--desktop__filler").show();
                    $("#header--desktop__filler").height(height);
                    $("header").addClass("fixed-top");
                    $("header").removeClass("header--default");
                } else {
                    $("header").removeClass("fixed-top");
                    $("header").addClass("header--default");
                    $("#header--desktop__filler").hide();
                }
            });
        }
    });
});
