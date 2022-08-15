import axios from "axios";
const fetchExpoTasks = async expo => {
    const api = axios.create({
        baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
    });
    let response = await api.get(`/getExhibtasks.php?expo=${expo}`);
    console.log("Response from getExhibtasks.php", response.data);
    return response.data;
};

export { fetchExpoTasks };
