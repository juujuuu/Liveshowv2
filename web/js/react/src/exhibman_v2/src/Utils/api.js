import axios from "axios";
/**
 * API setup utility
 * @param {string} site - The base url for endpoints.
 * @returns an initialised instance of axios.
 */
const createAPI = site => {
    return axios.create({
        baseURL: site,
    });
};
export default createAPI;
