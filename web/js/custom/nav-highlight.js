$(function() {
    var url = window.location.href;
    console.log("current url is " + url);
    $(".header--desktop .header__sub-menu__list li a").each(function(){
        //console.log("parsed " + this.href);
        if(this.href == url){
            console.log("url found!");
            $(this).addClass("active");
        }
    });
    $(".header--desktop .nav-item a").each(function(){
        //console.log("parsed " + this.href);
        if(this.href == url){
            console.log("url found!");
            $(this).addClass("active");
        }
    });
});