import axios from "axios";
const fetchExhibTasksStatus = async booth => {
    const api = axios.create({
        baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
    });
    let response = await api.get(`../rest/getCompletedTasks.php?booth=${booth}`);
    console.log("Response from getCompletedTasks.php", response.data);
    return response.data;
};

export { fetchExhibTasksStatus };
