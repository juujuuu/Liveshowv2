
const cocktailReducer = (state = { totalStepN: [], tags: [],totaltagsOneArray:[], selectedTags: [], cocktailSessions: [], cocktailMaxTagSelection: [],
  //  CMaxTagSelectionTracking: [0], 
 
  //**RENAME  TAG CMaxTagSelectionTracking2 
  //CMaxTagSelectionTracking DONT THINK IS NEEDED */
   CMaxTagSelectionTracking2: [],setCocktailMainStartYourMix:[true] }, action) => {
  const { type, payload } = action;
  // console.log(payload ,"@action")

  switch (action.type) {


    /**-TOTALSTEPN- THIS SETS THE NUMBER OF STEPS */
    case "SET_TOTAL_STEP_N":
// console.log(payload,"pay")

// let test={}
// for (let key in payload) {
//   if (payload.hasOwnProperty(key) && payload[key]) {  // Check if the property belongs to the object

 
//     test = { ...test, [key]: payload[key] 
//   }
// }
// }
// const payloadNull =payload
const show= document.querySelector("#root").getAttribute("show")


      const sortedFields = Object.keys(payload).map((field, index) => field.replace(/^CKTL_|__c$/g, ''))

// console.log(test,"test")

      const sortedFields2 = sortedFields.sort()

      let finalSort = sortedFields2.map((field, index) => field.replace((index + 1) + "_", ''))


    
      //**-TAGS OBJECT- COMING FROM FETCH CONF - CREATE ARRAYS IN TAGS OBJECT BASED ON THE AVARAGE NUMBER OF STEPS IN SESSION COCKTAILS */
      //** THIS IS HOW I CREATE THE TAGS ARRAYS*/
     //FALLBACK TO REMOVED PREFIXES AND NUMBERS 
      function removeSubstrings(key) {
        return key.replace('CKTL_', '').replace('__c', '').replace(/^\d+_/, ''); // Regex to remove numeric prefixes
      }
      
       // Loop through each key-value pair in the data object
      for (let key in payload) {
        
         //LOOP AND REMOVED THE PREFIXES 
        if (payload.hasOwnProperty(key)) {
          
          // Remove substrings from the key
          const newKey = removeSubstrings(key);

          // If state.tags doesn't have the newKey, initialize it as an empty array
          if (!state.tags[newKey]) {
            //create arrays for step Titles
            state.tags[newKey] = [];

          }
          
          if (payload[key] !== null) {
            // Add the value to the array associated with the modified key in state.tags
            if (Array.isArray(state.tags[newKey])) {
              // Concatenate the arrays
              state.tags[newKey] = state.tags[newKey].concat(payload[key]);

              //!! trying to create an array with all the tags together
              state.totaltagsOneArray = state.totaltagsOneArray.concat(payload[key]);
              state.totaltagsOneArray = [...state.totaltagsOneArray].flat(1)
              const uniqTotalArr=[...new Set(state.totaltagsOneArray)]
              state.totaltagsOneArray=uniqTotalArr
              let uniq = [...new Set(state.tags[newKey])]
              state.tags[newKey] = uniq
            } else {
              // Initialize state.tags[newKey] as an array and add the value
              state.tags[newKey] = [state.tags[newKey], payload[key]];
            }
          }
        }

      }









   //**RETURN TOTAL STEPS  */
   let finalSorted
   if(show=="BRE" || show=="TEE" ||show=="ABE" ||show=="FME"){
    
    finalSort=finalSort.filter(el=>el!=="Event")
   }
 
 
   
      return { ...state, totalStepN: [...finalSort] };


    case "SET_COCKTAIL_MAX_TAG":
      const newmintags = JSON.parse(payload);
      const totalStepNLength = state.totalStepN.length;
      state.CMaxTagSelectionTracking = []
      // THIS SET AN ARRAY TO KEEP TRACK OF THE CLICK TAGS LIMIT ON THE DIFFERENT STEPS 
      //IT WILL BE DISPATCHED AND CHANGED BY ANOTHER ACTIONS THOU
      // for (let i = 0; newmintags.length > i; i++) {
      //   state.CMaxTagSelectionTracking.push(0)
      // }
      while (newmintags.length < totalStepNLength) {
        // state.CMaxTagSelectionTracking.push("NOT-SET")
        newmintags.push("NOT-SET");
      }


      //***TRIGGERED ON THE FIRST CLICK
      return { ...state, cocktailMaxTagSelection: newmintags };







    case "SET_TAGS":


      const arr = [...state.selectedTags]


      if (arr.includes(action.payload.toString())) {
     
        const arr2 = arr.filter(item => item !== action.payload.toString());
  

        return { ...state, selectedTags: arr2 };
      }
      // else if(action.payload==="RESET"){
      //     return { ...state, selectedTags: []}
      // }
      else {
        
        return { ...state, selectedTags: [...state.selectedTags, ...action.payload] };
      }




  


    case "SET_COCKTAIL_SESSIONS":




      return { ...state, cocktailSessions: action.payload.slice(0,3) };

    case "SET_COCKTAIL_MAX_TAG_TRACKING":


      const payloadString = payload.toString()


      const updatedCMaxTagSelectionTracking2 = { ...state.CMaxTagSelectionTracking2 };

      for (let key in state.tags) {
        if (state.tags.hasOwnProperty(key)) {
          if (state.tags[key].includes(payloadString)) {
            if (!updatedCMaxTagSelectionTracking2[key]) {
              updatedCMaxTagSelectionTracking2[key] = [payloadString];
            } else {
              if (updatedCMaxTagSelectionTracking2[key].includes(payloadString)) {
                // Remove payloadString if it already exists
                updatedCMaxTagSelectionTracking2[key] = updatedCMaxTagSelectionTracking2[key].filter(item => item !== payloadString);
              } else {
                // Add payloadString if it doesn't exist
                updatedCMaxTagSelectionTracking2[key].push(payloadString);
              }
            }
          }
        }
      }

      return { ...state, CMaxTagSelectionTracking2: updatedCMaxTagSelectionTracking2 };

    case "RESET_FILTERS": {
      state.selectedTags = []
      state.CMaxTagSelectionTracking2 = []
      state.cocktailSessions = []

      return { ...state }

    }
   
    //MAIN BUTTON TOGGLE
    case "START_YOUR_MIX":{

     return { ...state, setCocktailMainStartYourMix: action.payload }
    }
    default: 

      return state;
  }
};

export default cocktailReducer;
