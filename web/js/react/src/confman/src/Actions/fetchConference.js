import createAPI from "../Utils/createApi";
import setLowestDay from "./setLowestDay";
import setMaxDays from "./setMaxDays";
import setMaxTracks from "./setMaxTracks";
import setMaxShows from "./setMaxShows";
import setShow from "./setShow";
import setInitialShowsFilters from "./setInitialShows";
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



// //test add show name to session
// session[0].Categories__c="TEE-ABE"
// session[1].Categories__c="FME-ABE"
// session[2].Categories__c="TEE-FME"
// // session[5].Categories__c="FME" break
// session[6].Categories__c="FME-TEE"
// session[7].Categories__c="FME-ABE"
// session[8].Categories__c="ABE-TEE-FME"
// session[9].Categories__c="TEE"
// session[10].Categories__c="ABE"
// session[11].Categories__c="FME"
// session[12].Categories__c="TEE"
// session[13].Categories__c="ABE"
// session[14].Categories__c="FME"
// session[15].Categories__c="TEE"
// session[16].Categories__c="FME"
// session[17].Categories__c="TEE"
// session[18].Categories__c="ABE-TEE-FME"
// session[19].Categories__c="FME"
// session[20].Categories__c="TEE"
// session[21].Categories__c="ABE"
// session[22].Categories__c="FME"
// session[23].Categories__c="TEE"
// session[24].Categories__c="ABE"
// session[25].Categories__c="FME"
// session[26].Categories__c="TEE"
// session[27].Categories__c="FME"
// session[28].Categories__c="TEE"
// session[29].Categories__c="ABE"
// session[30].Categories__c="FME"
// session[31].Categories__c="TEE"
// session[32].Categories__c="ABE"
// session[33].Categories__c="FME"
// session[34].Categories__c="TEE"
// session[35].Categories__c="ABE"
// session[36].Categories__c="FME"
// session[37].Categories__c="TEE"
// session[38].Categories__c="ABE-TEE-FME"
// session[39].Categories__c="FME"
// session[40].Categories__c="TEE"
// session[41].Categories__c="FME"
// session[42].Categories__c="TEE"
// session[43].Categories__c="ABE-TEE-FME"
// session[44].Categories__c="FME"
// session[45].Categories__c="TEE"



    //**MULTY EXPOS OPTION**/
    //Split and order Categories__c aphabetically direclty on the session TEE-ABE ->ABE-TEE
    // NOT SURE IT S NEEDED AS THERE WILL BE SET IN OTDER ON SF
    session.map(el => {
        if (el.Categories__c) {
            return el.Categories__c = el.Categories__c.split("-").sort().join("-")
        }})
 
    // **MULTY EXPOS OPTION**
    // **LOGIC TO CREATE THE BUTTONS BASED ON THE SHOWS
    // I create new array and i order it again (not sure if needed to be ordered again)
    let showArray = [];
    session.forEach(session => {
    const {Categories__c} = session;
    let maxShowsOrdered
    if(Categories__c !== undefined  ){
         if(Categories__c){ maxShowsOrdered= Categories__c.split("-").sort().join("-")}
        showArray.push(maxShowsOrdered);
      }});

//**MULTY EXPOS OPTION**/
//**Split all the shows variants in a dup arrays
const showsNamesSanitised =showArray.join(" ").split(" ").join("-").split("-")
//**REDUCE THE ALL THE LONG ARRAY IN THE MAIN BASIC SHOWS LIKE ABE FME TEE AND REMOVED THE NULL OR UNDEFINED EXTRA ELEMENT
//TO CREATE THE RIGHT NUMBER OF BUTTONS
const showsNumbersFiltered=showsNamesSanitised.filter((el,index)=>{
return  showsNamesSanitised.indexOf(el)===index
  }).sort().filter(n=>n)
  console.log(showsNumbersFiltered,"showsNumbersFiltered")





    //**Dispatch these actions.
    dispatch({ type: "FETCH_CONFERENCE", payload: data });
    dispatch(setMaxShows(session));
    dispatch(setMaxDays(session));
    dispatch(setLowestDay(session));
    dispatch(setMaxTracks(session));
    dispatch(setMaxShows(session));
    dispatch(setMaxShows(showsNumbersFiltered));
    


   //**MULTY EXPOS OPTION**/
  //**filtering values to removed null  in Categories__c 
  //**if a value has not been filled up on sF it won't show for FME ABE TEE
  let showArrayFilterNull=[...showArray].filter(e=>e)
  // order the show alphabetically
    showArrayFilterNull= [...new Set(showArrayFilterNull)]
   console.log( showArrayFilterNull,"showArrayFilterNull") 
   console.log(   showsNumbersFiltered,"  showsNumbersFiltered") 
    dispatch(setShow([["firstLoad"],  showArrayFilterNull]));
    // **THIS KEEPS TRACK OF THE INITIAL SHOWS ON THE FIRST LOAD AND STORED THEM   
    //USED FOR RESETTING THE SESSION TO THE INITIAL VALUE ONCE PRESSED CLEAR FILTERS
    dispatch(setInitialShowsFilters ( showArrayFilterNull));

};

export default fetchConference;
