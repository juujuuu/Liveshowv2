$(function () {
	$(document).ready(function () {
		$("#siq_searchForm div img:first-child").click(function (event) {
			event.preventDefault();
			console.log("activating");
			$("#siq_searchForm div img:first-child").attr("src", "./assets/resources/shared/web/images/misc/search-over-click-state.jpg");
			$(".header__sub-menu__list").addClass("active");
			$("#siq_searchForm input").focus();
		});
		$("#siq_searchForm div img:last-child").click(function (event) {
			console.log("deactivating");
			event.preventDefault();
			$("#siq_searchForm div img:first-child").attr("src", "./assets/resources/shared/web/images/misc/search-icon.jpg");
			$(".header__sub-menu__list").removeClass("active");
		});
	});
});
