import axios from "axios";
const fetchExpoTasks = async (expo) => {
    const api = axios.create({
        baseURL: `http://context1.ceramicsexpo.co/rest`,
    });
    let response = await api.get(`/getExhibtasks.php?expo=${expo}`);
    return response.data;
};

export { fetchExpoTasks };
