import axios from "axios";
const pushTaskStatus = async ({ Instructions__c, Id, Deadline__c, Update_Method__c, status, booth, task_status_field_name__c: fieldname }) => {
    let statusTimestamp = status === "COMPLETED" ? null : "STAMP";
    if (fieldname === "auto_ep_task_order_lead_retrieval__c" ) {
        statusTimestamp = statusTimestamp === null ? false : true;
    }
    
    const postData = {
        Id,
        booth,
        fieldname,
        status: statusTimestamp,
    };
    //console.log("Sending", postData);
    // For testing change the fetch to the foam 
    // let response = await fetch("https://foam-adhesives.exhibitorportal-smartershows.com/rest/setExhibTask.php", {
    let response = await fetch( "/rest/setExhibTask.php", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(postData),
    });    

    response = await response.text();

   // console.log("Response from pushTaskStatus.php", response);
    return response;
};

export { pushTaskStatus };
