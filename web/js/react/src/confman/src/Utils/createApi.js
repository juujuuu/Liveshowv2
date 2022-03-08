import axios from "axios";

const createAPI = site => {
	return axios.create({
		baseURL: `${site}/rest`,
	});
};
export default createAPI;
