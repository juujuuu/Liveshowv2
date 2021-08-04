$(document).ready(function () {
	/**
	 * Destroy modals on exit
	 */
	$("body").on("hidden.bs.modal", "#modal", function (event) {
		console.log("Leaving modal");
		let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
		modal.dispose();
		$("#modal").remove();
	});

	/**
	 * Pop up forms
	 */
	 $("body").on("click", ".image--form-modal, .curved-cta--form-modal, .nav-item--reg-link.nav-item--reg-link--pop, .pop-form", function (event) {
		event.preventDefault();
		let formUri = $(this).children("a").attr("href");
		getForm(formUri).then(function (formHtml) {
			let modal = $.parseHTML(
				'<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"></div></div></div></div>'
			);
			$(modal).find(".modal-body").append(formHtml);
			$("body").append(modal);
			let myModal = new bootstrap.Modal(document.getElementById("modal"));
			myModal.show();
		}); 
	 });	

	/**
	 * Confman reg interest
	 */
	$("#root").on("click", ".confman__cta.confman__cta--reg-pop", function (event) {
		event.preventDefault();
		let formUri = $(this).children("a").attr("href");
		getForm(formUri).then(function (formHtml) {
			let modal = $.parseHTML(
				'<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"></div></div></div></div>'
			);
			$(modal).find(".modal-body").append(formHtml);
			$("body").append(modal);
			let myModal = new bootstrap.Modal(document.getElementById("modal"));
			myModal.show();
		}); 
	});

	/**	 
	 * Exhib contact requests
	 */
	 $(document).on("click", ".exhib-contact-cta", function (event) {
		event.preventDefault();
		let campaignid = $(this).attr("campaignid");
		let exhibName = $(this).attr("name");
		let sfEvent = $(this).attr("sfevent");
		let boothid = $(this).attr("boothid");

		let formMarkup = `<div class="lead-capture ">
		<form class="Enquiry" name="sfform" method="POST" data-url="" data-boothid="${boothid}">
			<input id="Campaign_ID" name="Campaign_ID" value="${campaignid}" type="hidden" >
			<div class="form-group">
				<div class="inputWrapper mb-3">
					<input
						id="first_name"
						type="text"
						name="first_name"
						value=""
						placeholder="First Name"
						title="First Name"
						required=""
						class="required form-control"
					>
				</div>
				<div class="inputWrapper mb-3">
					<input
						id="last_name"
						type="text"
						name="last_name"
						value=""
						placeholder="Last Name"
						title="Last Name"
						required=""
						class="required form-control"
					>
				</div>
				<div class="inputWrapper mb-3">
					<input
						id="email"
						type="email"
						name="email"
						value=""
						placeholder="Email"
						title="Email"
						required=""
						class="required form-control"
					>
				</div>
				<div class="inputWrapper mb-3">
					<input
						id="company"
						type="text"
						name="company"
						value=""
						placeholder="Company"
						required=""
						title="Company"
						class="required form-control"
					>
				</div>
				<div class="inputWrapper mb-3">
					<input
						id="title"
						type="text"
						name="title"
						value=""
						placeholder="Job Title"
						required=""
						title="Job Title"
						class="required form-control"
					>
				</div>
				<div class="inputWrapper mb-3">
					<input
						id="phone"
						type="phone"
						name="phone"
						value=""
						placeholder="Phone Number"
						title="Phone number"
						class="form-control"
					>
				</div>

				<div class="inputWrapper mb-3">
					<textarea
						id="Inquiry_Notes__c"
						type="text"
						name="Inquiry_Notes__c"
						value=""
						placeholder="Details of Inquiry"
						title="Details of inquiry"
						required=""
						class="required form-control"></textarea>
				</div>

				<input type="hidden" id="00N3A00000Crbmu" class="GACLIENTID" name="00N3A00000Crbmu" value="clientID" >
				<input type="hidden" id="00N3A00000Crbmz" class="GAUSERID" name="00N3A00000Crbmz" value="userID" >
				<input type="hidden" id="00N3A00000Crbn4" class="GATRACKID" name="00N3A00000Crbn4" value="trackingID" >
			</div>
			<input type="hidden" name="00N30000004mdGe" id="00N30000004mdGe" value="${sfEvent}" >
			<button type="submit" name="submit" class="curved-cta curved-cta--micro curved-cta--cex-red mb-3">
				<a class="curved-cta__link">Submit</a>
			</button>
		</form>
		<p class="lead-capture__disclaimer" style="font-size: 12px;">
			<i>
				View our <a style="font-weight: bold;" href="site/privacy-policy" target="_blank">privacy policy</a> to understand how we collect, protect and manage your personal information
			</i>
		</p></div>`;

		let modal = $.parseHTML(
			`<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3>${exhibName}</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p class="mb-1" style="padding: 8px;">Please complete the below form giving as much detail as you can to your request. ${sfEvent} will relay this on to the exhibitor on your behalf.</p><p style="color: red; padding: 8px;" class="mb-1">The purpose of this form is to request further information on the exhibitor’s goods, capabilities or services. Messages will be reviewed by ${sfEvent} and solicitation or off topic messages will not be forwarded.</p></div></div></div></div>`
		);

		$(modal).find(".modal-body").append(formMarkup);
		$("body").append(modal);

		let myModal = new bootstrap.Modal(document.getElementById("modal"));
		myModal.show();
	});

	/**
	 * Get form html from modx resource
	 */
	const getForm = async (uri) => {
		let promise = new Promise(function (resolve, reject) {
			$.ajax({
				url: uri,
				success: function (data) {
					$.parseHTML(data);
					let formHtml = $(data).find(".lead-capture");
					resolve(formHtml);
				},
			});
		});
		return await promise;
	};

	/**
	 * Salesforce form v2
	 */
	$("body").on("submit", ".lead-capture form", function (event) {
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
							let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
							modal.hide();
						}, 2000);
					} else {
						let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
						modal.hide();
						window.open(gatedUrl);
					}
				}, 3000);
			},
		});
	});
});
