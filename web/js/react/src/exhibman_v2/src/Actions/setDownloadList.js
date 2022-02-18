const setDownloadList = (id, size) => {
	/* Size -> HIGH or LOW */
	return {
		type: "SET_DOWNLOAD_LIST",
		payload: {id, size},
	};
};

export default setDownloadList;
