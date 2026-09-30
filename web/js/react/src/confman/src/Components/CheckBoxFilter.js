// import React from "react";
// /**
//  *
//  * @param {object} props
//  * @returns
//  */
// const CheckBoxFilter = ({ name = "Filter Name", inputClass = "filter-class", handler = false, checked = true, value = -1 }) => {
//     const handleClick = event => {
//         if (handler != false) {
//             handler(value);
//         }
//     };

//     return (
//         <div className={`checkbox-filter checkbox-filter--${inputClass}`}>
//             <div className="checkbox-filter__checkbox">
//                 {checked ? (
//                     <>
//                         <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
//                         <input type="checkbox" name={inputClass} checked hidden />
//                     </>
//                 ) : (
//                     <>
//                         <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
//                         <input type="checkbox" name={inputClass} hidden />
//                     </>
//                 )}
//             </div>
//             <div className="checkbox-filter__name">
//                 <h3>{name}</h3>
//             </div>
//         </div>
//     );
// };
// export default CheckBoxFilter;



import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrack } from "../Actions";
import { setShow, setFirstLoad } from "../Actions";
import ImageLoader from "./ImageLoader";
import { getShowNameFromAcronym } from "../Utils/getSite";
import { FMXABX_getlogos } from "../Utils/getSite";


/**
 *
 * @param {object} props
 * @returns
 */
const CheckBoxFilter = ({ name = "Filter Name",
    inputClass = "filter-class",
    //removed for the time being 
    //handler = false,
    handler,
    checked = true,
    value = -1 }) => {
    const dispatch = useDispatch()
    const setTrackSelector = useSelector(state => state.filters.track)
    //set the show type
    const setShowSelector = useSelector(state => state.filters.show)
    const test = useSelector(state => state.filters.firstLoad)
    const state = useSelector(state => state)
    const { options } = state
    // Ref2 import
    const { show, extraMode, showsinglesetrack } = options

    const [check, setcheck] = useState(false)
    // console.log(name,"checbox")
    const handleClick = event => {


        //removing this for the time being 
        // if (handler != false) {
        // console.log(handler().type)

        if (setTrackSelector != undefined && handler().type == "SET_TRACK") {

            dispatch(setTrack(value));

        }

        /*  MULTYEXPO OPTION  PART DOWN HERE
        -THIS SET THE VALUE OF TE SHOW BY THE CLICKED ONE */

        if (setShowSelector != undefined && handler().type == "SET_SHOW") {

            // dispatch(setFirstLoad(false));
            dispatch(setShow(value));
            //    console.log(test)
        }
        // console.log("setDaySelector",setDaySelector)
    };

    let exa
    let orderShowButton
let showsinglesetrackShowOrHide
    const showsinglesetrackFunction= (name,showsinglesetrack )=>{
       showsinglesetrackShowOrHide = showsinglesetrack===name ? true : false
       return showsinglesetrackShowOrHide
    }
    //*****Removing this as we are using the multi expo on the innovation agenda too
    // if(extraMode === "innovation-agenda" && (show == "FME" || show == "TEE"|| show == "ABE" )){

    //        return( "" )

    //     }
    // else{




    if (show == "FME") {

        return (


          

        
            // <div className={`checkbox-filter checkbox-filter--${inputClass} ${inputClass == show ? "order-0" : "order-1"}`}>
            //     {exa}
            //     <div className="checkbox-filter__checkbox">
            //         {checked ? (
            //             <>
            //                 <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
            //                 {/* <input type="checkbox" name={inputClass} checked hidden /> */}
            //             </>
            //         ) : (
            //             <>
            //                 <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
            //                 {/* <input type="checkbox" name={inputClass} hidden /> */}
            //             </>
            //         )}
            //     </div>
            //     <div className="checkbox-filter__name">
            //         {/* <h3 >{name}</h3>
            //         {name.includes("http") ? <ImageLoader alt="show logo" src={name} /> : <h3 >{name}</h3>} */}
            //      {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
            //     </div>
            // </div>
            // null
//!removing this above that shows the show filter all checked to create a page with one show checked only based on the show 


              <div className={`checkbox-filter ${name === "Foam" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>
                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>
        );
        
    } 
    
        if (show == "TEE") {

        return (

              <div className={`checkbox-filter ${name === "Thermal EU" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>
                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>
        );}
        if (show == "ABE") {

        return (


              <div className={`checkbox-filter ${name === "Adhesives EU" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>
                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>
        );}
    
    else if (show == "TME") {

        return (

            <div className={`checkbox-filter ${name === "Thermal Management" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>
                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>

        );
    } else if (show == "" || show == "") {

        return (
           

            <div  className={`checkbox-filter ${name === "Thermal Management" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>
                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                           
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">

                    {name === "Industry Stage" && (
                        <ImageLoader
                            alt="show logo"
                            src="https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/industry-small-agenda.png"
                            maxwidth="200px"
                            width="175px"
                        />
                    )}

                    {name === "Solutions Stage" && (
                        <ImageLoader
                            alt="show logo"
                            src="https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/solutions-small-agenda.png"
                            maxwidth="118px"
                            width="175px"
                        />
                    )}
                    {name === "Connection Hub" && (
                        <ImageLoader
                            alt="show logo"
                            src="https://oda0cs26.modx.dev/assets/resources/shared/web/apps/confman/hot-topic-logo-agenda.png"
                            maxwidth="118px"
                            width="210px"
                        />
                    )}
                </div>
            </div>

        );
    }   else if (show == "SPC" &&  showsinglesetrack) {
        return (
 // Ref2 uncheck and hide the buttonif matches the text in the laceholder
            <div style={{
                display: showsinglesetrackFunction(name,showsinglesetrack) ? "flex" : "none"
            }} className={`checkbox-filter ${name === "Ceramics" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>

                {exa}
                <div className="checkbox-filter__checkbox">

                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>

        );
    }
    
    else if (show == "CEX") {
        return (

            <div className={`checkbox-filter ${name === "Ceramics" ? `checkbox-filter--${inputClass} order-1` : `checkbox-filter--${inputClass} order-2`}`}>

                {exa}
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    {getShowNameFromAcronym(name).includes("http") ? <ImageLoader alt="show logo" src={getShowNameFromAcronym(name)} /> : <h3 >{name}</h3>}
                </div>
            </div>

        );
    }
    else if (show == "ABM") {
        return (null)

    }
    else {
        return (

            <div className={`checkbox-filter checkbox-filter--${inputClass}`}>
                <div className="checkbox-filter__checkbox">
                    {checked ? (
                        <>
                            <i onClick={handleClick} className="bi bi-check-square-fill" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} checked hidden /> */}
                        </>
                    ) : (
                        <>
                            <i onClick={handleClick} className="bi bi-square" style={{ cursor: "pointer" }}></i>
                            {/* <input type="checkbox" name={inputClass} hidden /> */}
                        </>
                    )}
                </div>
                <div className="checkbox-filter__name">
                    <h3>{name}</h3>
                </div>
            </div>

        );
    }
    // }



};
export default CheckBoxFilter;
