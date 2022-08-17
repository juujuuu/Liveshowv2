import axios from "axios";
const pushTaskStatus = async ({ Instructions__c, Id, Deadline__c, Update_Method__c, status, booth, task_status_field_name__c: fieldname }) => {
    const api = axios.create({
        baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
    });
    console.log("Mega flare", status);
    let statusTimestamp = status === "COMPLETED" ? null : "STAMP";
    if (fieldname === "auto_ep_task_order_lead_retrieval__c") {
        statusTimestamp = statusTimestamp === null ? false : true;
    }
    const postData = {
        Id,
        booth,
        fieldname,
        status: statusTimestamp,
    };
    console.log("Sending", postData);
    let response = await api.post(`/setExhibTask.php`, postData);
    console.log("Response from pushTaskStatus.php", response.data);
    return response.data;
};

export { pushTaskStatus };
