import createAPI from "../Utils/createApi";
import setLowestDay from "./setLowestDay";
import setMaxDays from "./setMaxDays";
import setMaxTracks from "./setMaxTracks";
import setMaxShows from "./setMaxShows";
import setShow from "./setShow";
import setInitialShowsFilters from "./setInitialShowsFilters";
import setLoading from "./setLoading";



/**
 * So to use async stuff in a redux action creator and other action creators you have to use a middleware called thunk which lets you return an async function from the action creator.
 * @param {String} site - Full site url.
 * @param {String} conferenceId - SF conference Id.
 * @returns Conference sessions.
 */
const fetchConference = (site, conferenceId) => async dispatch => {
    const api = createAPI(site);
    let response = await api.get(`/confman.php?call[]=presentation&call[]=session&confId=${conferenceId}`);
    // let response = await api.get(`/confmanTest.php?call[]=presentation&call[]=session&confId=${conferenceId}`);
    const { data } = response;
    const { session ,presentation,maxShows} = data;
// console.log(response,"data fetch")
// console.log(data, "data")
// console.log(presentation[0],"presentation")


//test add show name to session
session[0].Categories__c="TEE-ABE"
session[1].Categories__c="FME-ABE"
session[2].Categories__c="TEE-FME"
// session[5].Categories__c="FME"
session[6].Categories__c="FME-TEE"
session[7].Categories__c="FME-ABE"
session[8].Categories__c="ABE-TEE-FME"
session[9].Categories__c="TEE"
session[10].Categories__c="ABE"
session[11].Categories__c="FME"
session[12].Categories__c="TEE"
session[13].Categories__c="ABE"
session[14].Categories__c="FME"
session[15].Categories__c="TEE"
session[16].Categories__c="FME"
session[17].Categories__c="TEE"
session[18].Categories__c="ABE-TEE-FME"
session[19].Categories__c="FME"
session[20].Categories__c="TEE"
session[21].Categories__c="ABE"
session[22].Categories__c="FME"
session[23].Categories__c="TEE"
session[24].Categories__c="ABE"
session[25].Categories__c="FME"
session[26].Categories__c="TEE"
session[27].Categories__c="FME"
session[28].Categories__c="TEE"
session[29].Categories__c="ABE"
session[30].Categories__c="FME"
session[31].Categories__c="TEE"
session[32].Categories__c="ABE"
session[33].Categories__c="FME"
session[34].Categories__c="TEE"
session[35].Categories__c="ABE"
session[36].Categories__c="FME"
session[37].Categories__c="TEE"
session[38].Categories__c="ABE-TEE-FME"
session[39].Categories__c="FME"
session[40].Categories__c="TEE"
session[41].Categories__c="FME"
session[42].Categories__c="TEE"
session[43].Categories__c="ABE-TEE-FME"
session[44].Categories__c="FME"
session[45].Categories__c="TEE"


let showNumber = 0;
let showArray = [];
session.forEach(session => {
const {Categories__c} = session;
    // if(Categories__c == undefined || Categories__c !== null ){
        //removing null check
        //Ordering the shows options alphabetically 
        let newCat
    if(Categories__c !== undefined  ){
         if(Categories__c){
            
             newCat= Categories__c.split("-").sort().join("-")
         }
        // console.log(Categories__c.split("-").sort(), "cat C")
     showArray.push(newCat);
      } 
    //   else{
    //     session.Categories__c="not set"
    //   }
    //   console.log(sessions,"sessionssss")
 
});
// could use join to create string and remove the - and filter again to get the buttons 
const showsNamesSanitised =showArray.join(" ").split(" ").join("-").split("-")
const showsNumbersFiltered=  showsNamesSanitised.filter((el,index)=>{
return  showsNamesSanitised.indexOf(el)===index

      }).sort()

// console.log(session[0].Categories__c="TEE","session")



    //Dispatch these actions.
    dispatch({ type: "FETCH_CONFERENCE", payload: data });
    dispatch(setMaxShows(session));
    dispatch(setMaxDays(session));
    dispatch(setLowestDay(session));
    dispatch(setMaxTracks(session));
    dispatch(setMaxShows(session));
   
    
    dispatch(setMaxShows(showsNumbersFiltered));
    
    //changing this
    // dispatch(setShow([["firstLoad"],showsNumbersFiltered]));
    // dispatch(setInitialShowsFilters (showsNumbersFiltered));
    //to this 
    // [...new set(showArray)]
  //filtering values to removed null  in Categories__c 
  //-if a value has not been filled up on sF it won't show for FME ABE TEE

  let showArrayFilterNull=[...showArray].filter(e=>e)
    // order the show alphabetically
    showArrayFilterNull= [...new Set(showArrayFilterNull)]
   console.log( showArrayFilterNull) 
    dispatch(setShow([["firstLoad"],  showArrayFilterNull]));
    dispatch(setInitialShowsFilters ( showArrayFilterNull));
    // dispatch(setLoading (false));
    // dispatch(setShows(session));
};

export default fetchConference;
