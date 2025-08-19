// /**
//  * Basically a container for all web to lead form and modal logic.
//  * Some parts are dependant on the bootstrap js being loaded before the custom bundle in the DOM  IE bits referencing the bootstrap object.
//  */
$(document).ready(function () {

// generate captcha
function generateCaptcha(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

//default captcha
$('.dynamic-code').text(generateCaptcha(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));

$('.captcha-reload').on('click', function () {
    $('.dynamic-code').text(generateCaptcha(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
});


// $('#captcha-form-group').hide()
$("#root").on(".inputWrapper", function (event) {
    $('#captcha-form-group').show
});


//check captcha
$('#captcha-input').on('change', function () {
    if($(this).val() != $('.dynamic-code').text()){
        $('#errCaptcha').html('<span style="color: red;"><i class="ion-close"></i> Captecha not matched.</span>');
        $(this).val('');
    }else {
        $('#errCaptcha').html('');
    }
});
})


import _formMarkup from "./FormMarkup";

$(document).ready(function () {
    /**
     * Destroy modals on exit.
     * Creates a listener for modal hide events, then runs a bootstrap callback to remove them from the DOM.
     */
    $("body").on("hidden.bs.modal", "#modal", function (event) {
        console.log("Leaving modal");
        let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
        modal.dispose();
        $("#modal").remove();
    });

    /**
     * Pop up forms
     * Creates a listener for clicks on the class list specified IE '.curved-cta--form-modal', and creates a modal popup.
     * First looks for an anchor link in the child of the event target and rips the url from it, then uses the getForm
     * function to return some form html, then splices this form html into a modal which is then displayed.
     */
    $("body").on("click", ".image--form-modal, .curved-cta--form-modal, .nav-item--reg-link.nav-item--reg-link--pop, .pop-form", function (event) {
        event.preventDefault();
        let formUri = $(this).children("a").attr("href");
        getForm(formUri).then(function (formHtml) {
            let modal = $.parseHTML(
                '<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"></div></div></div></div>'
            ); //Modal boilerplate
            $(modal).find(".modal-body").append(formHtml); //Inject form html in '.modal-body'
            $("body").append(modal); //Add the html string to the DOM.
            let myModal = new bootstrap.Modal(document.getElementById("modal")); //Convert to boostrap modal object, then show.
            myModal.show();
        });
    });

    /**
     * Confman reg interest, download pdf
     * Pretty much the same as the above, but for popup ctas in Confman.
     */
    $("#root").on("click", ".react__cta.react__cta--reg-pop", function (event) {
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
     * Again, similar to the above.  Here we are stripping some of the data we need from the cta first and putting that into a custom form markup before adding to a modal.
     */
    $(document).on("click", ".exhib-contact-cta", function (event) {
        event.preventDefault();
        let campaignid = $(this).attr("campaignid");
        let exhibName = $(this).attr("name");
        let sfEvent = $(this).attr("sfevent");
        let boothid = $(this).attr("boothid");

        let formMarkup = _formMarkup(campaignid, boothid, sfEvent);

        let modal = $.parseHTML(
            `<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3>${exhibName}</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p class="mb-1" style="padding: 8px;">Please complete the below form giving as much detail as you can to your request. ${sfEvent} will relay this on to the exhibitor on your behalf.</p><p style="color: red; padding: 8px;" class="mb-1">The purpose of this form is to request further information on the exhibitor’s goods, capabilities or services. Messages will be reviewed by ${sfEvent} and solicitation or off topic messages will not be forwarded.</p></div></div></div></div>`
        );

        $(modal).find(".modal-body").append(formMarkup);
        $("body").append(modal);

        let myModal = new bootstrap.Modal(document.getElementById("modal"));
        myModal.show();
    });

    /**
     * Get form html from modx resource.
     * Creates a promise for an ajax call.  When the ajax returns, use JQuery to take form data out.
     * (Async functions also return a promise)
     */
    const getForm = async uri => {
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
     * Web to Lead form submitter function -> submits form data to custom end point which sanitises, and sends that on to salesforce.
     */
    $("body").on("submit", ".lead-capture form", function (event) {
        event.preventDefault();
        const sfForm = $(this); //The form DOM node

        let gatedUrl = sfForm.data("url");
        const redirect = gatedUrl != "";

        console.log("Sf form submission: ", sfForm.serializeArray());
        let dataString = sfForm.serializeArray();
        let parent = $(this).parent(); //Get form container
        //Load spinner
        $(this).css("visibility", "hidden");
        $(this).siblings().css("visibility", "hidden"); //The disclaimer part of the form

        let spinner = '<div class="lead-capture__spinner d-flex justify-content-center"><div class="spinner-border"><span class="sr-only"></span></div></div>';
        parent.append(spinner);

        $.ajax({
            url: "./connectors/custom/webtolead.php",
            type: "POST",
            data: dataString,
            success: function (result) {
                //Run the tidy up code after 3 seconds.
                setTimeout(() => {
                    console.log(result);
                    parent.children().css("visibility", "hidden");
                    parent.children(".lead-capture__spinner").hide(); //Hide the spinner
                    let thankyou 
                    
 
                    

switch (window.location.href) {
  case "https://www.foam-expo.com/2026-register-your-interest":
    thankyou  = '<div class="lead-capture__thankyou d-flex justify-content-center"><p>Successfully submitted.  Thank you</p> <p>While you wait for registration to open, <b>secure your hotel</b> now and lock in the best rates and availability. Don’t miss out—rooms go fast!Link to hotel page</p> <p><a href="">link</a> </p</div>';

    break;
  case "Tuesday":
    console.log("Second day of the work week.");
    break;
  case "Wednesday":
    console.log("Midweek already!");
    break;
  case "Thursday":
    console.log("Almost there.");
    break;
  case "Friday":
    console.log("Weekend is near!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend!");
    break;
  default:
    // thankyou  = '<div class="lead-capture__thankyou d-flex justify-content-center"><p>Successfully submitted.  Thank you</p></div>';
    console.log("no ")
}
parent.append(thankyou); //Add the thank you message.

                    if (!redirect) {
                        //Get rid of any modals in case the form was a modal after 2 seconds.
                        setTimeout(() => {
                            let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
                            if (modal) {
                                modal.hide();
                            }
                        }, 2000);
                    } else {
                        //Get rid of the modal immediately, then open the gated url.
                        let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
                        if (modal) {
                            modal.hide();
                        }
                        window.open(gatedUrl);
                    }
                }, 3000);
            },
        });
    });


 






});
