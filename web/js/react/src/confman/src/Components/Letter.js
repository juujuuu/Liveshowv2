// import React from "react";
// /**
//  * Letters for the alphabet filter on the Speaker list.
//  * @param {object} props
//  */
// const Letter = ({ value = "-1", handler = false, children }) => {
//     const handleClick = event => {
//         if (handler != false) {
//             handler(value);
//         }
//     };
//     return (
//         <a className="confman__letter" onClick={handleClick}>
//             {children}
//         </a>
//     );
// };

// export default Letter;



import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
/**
 * Letters for the alphabet filter on the Speaker list.
 * @param {object} props
 */
import {setLetter} from "../Actions";

const Letter = ({ value = "-1", handler = false, children }) => {
    const dispatch= useDispatch()
    const handleClick = event => {
        if (handler != false) {
           dispatch(setLetter(value));
        }
    };
    return (
        <a className="confman__letter" onClick={handleClick}>
            {children}
        </a>
    );
};

export default Letter;
