// import React, { useState } from "react";

// /**
//  * Searchy component for the speaker list and full agenda
//  * @param {object} props
//  */
// const SearchInput = ({ role = false, handler = false, placeholder = "", value }) => {
//     const [internalValue, setinternalValue] = useState("");

//     const handleChange = event => {
//         const val = event.target.value;
//         if (role == "conference-search") {
//             setinternalValue(val);
//         } else {
//             if (handler != false) {
//                 handler(val);
//             }
//         }
//     };

//     const handleSubmit = event => {
//         event.preventDefault();
//         if (role != false) {
//             if (handler != false) {
//                 let val = internalValue;
//                 handler(val);
//             }
//         }
//     };

//     //speaker list
//     if (role == false) {
//         return (
//             <form className="confman__search confman__search--standard" onSubmit={handleSubmit}>
//                 <input id="confman__search" type="text" name="confman_search" placeholder={placeholder} value={value} onChange={handleChange} />
//             </form>
//         );
//     } else {
//         //full agenda
//         return (
//             <form className="confman__search confman__search--conference" onSubmit={handleSubmit}>
//                 <input onChange={handleChange} id="confman__search" type="text" name="confman_search" placeholder={placeholder} value={internalValue} />
//                 {role == "conference-search" ? <span onClick={handleSubmit}>{">"}</span> : ""}
//             </form>
//         );
//     }
// };

// export default SearchInput;


import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { setQuery} from "../Actions"
const SearchInput =({
	role= false,
	handler= false,
	placeholder= "",
	bonusClass= "",
})=> {
	const dispatch=useDispatch()
	const valueQuery=useSelector(state=>state.filters.query)
	//the default value of useState is linked to redux store
	
	const [value,setValue]=useState(valueQuery)
	//every time the app re-render it updates the value of the field search
	//this to allow the button clear filters to reset the field when the provider 
	//filterquery is  empty & so the field should follow
	useEffect(()=>{
		setValue(valueQuery)
	})
	const handleChange = (event) => {
		
		const val = event.target.value;
		if (role == "conference-search") {
			dispatch(setQuery(val))
			setValue((prevValue) => {
				prevValue = val;
				return prevValue;
				
			});
		} else {
			if (handler != false) {
				dispatch(setQuery(val));
				
			}
		}
	};
	// this is not used by confman anymore will updated when i work on the other apps 
	const handleSubmit = (event) => {
		
		event.preventDefault();
		if (role != false) {
		
			if (handler != false) {
				let val = value;
			dispatch(setQuery(val));
				
			}
		}
	};


		if (role == false) {
			return (
				<form className={`react__search react__search`} onSubmit={handleSubmit}>
					<input
						id="react__search"
						className={bonusClass}
						type="text"
						name="react__search"
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
					/>
				</form>
			);
		} else if (role == "conference-search") {
			return (
				<form className="react__search react__search--conference" onSubmit={handleSubmit}>
					<input
						onChange={handleChange}
						id="confman__search"
						type="text"
						name="confman_search"
						placeholder={placeholder}
						value={value}
					/>
					
					{/* removed the submit option and added the dispatch onChange */}
					{/* <span onClick={handleSubmit}>{">"}</span> */}
					<span>{">"}</span>
				
				</form>
			);
		}
	}


export default SearchInput;
