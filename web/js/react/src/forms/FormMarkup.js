export default (campaignid, boothid, sfEvent) => {
    return `<div class="lead-capture ">
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
};
