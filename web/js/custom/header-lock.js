$(function () {
	$(document).ready(function () {
		if ($(window).width() > 990) {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 200) {
					$("header").addClass("fixed-top");
					$("header").removeClass("header--default");
				} else {
					$("header").removeClass("fixed-top");
					$("header").addClass("header--default");
				}
			});
		}
	});
});
