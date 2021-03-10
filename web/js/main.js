// ALL THE JS FOR THE FORM ASSEMBLY CONTENT BLOCK
var cleanUpFormAssembly = function () {
	var attrs = {};
	if ($("span.choices").length) {
		$.each($("span.choices")[0].attributes, function (idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});
		$("span.choices").replaceWith(function () {
			return $("<div />", attrs).append($(this).contents());
		});
		$("div.choices").removeClass("vertical");
	}
	if ($("span.oneChoice").length) {
		$.each($("span.oneChoice")[0].attributes, function (idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});
		$("span.oneChoice").replaceWith(function () {
			return $("<div />", attrs).append($(this).contents());
		});
		$("div.oneChoice").removeClass("oneChoice").addClass("checkbox");
	}
	if ($("input.primaryAction").length) {
		$.each($("input.primaryAction")[0].attributes, function (idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});
		$("input.primaryAction").replaceWith(function () {
			return $("<button />", attrs).append($(this).contents());
		});
		$("button.primaryAction").append("Submit").removeClass("primaryAction focused").addClass("btn btn-default");
	}

	$(".wFormContainer label").removeClass("label preField").addClass("form-label");
	$(".wFormContainer input:text").addClass("form-control");
	$(".wFormContainer input[type=email]").addClass("form-control");
	$(".wFormContainer input.validate-email").addClass("form-control");
	$(".wFormContainer textarea").addClass("form-control");
	$(".wFormContainer [placeholder=Telephone]").prop("required", true);
	// WHEN THE ABOVE WORKS THEN DELETE THE LINE BELOW
	$(".wFormContainer [placeholder=Telephone]").attr({
		type: "tel",
	});
	$(".wFormContainer div.inputWrapper").addClass("form-group");
	$(".wFormContainer div").removeClass("wFormContainer wForm codesection oneField inputWrapper htmlSection");
	$(".wFormContainer label, .wFormContainer input, .wFormContainer textarea").attr("style", " ");
	$(".wFormContainer style").detach();
	$(".wFormContainer p:empty").remove();
	$(".wFormContainer .wFormTitle").remove();
	$(".col-sm-12 > p > link").remove();
	$(".wFormContainer .supportInfo").hide();
	$("#code-tfa_0").remove();
};

var loadForm = function (formPopUp) {
	console.log("Load was performed.");
	//cleans form
	// cleanUpFormAssembly();
	//sets submit event to new form

	$("#formModal form").submit(function (event) {
		event.preventDefault();
		if (!window.location.href.includes("futurevehiclesnvhsummit") && !window.location.href.includes("spacetechexpo.com")) {
			/*ga(function () {
                var tracker = ga.getAll()[0];
                $('.GATRACKID').val(tracker.get('trackingId'));
                $('.GACLIENTID').val(tracker.get('clientId'));
                $('.GAUSERID').val(tracker.get('userId'));
            });*/
		}
		$(this).find(".primaryAction").val("submitting").fadeTo("fast", 0.5).prop("disabled", true);
		if ($(this).attr("action") == "https://smartershows.tfaforms.net/rest/responses/processor") {
			var url = "site/formassembly";
		} else {
			var url = "site/salesforceform";
		}
		var datastring = $(this).serializeArray();

		console.log(url, datastring, formPopUp.data("file"));

		$.ajax({
			url: url,
			type: "POST",
			data: datastring,
			success: function (result) {
				if (typeof formPopUp.data("file") === "string" && formPopUp.data("file") !== "") {
					window.location.href = window.location.origin + formPopUp.data("file");
				} else {
					//                    formPopUp.html('<div style="height:'+formPopUp.height()+'px">Thank You</div>');
				}
				$("#formModal").modal("hide");
			},
		});
	});
};

//AJAX thank you Form Assembly
var sendDataFormAssembly = function (form) {
	var url = "site/formassembly";
	var datastring = form.serializeArray();
	$.ajax({
		url: url,
		type: "POST",
		data: datastring,
		success: function (result) {
			form.html(
				'<div style="height:' +
					form.height() +
					'px">Thank you for your inquiry. Our team will be back in touch within the next 24 hours</div>'
			);
		},
	});
};

