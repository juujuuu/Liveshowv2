import axios from "axios";

/**
 *
 * @param {string} site - The site to use as a root (axios won't let you just use a relative url annoyingly)
 * @returns an initialised axios object
 */
const createAPI = site => {
    return axios.create({
        baseURL: `${site}/rest`,
    });
};
export default createAPI;
