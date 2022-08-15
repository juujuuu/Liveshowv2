import axios from "axios";
const pushTaskStatus = async ({ Instructions__c, Id, Deadline__c, Update_Method__c, status, booth, task_status_field_name__c }) => {
    const api = axios.create({
        baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
    });
    let response = await api.post(`/setExhibTask.php`, {
        Id,
        booth,
        fieldname: task_status_field_name__c,
        status,
    });
    console.log("Response from pushTaskStatus.php", response.data);
    return response.data;
};

export { pushTaskStatus };