var photoGallery = {
	exists: function () {
		return $(".gallery").length != 0;
	},
	handleImageLoader: function (container) {
		container.imagesLoaded(function () {
			container.masonry({
				columnWidth: ".grid-sizer",
				itemSelector: ".item",
				gutter: 10,
			});
			$(document).delegate(".filter-btn", "click", function (event) {
				$(this).addClass("selected").siblings().removeClass("selected");
				$(".item").parent().attr("data-gallery", "");
				var filter = $(this).data("filter");
				if (filter == "all") {
					$(".item").show().parent().attr("data-gallery", "photo-gal");
					container.masonry({
						itemSelector: ".item",
						gutter: 10,
					});
				} else {
					$(".item")
						.not("[data-filter='" + filter + "']")
						.hide();
					$(".item[data-filter='" + filter + "']")
						.show()
						.parent()
						.attr("data-gallery", "photo-gal");
					container.masonry({
						itemSelector: ".item",
						gutter: 10,
					});
				}
			});
		});
	},

	handleLightbox: function () {
		var lightbox = document.createElement("lightbox");
		if (typeof lightbox.download == "undefined") {
			$(".ekko-lightbox__modal-btn.download")
				.attr("data-toggle", "tooltip")
				.attr(
					"title",
					"This browser doesn't support quick downloads. Click 'Download' then right-click on the image and select 'Save picture as...'."
				)
				.attr("data-placement", "bottom");
			$('[data-toggle="tooltip"]').tooltip();
		}
		if (!window.addThis) {
			var addthisScript = "http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-545b4ad8528e2567";
			if (window.addthis) {
				window.addthis = null;
				window._adr = null;
				window._atc = null;
				window._atd = null;
				window._ate = null;
				window._atr = null;
				window._atw = null;
			}
			$.getScript(addthisScript, function () {
				addthis.toolbox(".addthis_sharing_toolbox");
				window.addThis = true;
			});
		}
	},

	handleSlideshow: function (slideTimer) {
		if ($(this).hasClass("off")) {
			$(this).removeClass("off").addClass("on");
			$(this).children("span").removeClass("glyphicon-play").addClass("glyphicon-pause");
			slideTimer = setInterval(function () {
				$(".ekko-lightbox-container a.glyphicon-chevron-right").trigger("click");
			}, 3000);
			$(".modal-backdrop.in").css("opacity", 0.96);
		} else {
			$(this).removeClass("on").addClass("off");
			$(this).children("span").removeClass("glyphicon-pause").addClass("glyphicon-play");
			clearInterval(slideTimer);
			$(".modal-backdrop.in").css("opacity", 0.9);
		}
	},
};

var modalManager = {
	modal: "#formModal",
	modalHeader: ".modal-header",
	modalBody: ".modal-body",
	formModal: function (elem) {
		elem.click(function (e) {
			e.preventDefault();
			var formPopUp = $(this);
			//loads form from other page
			$("#formModal .modal-body").load("" + $(this).attr("href"), function () {
				loadForm(formPopUp);
			});
			//opens modal
			$(modalManager.modal).modal();
		});
	},
	jobBoardModal: function (elem) {
		elem.click(function (event) {
			event.preventDefault();

			var contentArray = $(this).children();
			var header = [contentArray.toArray()].concat($(this).siblings().toArray());
			header.forEach(function (element) {
				$(modalManager.modalHeader).append(element.outerHTML);
			});
			$(modalManager.modalBody).append($(this).find(".jobModal__content")[0].innerHTML);
			$(modalManager.modal).modal();
		});
	},
	cleanModal: function () {
		$(modalManager.modal).on("hide.bs.modal", function () {
			$(modalManager.modalHeader).html("");
			$(modalManager.modalBody).html("");
		});
	},
};

