// /** last working 
//  * Code for changing the header to fixed top once we've scrolled past a certain point on desktop.
//  */
// $(function () {
//     $(document).ready(function () {
//         //Are we on a desktop?
//         if ($(window).width() > 990) {
//             //On scroll
//             $(window).scroll(function () {
//                 //If we've scrolled down more than 200px
//                 if ($(this).scrollTop() > 200) {
//                     const height = $(".header--default").height();
//                     $("#header--desktop__filler").show();
//                     $("#header--desktop__filler").height(height);
//                     $("header").addClass("fixed-top");
//                     $("header").removeClass("header--default");
                    
//                    //SPONSOR LEFT FADING
//                    $(".sponsor-left").fadeIn()
//                    //ADD .control-col__sponsor-left.vertical-margin--10 display: none; in ontrol-col too
//                    $(".sponsor-top").fadeOut()
//                      //TEE ONLY
//                     $(".reg-link-button").hide();
//                 } else {
//                     $("header").removeClass("fixed-top");
//                     $("header").addClass("header--default");
//                     $("#header--desktop__filler").hide();
                   
//                     //SPONSOR LEFT FADING
//                     $(".sponsor-left").fadeOut()
//                     $(".sponsor-top").fadeIn()
//                     //TEE ONLY
//                     $(".reg-link-button").show();
//                 }
//             });
//         }
//     });
// });
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
                    
                    //SPONSOR LEFT FADING
                    $(".control-col__sponsor-left").fadeIn()
                    $(".control-col__sponsor-top").fadeOut()
                    //ADD .control-col__sponsor-left.vertical-margin--10 display: none; in ontrol-col too

                     //TEE ONLY
                    $(".reg-link-button").hide();
                } else {
                    $("header").removeClass("fixed-top");
                    $("header").addClass("header--default");
                    $("#header--desktop__filler").hide();
                   
                    //SPONSOR LEFT FADING
                    $(".control-col__sponsor-left").fadeOut()
                    $(".control-col__sponsor-top").fadeIn()
                    

                    //TEE ONLY
                    $(".reg-link-button").show();
                }
            });
        }
    });
});
