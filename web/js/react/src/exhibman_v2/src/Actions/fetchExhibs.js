// import createAPI from "../Utils/api";

// /**
//  * Async action creator to for getting exhibitors.
//  * @param {String} site - url to use as the endpoint.
//  * @param {String} expos - String of expos.
//  */
// const fetchExhibs = (site, expos) => async dispatch => {
//     const api = createAPI(site);
//     let { data } = await api.get(`/rest/exhibman.php?expos=${expos}`);

//     //Alphabetical sort
//     data.sort((a, b) => {
//         if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
//             return -1;
//         }
//         if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
//             return 1;
//         }
//         return 0;
//     });
//     dispatch({ type: "FETCH_EXHIBS", payload: data });
// };

// export default fetchExhibs;

import createAPI from "../Utils/api";

/**
 * Async action creator to for getting exhibitors.
 * @param {String} site - url to use as the endpoint.
 * @param {String} expos - String of expos.
 */
const fetchExhibs = (site, expos) => async dispatch => {
    const api = createAPI(site);
    // console.log(expos,"expooooo")
    let call,getObj
    if(expos==="'chinaExhibitorList'"){
    //    console.log(getObj,"get obj")
       getObj= await api.get(`https://foamexpochina.expotec.tech/exhibitor/Api/Home/QuerySysExhibitors`); 
       var {data}=getObj
       let {exhibitors}=data
       data=exhibitors
       console.log(getObj,"getj ob")
    
 data.map(el=>{
       
el['id']=el['exhibitorId'];
el['content']=el['companyDescriptionEn'];
el['logo']=el['companyLogo'];
el['country']=el['countryEn'];
el['exhibitor-cat']=el['productGroupIndexEn'];
el['pagetitle']=el['companyNameEn'];
el['Expo__c']="chinaExhibitorList"
el['web_logo']=el['logo'];
el['logo']=el['logo'];
el['Exhibitor_listing_type__c']="Standard"
el['exhibitor-booth']=el['boothNo'];

delete el['exhibitorId'];
delete el['companyDescriptionEn'];
delete el['companyLogo'];
delete el['countryEn'];
delete el['productGroupIndexEn'];
delete el['companyNameEn'];
delete el['boothNo'];



    })

   data= data.filter(el=> el.pagetitle)


    }else{
      
        var { data } = await api.get(`/rest/exhibman.php?expos=${expos}`);
          data.forEach(data=>console.log(data['exhibitor-booth'] +" " +data.pagetitle))
        data.sort((a, b) => {
            if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
                return -1;
            }
            if (a.pagetitle.toLowerCase() < b.pagetitle.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }
 const targetTitle= "Juri45"
 const exhibitorToDuplicate=data.find(e=>e.pagetitle.toLowerCase()==targetTitle.toLowerCase())
 if (exhibitorToDuplicate) {
  // Create a deep copy (so it’s not just a reference)
  const duplicate = JSON.parse(JSON.stringify(exhibitorToDuplicate));
  data.unshift(duplicate)}
    // console.log(data,"china")
   
    // console.log(exhibitorToDuplicate,"yuppyyy")
    //  console.log(data,"normal")
    dispatch({ type: "FETCH_EXHIBS", payload: data });
};

export default fetchExhibs;
