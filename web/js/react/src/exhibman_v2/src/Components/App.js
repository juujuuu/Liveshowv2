// import React, { Component } from "react";
// import { Route, Routes, Link } from "react-router-dom";
// import { connect } from "react-redux";

// import { getExhibListPath, getProductPath, getProfilePath } from "../Utils/GetPath";

// import { fetchExhibs, fetchExhib, setLoading, setQueries, setOptions, setMode, setProduct, setProfile } from "../Actions";

// import Spinner from "../../../common_components/Spinner";

// import ExhibitorList from "./ExhibitorList";
// import Profile from "./Profile/Profile";
// import Product from "./Product";
// import DesignExhibitorList from "./DesignExhibitorList";

// class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     /**
//      * Resolve inital params and run the iniital SF lookup
//      */
//     componentDidMount() {
//         const { setMode, setLoading, setQueries, setOptions, queries, initOptions, setProduct, setProfile } = this.props;
//         const { ids, profileId, articleId, mode } = initOptions;

//         setOptions(initOptions);
//         setProduct(articleId);
//         setProfile(profileId);
//         setQueries({
//             search: queries.search,
//             letter: queries.letter,
//             expo: ids,
//         });
//         setMode(mode);
//     }

//     showAppInfo = boolean => {
//         boolean = boolean ? "block" : "none";
//         try {
//             document.getElementById("exhib_header").style.display = boolean;
//         } catch (error) {
//             console.error("Exhib Info block not found.  ", error);
//         }
//     };

//     render() {
//         console.log("Render Store: ", this.props);

//         const { loading, error, exhibs, exhibitor, mode, options, queries } = this.props;
//         const errorMessage = (
//             <h1 className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px", textAlign: "center" }}>
//                 Sorry, an unexpected error has occurred
//             </h1>
//         );
//         if (error) {
//             return errorMessage;
//         } else if (Object.keys(options).length < 1) {
//             //Options not yet set on mount
//             return <Spinner />;
//         } else if (mode === "DESIGN_LIST") {
//             return <DesignExhibitorList />;
//         }
//         try {
//             /**
//              * This is how we're doing a SPA.  Basically the Routes component contains a number of routes.
//              * This contains a Route which receives a path and an element to render.  This setup kind of acts like a
//              * switch case where for each Route, if the current url matches the url in path it will render the route.
//              */
//             return (
//                 <Routes>
//                     <Route path={getExhibListPath(this.props.options.debug, this.props.options.local)} element={<ExhibitorList />}></Route>
//                     <Route path={getProfilePath(this.props.options.debug, this.props.options.local)} element={<Profile />}></Route>
//                     <Route path={getProductPath(this.props.options.debug, this.props.options.local)} element={<Product />}></Route>
//                 </Routes>
//             );
//         } catch (error) {
//             console.error("Full error:  ", error);
//             return errorMessage;
//         }
//     }
// }
// //export default App;
// const mapStateToProps = (store, ownProps) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
//     fetchExhibs,
//     fetchExhib,
//     setLoading,
//     setQueries,
//     setOptions,
//     setMode,
//     setProduct,
//     setProfile,
// })(App);

import React, { Component,useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect,useSelector,useDispatch } from "react-redux";

import { getExhibListPath, getProductPath, getProfilePath,getLeadRetPath } from "../Utils/GetPath";

import { fetchExhibs, fetchExhib, setLoading, setQueries, setOptions, setMode, setProduct, setProfile } from "../Actions";

import Spinner from "../../../common_components/Spinner";

import ExhibitorList from "./ExhibitorList";
import Profile from "./Profile/Profile";
import Product from "./Product";
import DesignExhibitorList from "./DesignExhibitorList";

// class App extends Component {
//     constructor(props) {
//         super(props);
//     }


