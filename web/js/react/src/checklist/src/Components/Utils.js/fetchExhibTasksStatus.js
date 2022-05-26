import axios from "axios";
const fetchExhibTasksStatus = async (booth) => {
    const api = axios.create({
        baseURL: `http://context1.ceramicsexpo.co/rest`,
    });
    let response = await api.get(`../rest/getCompletedTasks.php?booth=${booth}`);
    return response.data;
};

export { fetchExhibTasksStatus };