$(document).ready(function () {
	//Clean forms on page
	cleanUpFormAssembly();

	$(".news-slides").cycle({
		slides: "> a",
		timeout: 8000,
	});
	$(".news-slides").on("cycle-after", function (e, opts, out, inc) {
		$(inc).animate(
			{
				width: "100%",
			},
			5000
		);
		$(out).animate({
			width: "10px",
		});
	});

	if ($("body").data("context") == "FMX" || $("body").data("context") == "FME") {
		// header logo
		$(window).scroll(function () {
			var distanceFromTop = $(this).scrollTop();
			// animations at 90px from top:
			if (distanceFromTop >= 90) {
				$(".navbar-brand img").css("marginTop", 0);
				$(".fade-to-pink").addClass("cta-button, pink");
			} else if (distanceFromTop <= 90) {
				$(".navbar-brand img").css("marginTop", 30);
				$(".fade-to-pink").removeClass("cta-button, pink");
			}
		});
		//---- NEWS TICKER custom scripting for FMX
		if ($("#news-ticker").length != 0) {
			var newsTextLength = 0;
			var newsItem = 0;
			var newsText = $("#news-ticker .news-item").get(newsItem).innerHTML.substr(0, 65);
			newsText = newsText + "...";
			var spanEl = $("#news-ticker #current-news-item");
			var newHref = $("#news-ticker .news-item").get(newsItem).href;
			spanEl.attr("href", newHref);

			type();
		}

		function nextItem() {
			newsItem++;
			if (newsItem >= $("#news-ticker .news-item").length) newsItem = 0;
			newsText = $("#news-ticker .news-item").get(newsItem).innerHTML.substr(0, 65);
			newsText = newsText + "...";
			setTimeout(function () {
				type();
				newHref = $("#news-ticker .news-item").get(newsItem).href;
				spanEl.attr("href", newHref);
			}, 5000);
		}

		function type() {
			spanEl.html(newsText.substr(0, newsTextLength++));
			if (newsTextLength < newsText.length + 1) {
				setTimeout(type, 40);
			} else {
				newsTextLength = 0;
				nextItem();
			}
		}
		//END of news ticker code
	}

	// Side Register sticky button
	$(".side-register").hide();

	document.addEventListener(
		"scroll",
		function (event) {
			if ($(window).scrollTop() > 200) {
				$(".side-register").show();
			} else {
				$(".side-register").hide();
			}
		},
		true
	);

	// JOB BOARD MODAL
	modalManager.jobBoardModal($(".jobModal__open"));
	// FORM MODAL
	modalManager.formModal($(".formPopUp"));
	// CLEAN MODALS
	modalManager.cleanModal();

	//PHOTO GALLERY
	if (photoGallery.exists()) {
		photoGallery.handleImageLoader($(".gallery"));

		$(document).delegate('*[data-toggle="lightbox"]', "click", function (event) {
			event.preventDefault();
			$(this).ekkoLightbox();
			photoGallery.handleLightbox();
		});

		$(document).delegate(".ekko-lightbox__modal-btn.share", "click", function () {
			$(".ekko-lightbox__modal-btn.addthis").toggle();
		});

		var slideTimer;
		$(document).delegate(".ekko-lightbox__modal-btn.slideshow", "click", function () {
			photoGallery.handleSlideshow(slideTimer);
		});
	} // PRODUCT SHOWCASE GALLERY WASN'T WORKING AS photoGallery.exists WASN'T FIRING, ELSE STATEMENT ALLOWS BOTH TO WORK
	else {
		$(document).on("click", '[data-toggle="lightbox"]', function (event) {
			event.preventDefault();
			$(this).ekkoLightbox();
		});
	}

	// Timers go year, month-1, date, hour
	// COUNTDOWN CHUNK TIMER
	var times = typeof $("#confStart").data("time") != "undefined" ? $("#confStart").data("time").split("/") : "0/0/0";
	$("#confStart").countdown({
		until: new Date(times[0], times[1] - 1, times[2], times[3]),
		timezone: 1,
		layout:
			'<div class="col-xs-4"><div class="time days"> {dn}</div></div><div class="col-xs-4"><div class="time hours"> {hn}</div></div><div class="col-xs-4"><div class="time minutes">{mn}</div></div>',
	});
	times = typeof $("#superEarlyBird").data("time") != "undefined" ? $("#superEarlyBird").data("time").split("/") : "0/0/0";
	// Super Early Bird COUNTDOWN CHUNK TIMER
	$("#superEarlyBird").countdown({
		until: new Date(times[0], times[1] - 1, times[2], times[3]),
		timezone: 1,
		layout:
			'<div class="col-xs-4"><div class="time days"> {dn}</div></div><div class="col-xs-4"><div class="time hours"> {hn}</div></div><div class="col-xs-4"><div class="time minutes">{mn}</div></div>',
	});

	// Early Bird COUNTDOWN CHUNK TIMER
	times = typeof $("#earlyBird").data("time") != "undefined" ? $("#earlyBird").data("time").split("/") : "0/0/0";
	$("#earlyBird").countdown({
		until: new Date(times[0], times[1] - 1, times[2], 0),
		timezone: 1,
		layout:
			'<div class="col-xs-4"><div class="time days"> {dn}</div></div><div class="col-xs-4"><div class="time hours"> {hn}</div></div><div class="col-xs-4"><div class="time minutes">{mn}</div></div>',
	});

	// ADD THE ARROW TO US OR EU FLAG TEXT
	(function () {
		if (window.location.href.indexOf(".eu") > -1) {
			$(".euJsArrow").prepend("> ");
		} else if (window.location.href.indexOf(".com") > -1) {
			$(".usJsArrow").prepend("> ");
		}
	})();

	// UPDATE FORM TO HAVE THANK YOU MESSAGE UPON SUBMISSION IF NOT MODAL FORMS
	$(".wFormContainer #tfa_0").submit(function (event) {
		event.preventDefault();
		sendDataFormAssembly($(this));
	});

	// -----  CAROUSEL with CTA Blocks - FOAM ONNLY -----
	var carouselTimeout;
	// set up carousel / banner CTA to change on hover
	$(".carousel-indicators li").on("mouseover", function (e) {
		// set the cta blocks to active
		$(this).addClass("active").siblings().removeClass("active");

		var index = $(this).index();
		var duration = parseFloat($(".carousel li").css("transition-duration")) * 1000;

		// change index of carousel after the user has hovered over the cta for a second (not literal second)
		clearTimeout(carouselTimeout);
		carouselTimeout = setTimeout(function () {
			$(".carousel").carousel(index);
		}, duration / 2);
	});

	//set up cta-blocks to go to link on <li> click
	$(".carousel-indicators li, .cta-blocks li:not(.scroller)").click(function (e) {
		e.preventDefault();
		var href = $(this).children("a").attr("href");
		if ($(this).children("a").attr("target") == "_blank" || href.indexOf("pdf") != -1) {
			var win = window.open(href, "_blank");
			win.focus();
		} else {
			window.location.href = href;
		}
	});
	/*##################################################################################################PREFERENCE_CENTER_CODE#################################################################################################*/

	$(".form .preference").submit(function (event) {
		event.preventDefault();
		event.stopPropagation();
		$("." + event.target.classList[1] + " .prefBoxHidden").prop("checked", true);
		var datastring = $(".preference").serializeArray();
		$("." + event.target.classList[1] + " .prefBoxHidden").remove();

		console.log("datastring  " + datastring);

		preferenceAjax(datastring, event);
	});
	$(".form #unsubscribe").submit(function (event) {
		event.preventDefault();
		var datastring = $("#unsubscribe").serializeArray();
		console.log("serialized arrau");
		console.log(datastring);
		preferenceAjax(datastring, event);
	});

	function preferenceAjax(datastring, event) {
		if (window.location.href.includes("futurevehiclesnvhsummit")) {
			let sig = { name: "SIG02857d155126ce6a246d086d293f58c681c9d08c718c7fd9a63041e76566289b", value: "" };
			datastring.push(sig);
		}
		$.ajax({
			url: "../dot-mailer",
			type: "POST",
			data: datastring,
			success: function (result) {
				//$(".prefButton").css("background-image", "url(../assets/files/assets/files/Loading_icon.gif)");
				setTimeout(function () {
					$(event.target).hide();
					$(event.target).parent().append("<p style='color: green; margin-top: 10px;'>Thank you for updating your preferences.</p>");
					console.log("SUCCESS");
					console.log(datastring);
				}, 1000);
			},
			fail: function (result) {
				console.log("FAILURE + ----" + result);
			},
		});
	}

	/**
      * ###########################################
        ###############SALESFORCE FORM#############
        ###########################################
    */
	$(".formsChunk form").submit(function (event) {
		event.preventDefault();
		var sfForm = this;
		var datastring = $(this).closest("form").serializeArray();
		console.log(sfForm);
		let redirectToAsset, redirecturl;

		/* Gated content check */
		let isGated = datastring.find(function (el) {
			return el.name == "gated";
		});
		console.log(isGated);
		if (isGated != undefined) {
			if (isGated.value == "true") {
				redirecturl = datastring.find(function (el) {
					return el.name == "gatedUrl";
				}).value;
				redirectToAsset = true;
			}
		}
		console.log($(this).closest("form").serializeArray());
		$.ajax({
			url: "../sfForm",
			type: "POST",
			data: datastring,
			success: function (result) {
				if (redirectToAsset) {
					window.open(redirecturl);
				}
				$(sfForm).parent().append("<h3 class='sfForm__thanks'>Thank you.  Your query has been successfully submitted.</h3>");
				$(sfForm).hide();
			},
		});
	});
});
