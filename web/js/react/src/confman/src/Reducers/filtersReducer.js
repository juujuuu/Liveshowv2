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

        case "SET_SHOW":


            var initialPayload
            let test = []
            // set initial shows at the beginning and runs one
            if (payload[0].toString() == "firstLoad") {
                initialPayload = [...payload[1]]
                // return { ...state, show: initialPayload };

                return { ...state, show: initialPayload };

            }
            else if (state.show.includes(payload)) {

                state.firstLoad = false
                // let test = []


                state.show.forEach(element => {
                    if (element !== payload) {
                        console.log("they are different so not removing,", element !== payload, element, payload)
                        test.push(element)
                        console.log(test, "result after pushed")


                    }




                });
              
      
                 if(!test.includes("ABE") && !test.includes("FME") &&  test.includes("TEE")) {
                    test= test.filter(el => !el.includes("ABE-FME"))
                    console.log(test, "removed ABE-FME")
                    alert("removed ABE-FME")
                }
                else if (!test.includes("ABE") && !test.includes("TEE") &&  test.includes("FME")) {
                    test= test.filter(el => !el.includes("ABE-TEE"))
                    console.log(test, "removed ABE-TEE-")
                    alert("removed ABE-TEE-")
             }
                else if(!test.includes("FME") && !test.includes("TEE") && test.includes("ABE")) {
                    test= test.filter(el => !el.includes("FME-TEE"))
                    // find a solution incase the write TEE-FME instad of FME-TEE 
                    // test.filter(el => !el.includes("FME-TEE"))
                    console.log(test, "removed FME-TEE")
                    alert("removed FME-TEE")
                }
               else if(!test.includes("ABE") && !test.includes("FME") && !test.includes("TEE")) {
                    test= test.filter(el => !el.includes("ABE-FME-TEE"))
                    console.log(test, "removed ABE-FME-TEE")
                    alert("removed ABE-FME-TEE")
                }
               
                // else if(!test.includes("ABE") && !test.includes("FME")) {
                //     test = test.filter(el => !el.includes("TEE-FME"))
                //     console.log(test, "testttttttteeeeee")
                
                // }

                  /// keep this !!!! returns the split array
                // const showsNamesSanitised = [...test].join(" ").split(" ").toString()
                // if (showsNamesSanitised.includes(payload)) {

                //     console.log(showsNamesSanitised, "pass and go true")

                //     test.filter(el => {
                //         el.includes(payload)
                //     })
                // }

                ///////////////
                // console.log(excludeShow,"exclude show")
                // console.log(payload,"payload")
                // console.log(test,"not there ")

                return { ...state, show: test };
            }
            else {
                if (!test.includes("ABE") || !test.includes("TEE")) {
                   test= test.push("ABE-TEE")
                    // console.log(test, "testttttttteeeeee")
                }
                state.show.push(payload)
                // //    console.log(newPyload,"newPyload")
                console.log("nothing is happening g,", payload)
                return { ...state, show: state.show };

            }

        case "SET_FIRST_LOAD":

            return { ...state, firstLoad: payload };


        default:
            return state;
    }

};

export default filtersReducer;
