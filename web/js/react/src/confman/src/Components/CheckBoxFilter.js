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



import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrack } from "../Actions";
import { setShow,setFirstLoad } from "../Actions";


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
    const test =useSelector(state=>state.filters.firstLoad) 
      const state=useSelector(state=>state)
      const{options}=state
      const {show,extraMode}=options
  
const [check, setcheck] = useState(false)
// console.log(name,"checbox")
    const handleClick = event => {


        //removing this for the time being 
        // if (handler != false) {
            // console.log(handler().type)

        if (setTrackSelector != undefined && handler().type=="SET_TRACK") {
          
            dispatch(setTrack(value));
            
        }
      
        /*  MULTYEXPO OPTION  PART DOWN HERE
        -THIS SET THE VALUE OF TE SHOW BY THE CLICKED ONE */ 
        
        if (setShowSelector != undefined && handler().type=="SET_SHOW") {
            
            // dispatch(setFirstLoad(false));
           dispatch(setShow(value));
        //    console.log(test)
        }
        // console.log("setDaySelector",setDaySelector)
    };

       let exa

       //*****Removing this as we are using the multi expo on the innovation agenda too
// if(extraMode === "innovation-agenda" && (show == "FME" || show == "TEE"|| show == "ABE" )){
    
//        return( "" )
     
//     }
    // else{
      if (show == "FME" || show == "TEE"|| show == "ABE"  ){
      
        return (      

            <div className={`checkbox-filter checkbox-filter--${inputClass}`}>
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
                    <h3>{name}</h3>
                </div>
            </div>
            
        );
      }else{
        return (      

            <div className={`checkbox-filter checkbox-filter--${inputClass}`}>
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
                    <h3>{name}</h3>
                </div>
            </div>
            
        );
                    }
    // }
    

   
};
export default CheckBoxFilter;
