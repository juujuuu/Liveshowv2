// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";

// import Spinner from "../../../common_components/Spinner";

// import FullAgenda from "./FullAgenda";
// import SpeakerList from "./SpeakerList";

// import { setDealtWithInitialParams, setLoading, setOptions } from "../Actions";

// const App = props => {
//     /**
//      * 	Props are an input parameters object for a component.
//      * {property1, property2} = object syntax is destructuring an object (stripping properties out of an object as named variables which are less cumbersome to use and no longer use the pointer).
//      */
//     const { options, setOptions, setDealtWithInitialParams, setLoading, initOptions, error } = props;

//     /**
//      * More destructuring.  Here though were using doing it on an array that useState(false) returns and we're picking the names returned by index 0 and 1.
//      */
//     const [setup, setSetup] = useState(false); //Use state is a hook that creates a piece of state for the component and returnings an array containing a getter and setter for that piece of state.

//     /**
//      * UseEffect basically means run the callback on rerender if the bits of state listed in the array param have changed (we're listing none here, so this code will just run after the first render).
//      */
//     useEffect(() => {
//         setSetup(true);
//         setOptions(initOptions); //Assign our input options to the redux store
//         initOptions.parameters ? setDealtWithInitialParams(false) : setDealtWithInitialParams(true);
//     }, []);

//     console.log("Store: ", props);

//     /**
//      * Fall back message if something breaks.
//      */
//     const errorJSX = (
//         <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
//             <h1 style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>An unexpected error occurred</h1>
//         </div>
//     );

//     try {
//         if (!setup) {
//             return (
//                 <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
//                     <Spinner />
//                 </div>
//             );
//         } else if (error) {
//             return errorJSX;
//         } else if (options.mode === "full-agenda") {
//             return <FullAgenda />;
//         } else if (options.mode === "speaker-list" || options.mode === "design-speaker-list") {
//             return <SpeakerList />;
//         }
//     } catch (error) {
//         return errorJSX;
//     }
// };
// const mapStateToProps = (store, ownProps) => {
//     return { ...store }; //...store syntax basically means 'this new object will contain the properties of store'.  You can then add more properties on top as normal if you want.
// };

// /**
//  * Export and connect this component up to the redux store.
//  * mapStateToProps is a way of editing the data we get from the store and our normal props if neccessary.
//  * Second param is an object containing the action creators we want this component to have access to.
//  */
// export default connect(mapStateToProps, {
//     setLoading,
//     setOptions,
//     setDealtWithInitialParams,
// })(App);
import React, { useState, useEffect, } from "react";
import { connect,useSelector,useDispatch } from "react-redux";

import Spinner from "../../../common_components/Spinner";

import FullAgenda from "./FullAgenda";
import SpeakerList from "./SpeakerList";
import CocktailExpo from "./CocktailExpo"

import { setDealtWithInitialParams,  setOptions } from "../Actions";

const App = props => {

const state=useSelector(state=>state)
const error=useSelector(state=>state.error)
const options=useSelector(state=>state.options)

    const dispatch=useDispatch()
   // const checkInitialParams=useSelector(state=>state.dealtWithInitialParams)
  
//   const options=useSelector(state=>state)
    /**
     * 	Props are an input parameters object for a component.
     * {property1, property2} = object syntax is destructuring an object (stripping properties out of an object as named variables which are less cumbersome to use and no longer use the pointer).
     */
    const {   initOptions } = props;
    


    /**
     * More destructuring.  Here though were using doing it on an array that useState(false) returns and we're picking the names returned by index 0 and 1.
     */
    const [setup, setSetup] = useState(false); //Use state is a hook that creates a piece of state for the component and returnings an array containing a getter and setter for that piece of state.

    /**
     * UseEffect basically means run the callback on rerender if the bits of state listed in the array param have changed (we're listing none here, so this code will just run after the first render).
     */
    useEffect(() => {
        setSetup(true);
       dispatch(setOptions(initOptions)); //Assign our input options to the redux store
        initOptions.parameters ? dispatch(setDealtWithInitialParams(false)) :dispatch(setDealtWithInitialParams(true));
    }, []);
   
    // console.log("options:",options)
    // console.log("state:",state)
    // console.log("Store: ", props);

    /**
     * Fall back message if something breaks.
     */
    const errorJSX = (
        <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
            <h1 style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>An unexpected error occurred</h1>
        </div>
    );

    try {
        if (!setup) {
            return (
                <div className="confman conference-agenda conference-agenda--loading d-flex justify-content-center align-items-center">
                    <Spinner />
                </div>
            );
        } else if (error) {
            return errorJSX;
        } else if (options.mode === "full-agenda") {
            return <FullAgenda />;
        } else if (options.mode === "speaker-list" || options.mode === "design-speaker-list") {
            return <SpeakerList />;
        }
        else if (options.mode === "cocktail-expo") {
            return <CocktailExpo />;
        }
        
        
    } catch (error) {
        return errorJSX;
    }
};
// const mapStateToProps = (store, ownProps) => {
//     return { ...store }; //...store syntax basically means 'this new object will contain the properties of store'.  You can then add more properties on top as normal if you want.
// };

/**
 * Export and connect this component up to the redux store.
 * mapStateToProps is a way of editing the data we get from the store and our normal props if neccessary.
 * Second param is an object containing the action creators we want this component to have access to.
 */
// export default connect(mapStateToProps, {
   
 
 
// })(App);

export default App;