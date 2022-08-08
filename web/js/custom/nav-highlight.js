/**
 * Code for bolding / hightlighting the current page on the nav menus.
 */
$(function () {
    var url = window.location.href;
    console.log("current url is " + url);

    //For each matched element
    $(".header--desktop .header__sub-menu__list li a").each(function () {
        if (this.href == url) {
            $(this).addClass("active");
        }
    });
    $(".header--desktop .nav-item a").each(function () {
        const { href } = this;
        //If we're on this nav item, and it's not the big red register now one.
        if (href == url && !$(this).parent().hasClass("nav-item--reg-link")) {
            $(this).addClass("active");
        }
    });
});
