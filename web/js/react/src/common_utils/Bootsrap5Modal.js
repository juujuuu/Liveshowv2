import { getShowNameFromId } from "../exhibman_v2/src/Utils/GetShow";

/**
 * A utility function for making Bootstrap 5 modals in Web apps.
 * @param {Object} payload
 * @param {String} role - What's the purpose of this modal ('speaker-modal', 'contact-exhibitor', on-demand-modal)
 * @param {String} size - Modal size.
 * @returns BS 5 Modal
 */
export default function fireModal(payload = false, role = false, size = "md") {
    function getHeader(role, payload) {
        if (role == "speaker-modal") {
            return "";
        } else if ("contact-exhibitor") {
            return `<h3>${payload.pagetitle}</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        } else if ("on-demand-modal") {
            return `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        }
    }
    function getBackdrop(role) {
        if (role == "speaker-modal") {
            return ``;
        } else if ("contact-exhibitor") {
            return ``;
        } else if ("on-demand-modal") {
            return `data-bs-backdrop="static data-bs-keyboard="false"`;
        }
    }
    if (!role) {
        console.error("Modal role not set");
        return;
    }

    let modalHTML = $.parseHTML(
        `<div class="modal fade" id="modal" role="dialog" tabindex="-1" aria-hidden="true" ${getBackdrop(
            role
        )}><div class="modal-dialog modal-${size}"><div class="modal-content"><div class="modal-header">${getHeader(
            role,
            payload[0]
        )}</div><div class="modal-body"></div></div></div></div>`
    );
    function test(){
        alert ('hi')
    }
    let myModal, sessionsHtml, modalBody;
    switch (role) {
        case "speaker-modal":
            //payload [0] = speaker data, payload [1] on demand link
            const agendaLink = payload[1];
            const { Head_Shot_URL__c, First_Name__c, Last_Name__c, Job_Title__c, Logo_URL__c, Company__c } = payload[0];
            const { Biography__c } = payload[0].Speaker__r;

            payload.sessions.forEach(session => {
                const { name, day, id } = session;
                let link = `${agendaLink}?session-id=${id}&day=${day}`;
                sessionsHtml = `<p><a href="${link}" title="${name}">${name}</a></p>`;
            });
            modalBody = `<div class="container"><div class="row"><div class="col-12 col-md-2"><img src="${Head_Shot_URL__c}" class="img-fluid" alt="${First_Name__c} ${Last_Name__c}" /></div><div class="col-12 col-md-6"><p style="font-weight: bold;">${First_Name__c} ${Last_Name__c},</p><p>${Job_Title__c},</p><p style="font-weight: bold;">${Company__c}</p></div><div class="col-12 col-md-4"><img src="${Logo_URL__c}" class="img-fluid" alt="${Company__c}" /></div></div><div class="row"><div class="col-12"><h3 style="margin-top: 10px;">Speaker Bio</h3><p>${
                Biography__c == null ? `<i>Coming soon</i>` : Biography__c
            }</p><h3>Speaking at:</h3><div class="sessions">${sessionsHtml}</div></div></div></div>`;
            $(modalHTML).find(".modal-body").append(modalBody);
            $("body").append(modalHTML);exhibitor
            myModal = new bootstrap.Modal(document.getElementById("modal"));
            break;
        case "contact-exhibitor": 
            //payload [0] = exhibitor data, payload [1] campaign id
            const { pagetitle, id, Expo__c } = payload[0];
            console.log(payload);
            modalBody = `<div id="od-modal" class="container">   <div class="row"> <div class="col-12">  <p class="mb-1" style="padding: 8px">   Please complete the below form giving as much detail as you can to your request. ${getShowNameFromId(
                Expo__c
            )} will relay this on to the exhibitor on your behalf.  </p>  <p class="mb-1" style="color: red; padding: 8px">   The purpose of this form is to request further information on the exhibitor’s goods, capabilities or services. Messages will be reviewed by ${getShowNameFromId(
                Expo__c
            )} and solicitation or off topic messages will not be forwarded.  </p>  <div class="lead-capture">   <form class="Enquiry" name="sfform" method="POST" data-url="" data-boothid="${id}">    <input id="Campaign_ID" name="Campaign_ID" value="${
                payload[1]
                //booth Contact Exhibitor form
            }" type="hidden" />    <div class="form-group">  <div class="inputWrapper mb-3">   <input    id="first_name"    type="text"    name="first_name"    value=""    placeholder="First Name"    title="First Name"    required=""    class="required form-control"   />  </div>  <div class="inputWrapper mb-3">   <input    id="last_name"    type="text"    name="last_name"    value=""    placeholder="Last Name"    title="Last Name"    required=""    class="required form-control"   />  </div>  <div class="inputWrapper mb-3">   <input    id="email"    type="email"    name="email"    value=""    placeholder="Email"    title="Email"    required=""    class="required form-control"   />  </div>  <div class="inputWrapper mb-3">   <input    id="company"    type="text"    name="company"    value=""    placeholder="Company"    required=""    title="Company"    class="required form-control"   />  </div>  <div class="inputWrapper mb-3">   <input    id="title"    type="text"    name="title"    value=""    placeholder="Job Title"    required=""    title="Job Title"    class="required form-control"   />  </div>  <div class="inputWrapper mb-3">   <input    id="phone"    type="phone"    name="phone"    value=""    placeholder="Phone Number"    title="Phone number"    class="form-control"   />  </div>  <div class="inputWrapper mb-3">   <textarea    id="Inquiry_Notes__c"    type="text"    name="Inquiry_Notes__c"    value=""    placeholder="Details of Inquiry"    title="Details of inquiry"    required=""    class="required form-control"   ></textarea>  </div>    <input type="hidden" id="00N3A00000Crbmu" class="GACLIENTID" name="00N3A00000Crbmu" value="clientID" />  <input type="hidden" id="00N3A00000Crbmz" class="GAUSERID" name="00N3A00000Crbmz" value="userID" />  <input type="hidden" id="00N3A00000Crbn4" class="GATRACKID" name="00N3A00000Crbn4" value="trackingID" />    </div>    <input type="hidden" name="00N30000004mdGe" id="00N30000004mdGe" value="${getShowNameFromId(
                Expo__c
            )}" />    <button id="contact_exhibitor_submit"  type="submit" name="submit" class="curved-cta curved-cta--micro curved-cta--cex-red mb-3">  <a class="curved-cta__link">Submit</a>    </button>   </form>   <p class="lead-capture__disclaimer" style="font-size: 12px">    <i>  View our <a style="font-weight: bold" href="site/privacy-policy" target="_blank">privacy policy</a> to understand how we  collect, protect and manage your personal information    </i>   </p>  </div> </div>   </div>  </div>  `;
          $(modalHTML).find(".modal-body").append(modalBody);
            $("body").append(modalHTML);
            myModal = new bootstrap.Modal(document.getElementById("modal"));

            //Append message before sending the form info
            const firstName=document.getElementById("first_name")
            const lastName=document.getElementById("last_name")
            const email=document.getElementById("email")
            const company=document.getElementById("company")
            const title=document.getElementById("title")  
            const inquiry=document.getElementById("Inquiry_Notes__c")
            const  message=`WOULD LIKE TO CONTACT:\n${pagetitle}  `
            document.getElementById("contact_exhibitor_submit").addEventListener("click",()=>{
               if(
               firstName.value.trim() 
               != "" && lastName.value.trim() 
               != "" && email.value.trim()  
               != "" && company.value.trim() 
               != "" && title.value.trim() 
               != "" && inquiry.value.trim() != "" ){
            inquiry.value= message+ inquiry.value
               
               }else{
                 null
               }
            })
            break;
        case "on-demand-modal":
            //payload ondemandcode
            modalBody = `<div id="od-modal" class="container"><div class="row"><div class="col-12"><h2>Enter your access code to view the conference on demand sessions</h2><form><div class="form-group"><div class="inputWrapper mb-3"><input id="code" type="code" name="code" value="" placeholder="Enter code" title="code" required="" class="required form-control"></div></div><button class="curved-cta curved-cta--micro curved-cta--cex-red mb-3" type="submit" name="submit">Access Sessions</button></div></form></div></div><script>$(document).ready(function(){$("#root").css("filter", "blur(4px)"); $("#root").css("transition", "1s -webkit-filter linear"); const urlParams = new URLSearchParams(window.location.search);if(urlParams.get('code').trim() !== "" && urlParams.get('code') !== null){console.log(urlParams.get('code'));$("#od-modal #code").val(urlParams.get('code'));}});$("#od-modal form").submit(function(){event.preventDefault();if($("#od-modal #code").val().includes("${payload}")){bootstrap.Modal.getInstance(document.getElementById("modal")).hide();$("#root").css("filter", "");} else{if($("#code-error").length < 1){$("#od-modal .inputWrapper").append('<span id="code-error" style="color: red; font-style: italic;">Code is incorrect please contact conferences@smartershows.com for more information</span>');}}});</script>`;
            $(modalHTML).find(".modal-body").append(modalBody);
            $("body").append(modalHTML);
            myModal = new bootstrap.Modal(document.getElementById("modal"), { backdrop: "static", keyboard: false });
            break;
        default:
            break;
    }
    myModal.show();
    
}
