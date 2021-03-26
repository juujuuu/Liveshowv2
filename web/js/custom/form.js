$(document).ready(function () {

	/**
	 * Destroy modals on exit
	 */
	$("body").on("hidden.bs.modal", "#modal", function(event){
		console.log("Leaving modal");
		let modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
		modal.dispose();
		$("#modal").remove();
	});

	/**
	 * Pop up forms
	 */
	$(".image--form-modal a, .curved-cta--form-modal a, .nav-item--reg-link a").click(function (event) {
		event.preventDefault();
		let formUri = $(this).attr("href");
		getForm(formUri).then(function(formHtml){
			let modal = $.parseHTML('<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"></div></div></div></div>');
			$(modal).find(".modal-body").append(formHtml);
			$("body").append(modal);
			let myModal = new bootstrap.Modal(document.getElementById('modal'));
			myModal.show();
		});
	});

	/**
	 * Get form html from modx resource
	 */
	const getForm = async (uri) => {
		let promise = new Promise(function(resolve, reject){
			$.ajax({ 
				url: uri, 
				success: function (data) {
					$.parseHTML(data);
					let formHtml = $(data).find(".lead-capture");
					resolve(formHtml);
				} 
			});
		});
		return await promise;
	};

	/**
	 * Salesforce form v2
	 */
	$("body").on("submit", ".lead-capture form", function(event){
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
						setTimeout(() => {
							let modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
							modal.hide();
						}, 2000);
					} else {
						window.open(gatedUrl);
					}
				}, 3000);
			},
		});
	});
});
