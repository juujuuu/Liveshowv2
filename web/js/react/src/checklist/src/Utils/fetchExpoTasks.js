import axios from "axios";
const fetchExpoTasks = async expo => {
    const api = axios.create({
        // For testing change the fetch to the foam 
        //baseURL: `https://foam-adhesives.exhibitorportal-smartershows.com/rest`,
        baseURL: "/rest",
        
    });
    let response = await api.get(`/getExhibtasks.php?expo=${expo}`);
   // console.log("Response from getExhibtasks.php", response.data);
    return response.data;
};

export { fetchExpoTasks };