const App =(props)=>{

    /**
     * Resolve inital params and run the iniital SF lookup
     */
    // componentDidMount() {
    //     const { setMode, setLoading, setQueries, setOptions, queries, initOptions, setProduct, setProfile } = this.props;
    //     const { ids, profileId, articleId, mode } = initOptions;

    //     setOptions(initOptions);
    //     setProduct(articleId);
    //     setProfile(profileId);
    //     setQueries({
    //         search: queries.search,
    //         letter: queries.letter,
    //         expo: ids,
    //     });
    //     setMode(mode);
    // }
//     const fetchExhib=useSelector(fetchExhib)
//     const  setLoading=useSelector(setLoading)
//   const setQueries=useSelector(setQueries)
//     const setOptions=useSelector(setOptions)
//     const setMode=useSelector(setMode)
//     const setProduct=useSelector(setProduct)
//     const setProfile=useSelector(setProfile)
    
    // setProduct,
    // setProfile,
  
    const state=useSelector((state)=>state)
    const options=useSelector(state=>state.options)
    const queries=useSelector((state)=>state.queries)
    const modeSelector=useSelector(state=>state.mode)
    const dispatch=useDispatch()
    // console.log("opt")
    // console.log("state",state)
    // console.log("option",options)
    // console.log("props1")
    // console.log(props)
    useEffect(()=>{
        // const { setMode, setLoading, setQueries, setOptions, queries, initOptions, setProduct, setProfile } = props;
        const {   initOptions} = props;
            const { ids, profileId, articleId, mode } = initOptions;
            console.log("initOptions")
            console.log(initOptions.ids)
            dispatch(setOptions(initOptions));
            dispatch(setProduct(articleId));
            dispatch(setProfile(profileId));
            dispatch(setQueries({
                search: queries.search,
                letter: queries.letter,
                expo: ids,
            }));
           dispatch( setMode(mode));

    },[])
    const showAppInfo = boolean => {
        boolean = boolean ? "block" : "none";
        try {
            document.getElementById("exhib_header").style.display = boolean;
        } catch (error) {
            console.error("Exhib Info block not found.  ", error);
        }
    };

    // render() {
        // console.log("Render Store: ", this.props);
        console.log("Render Store: ", props);

        // const { loading, error, exhibs, exhibitor, mode, options, queries } = this.props;
        const { loading, error, exhibs, exhibitor } = props;
        console.log("oprionssss,option",options)
        const errorMessage = (
            <h1 className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px", textAlign: "center" }}>
                Sorry, an unexpected error has occurred
            </h1>
        );
        if (error) {
            return errorMessage;
        } else if (Object.keys(options).length < 1) {
            //Options not yet set on mount
            return <Spinner />;
        } else if (modeSelector === "DESIGN_LIST") {
            return <DesignExhibitorList />;
        }
        try {
            /**
             * This is how we're doing a SPA.  Basically the Routes component contains a number of routes.
             * This contains a Route which receives a path and an element to render.  This setup kind of acts like a
             * switch case where for each Route, if the current url matches the url in path it will render the route.
             */
            // return (
            //     <Routes>
            //         {/* <Route path={getExhibListPath(this.props.options.debug, this.props.options.local)} element={<ExhibitorList />}></Route>
            //         <Route path={getProfilePath(this.props.options.debug, this.props.options.local)} element={<Profile />}></Route>
            //         <Route path={getProductPath(this.props.options.debug, this.props.options.local)} element={<Product />}></Route> */}
            //             <Route path={getExhibListPath(options.debug, options.local)} element={<ExhibitorList />}></Route>
            //         <Route path={getProfilePath(options.debug, options.local)} element={<Profile />}></Route>
            //         <Route path={getProductPath(options.debug, options.local)} element={<Product />}></Route>
            //     </Routes>
            // );

            if (options.mode =="LEAD-RETRIEVAL"){
                return (
                <Routes>
                <Route path={getLeadRetPath(options.debug,options.local)} element={<ExhibitorList />}></Route>
                
            </Routes>
                )
               }else{
                return (
                    <Routes>
                        <Route path={getExhibListPath(options.debug,options.local)} element={<ExhibitorList />}></Route>
                        <Route path={getProfilePath(options.debug, options.local)} element={<Profile />}></Route>
                        <Route path={getProductPath(options.debug, options.local)} element={<Product />}></Route>
                    </Routes>
                );}


        } catch (error) {
            console.error("Full error:  ", error);
            return errorMessage;
        }
    }
// }
export default App;
// const mapStateToProps = (store) => {
//     return { ...store };
// };
// export default connect(mapStateToProps, {
// //     // fetchExhibs,
// //     // fetchExhib,
// //     // setLoading,
// //     // setQueries,
// //     // setOptions,
// //     // setMode,
// //     // setProduct,
// //     // setProfile,
// })(App);
