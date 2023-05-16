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
/**
 *
 * @param {object} props
 * @returns
 */
const CheckBoxFilter = ({ name = "Filter Name",
    inputClass = "filter-class",
    //removed for the time being 
    //handler = false,
    checked = true,
    value = -1 }) => {
    const dispatch = useDispatch()
    const setTrackSelector = useSelector(state => state.filters.track)
      const state=useSelector(state=>state)
const [check, setcheck] = useState(false)

    const handleClick = event => {


        //removing this for the time being 
        // if (handler != false) {
        if (setTrackSelector != undefined) {
            dispatch(setTrack(value));
        }
    };
console.log("checked",checked)
console.log("state",state)
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
};
export default CheckBoxFilter;
