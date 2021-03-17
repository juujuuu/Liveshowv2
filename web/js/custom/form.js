var loadForm = function (formPopUp) {
	//sets submit event to new form

	$("#formModal form").submit(function (event) {
		event.preventDefault();
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
				}
				$("#formModal").modal("hide");
			},
		});
	});
};

$(document).ready(function () {
	/**
	 * Salesforce form v2
	 */
	$(".lead-capture form").submit(function (event) {
		event.preventDefault();
		const sfForm = $(this);
		let gatedUrl = sfForm.data("url");
		let redirect = false;
		console.log(`Gated url: ${gatedUrl}`);
		if (gatedUrl != "") {
			redirect = true;
		}
		console.log("Sf form submission");
		console.log("Values: ");
		console.log(sfForm.serializeArray());
		let dataString = sfForm.serializeArray();
		let parent = $(this).parent();
		console.log("Parent:  ");
		console.log(parent);
		//Load spinner
		$(this).css("visibility", "hidden");
		$(this).siblings().css("visibility", "hidden"); //the disclaimer
		let spinner =
			'<div class="lead-capture__spinner d-flex justify-content-center"><div class="spinner-border"><span class="sr-only"></span></div></div>';
		parent.append(spinner);

		$.ajax({
			url: "./connectors/custom/webtolead.php",
			type: "POST",
			data: dataString,
			success: function (result) {
				setTimeout(() => {
					console.log(result);
					if (!redirect) {
						parent.children().css("visibility", "hidden");
						parent.children(".lead-capture__spinner").hide();
						let thankyou =
							'<div class="lead-capture__thankyou d-flex justify-content-center"><p>Successfully submitted.  Thank you</p></div>';
						parent.append(thankyou);
					} else{
						window.open(gatedUrl);
					}
				}, 3000);
			},
		});
	});
});
