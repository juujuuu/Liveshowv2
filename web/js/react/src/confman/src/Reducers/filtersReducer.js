import helpFunctionforMultiExpo from "../Utils/helpFunctionforMultiExpo"
const filtersReducer = (state = { track: [], day: 1, query: "", letter: -1, firstLoad: true, setInitialShows: [], show: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TRACK":
            if (typeof payload == "object") {
                return { ...state, track: payload };
            } else if (state.track.find(t => t === payload) !== undefined) {

                let newTracks = state.track.filter(t => t !== payload);
                return { ...state, track: newTracks };
            } else {
                return { ...state, track: [...state.track, payload] };
            }
        case "SET_LETTER":
            return { ...state, letter: payload };
        case "SET_QUERY":
            return { ...state, query: payload };
        case "RESET_FILTERS":
            return { ...state, track: [], day: 1, query: "", letter: -1, show: state.setInitialShows };
        case "SET_DAY":
            return { ...state, day: payload };
        case "SET_INITIAL_SHOWS":

            return { ...state, setInitialShows: payload };

        // case "SET_FIRST_LOAD":
       // THIS WAS WRITTEN TWICE  NOT SURE WHY, SAME ONE IS DOWN THE PAGE
        //     return { ...state, show: payload };


        case "SET_SHOW":
          /*MULTY EXPOS OPTION    
          *this will return an array with the acronyms of the shows 
          *SET THE INITIAL SHOWS FOR THE FIRST LOAD ONLY **/
            var initialPayload
            let newShowArray = []


             
            /* set initial shows at the beginning and runs one**/
            if (payload[0].toString() == "firstLoad") {
            initialPayload = [...payload[1]]
            return { ...state, show: initialPayload };
        }


         /**AFTER THE FIRST LOAD IT RUNS THIS TO UNCHECK THE BUTTONS AND PUSHES THE ELEMENTS MINUS THE ONE UNCHECKED INTO
        *THE NEW ARRAY SHOW (JUST THE LOGIC WITH SHOWS INITIALS [FME  ABE-TEE...])**/
       
        else if (state.show.includes(payload)) {
           
            //**SET THE FIRSTLOAD TO FALSE -> THIS IS USED IN FULL AGENDA TO SKIP THE FIRSTLOAD TO RUN AGAIN    */
        
        state.firstLoad = false
        state.show.forEach(element => {
             /**CREATES A NEW ARRAY AND PUSHES ALL THE ELEMETNS MINUS THE ONE UNCHECKED 

            * this will just remove the single acronym and uncheck the buttons (only ABE or TEE or FME)
            *so we are controllying the checkboxes as they are 3 buttons  and the show variants are 7 !! */
           
             if (element !== payload) {
                newShowArray.push(element)
            }});

             // here I am  doing the trick to remove the element not present in multi-variants or signle-show
              
                if (!newShowArray.includes("ABE") && !newShowArray.includes("FME")) {
                    newShowArray = newShowArray.filter(el => !el.includes("ABE-FME"))
                   
                    // I STRUGGLED TO FIND A WAY TO KEEP  ABE-FME-TEE FROM BEING REMOVED SO I AM PUSHING IT BACK IN
                    newShowArray.push("ABE-FME-TEE")
                    
                }
                if (!newShowArray.includes("ABE") && !newShowArray.includes("TEE")) {
                   
                    newShowArray = newShowArray.filter(el => !el.includes("ABE-TEE"))
                   
                }
                if (!newShowArray.includes("FME") && !newShowArray.includes("TEE")) {
                   
                    newShowArray = newShowArray.filter(el => !el.includes("FME-TEE"))
                    // find a solution incase the write TEE-FME instad of FME-TEE 
                   
                    newShowArray.push("ABE-FME-TEE")
                 
                }
                if (!newShowArray.includes("ABE") && !newShowArray.includes("FME") && !newShowArray.includes("TEE")) {
                  
                    newShowArray = newShowArray.filter(el => !el.includes("ABE-FME-TEE"))
                  
                }

                if (!newShowArray.includes("ABX") && !newShowArray.includes("FMX")) {
                    newShowArray = newShowArray.filter(el => !el.includes("ABX-FMX"))
                   
                   
                    
                }

                return { ...state, show: newShowArray };
            }
            else {
             //**CREATES A NEW ARRAY AND PUSHES THE ELEMENTS UNCHECKED BACK  CHECKING AGAN THE BUTTON
                state.show.unshift(payload)
                let newShowArray = state.show
             //**THIS IS THE TRICK TO GET THE SHOW-VARIANTS BACK 
             //ABE-FME-TEE
                if ((newShowArray.includes("ABE") || newShowArray.includes("FME")) && !newShowArray.includes("ABE-FME")) {

                    newShowArray.unshift("ABE-FME")

                }
                if ((newShowArray.includes("ABE") || newShowArray.includes("TEE")) && !newShowArray.includes("ABE-TEE")) {

                    newShowArray.unshift("ABE-TEE")

                }
                if ((newShowArray.includes("FME") || newShowArray.includes("TEE")) && !newShowArray.includes("FME-TEE")) {

                    newShowArray.unshift("FME-TEE")

                }
                if ((newShowArray.includes("ABE") || newShowArray.includes("FME") || newShowArray.includes("TEE")) && !newShowArray.includes("ABE-FME-TEE")) {

                    // newShowArray = newShowArray.filter(el => !el.includes("ABE-FME"))

                    newShowArray.unshift("ABE-FME-TEE")

                }

                if ((newShowArray.includes("ABX") || newShowArray.includes("FMX")) && !newShowArray.includes("ABX-FMX")) {

                    newShowArray.unshift("ABX-FMX")

                }


            }

        case "SET_FIRST_LOAD":
//
            return { ...state, firstLoad: false };


        default:
            return state;
    }

};

export default filtersReducer;
