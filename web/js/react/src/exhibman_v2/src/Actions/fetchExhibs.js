import createAPI from "../Utils/api";

const fetchExhibs = (site, expos) => async dispatch => {
	const api = createAPI(site);
	let response = await api.get(`/rest/exhibman.php?expos=${expos}`);
	let { data } = response;
	console.log("FETCH EXHIBS:", `/rest/exhibman.php?expos=${expos}`)
	data.sort((a, b) =>{
		if(a.pagetitle < b.pagetitle){
			return -1;
		}
		if(a.pagetitle < b.pagetitle){
			return 1;
		}
		return 0;
	});
	dispatch({ type: "FETCH_EXHIBS", payload: data });
};

export default fetchExhibs;
