import axios from "axios";
const fetchExhibTasksStatus = async booth => {
    const api = axios.create({
    // For testing change the fetch to the foam 
    //    baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
       baseURL: "/rest",
    });
    let response = await api.get(`../rest/getCompletedTasks.php?booth=${booth}`);
    //console.log("Response from getCompletedTasks.php", response.data);
    return response.data;
};

export { fetchExhibTasksStatus };

