/**
 *
 * @param {Object} config - Optional configuration object.
 */
const getModal = ({ data = {}, options = {}, role = false, size = "lg", odcode = "" }) => {
    //Base modal code
    let modal = $.parseHTML(
        `<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true" ${
            role == "on-demand-modal" ? `data-bs-backdrop="static" data-bs-keyboard="false"` : ""
        }><div class="modal-dialog modal-${size}"><div class="modal-content"><div class="modal-header">${
            role == "on-demand-modal" ? `` : `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        }</div><div class="modal-body"></div></div></div></div>`
    );

    /* role is basically for what type of modal we're using. */
    if (role == false) {
        console.error("Role on getModal not set");
    } else if (role == "speaker-modal") {
        //For the speaker list
        const { speakerAgendaLinks, fullagendalocation, show } = options;
        let sessionsHtml;

        //Make a list of sessions the speaker is on then add in to the modal html.
        data.sessions.forEach(({ id, day, Conference__c, name }) => {
            let link = `${fullagendalocation}?session-id=${id}&day=${day}`;
            // if (Conference__c === "a3i4V000001tXtnQAE") {
                //it might need the 18 letters id instead of 15
            if (Conference__c === "a3i4V0000016NNJ") {
                
                link =
                    show === "FMX"
                        ? `https://www.foam-expo.com/conference/solutions-innovation-stage?session-id=${id}&day=${day}`
                        : `https://www.adhesivesandbondingexpo.com/conference/solutions-innovation-stage?session-id=${id}&day=${day}`;
            } else if (Conference__c === "What ever the sf id of the solutions innovation agenda ends up being") {
                link =
                    show === "FME"
                        ? `https://www.foam-expo.com/conference/solutions-innovation-stage?session-id=${id}&day=${day}`
                        : `https://www.adhesivesandbondingexpo.com/conference/solutions-innovation-stage?session-id=${id}&day=${day}`;
            }
            sessionsHtml = `<p><a href="${link}" title="${name}">${name}</a></p>`;
        });

        const { Head_Shot_URL__c, Last_Name__c, First_Name__c, Job_Title__c, Company__c, Speaker__r } = data;
        const { web_logo_url__c, Biography__c } = Speaker__r;

        let modalBody = `<div class="container"><div class="row"><div class="col-12 col-md-2"><img src="${Head_Shot_URL__c}" class="img-fluid" alt="${First_Name__c} ${Last_Name__c}" /></div><div class="col-12 col-md-6"><p style="font-weight: bold;">${First_Name__c} ${Last_Name__c},</p><p>${Job_Title__c},</p><p style="font-weight: bold;">${Company__c}</p></div><div class="col-12 col-md-4"><img src="${web_logo_url__c}" class="img-fluid" alt="${Company__c}" /></div></div><div class="row"><div class="col-12"><h3 style="margin-top: 10px;">Speaker Bio</h3><p>${
            Biography__c == null ? `<i>Coming soon</i>` : Biography__c
        }</p>${speakerAgendaLinks ? `<h3>Speaking at:</h3><div class="sessions">${sessionsHtml}</div>` : ``}</div></div></div>`;

        $(modal).find(".modal-body").append(modalBody);
        $("body").append(modal);

        let myModal = new bootstrap.Modal(document.getElementById("modal"));
        myModal.show();
    } else if (role == "on-demand-modal") {
        /* The challangy modal for the on demand content */
        let modalBody = `<div id="od-modal" class="container"><div class="row"><div class="col-12">			<h2>Enter your access code to view the conference on demand sessions</h2><form><div class="form-group"><div class="inputWrapper mb-3"><input id="code" type="code" name="code" value="" placeholder="Enter code" title="code" required="" class="required form-control"></div></div><button class="curved-cta curved-cta--micro curved-cta--cex-red mb-3" type="submit" name="submit">Access Sessions</button></div></form></div></div><script>$(document).ready(function(){$("#root").css("filter", "blur(4px)"); $("#root").css("transition", "1s -webkit-filter linear"); const urlParams = new URLSearchParams(window.location.search);if(urlParams.get('code').trim() !== "" && urlParams.get('code') !== null){console.log(urlParams.get('code'));$("#od-modal #code").val(urlParams.get('code'));}});$("#od-modal form").submit(function(){event.preventDefault();if($("#od-modal #code").val().includes("${odcode}")){			bootstrap.Modal.getInstance(document.getElementById("modal")).hide();$("#root").css("filter", "");} else{if($("#code-error").length < 1){$("#od-modal .inputWrapper").append('<span id="code-error" style="color: red; font-style: italic;">Code is incorrect please contact conferences@smartershows.com for more information</span>');}}});</script>`;

        $(modal).find(".modal-body").append(modalBody);
        $("body").append(modal);

        let myModal = new bootstrap.Modal(document.getElementById("modal"), { backdrop: "static", keyboard: false });
        myModal.show();
    }
};

export default getModal;
