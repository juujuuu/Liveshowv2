// import React from "react";

// class SearchInput extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { value: "" };
// 	}
// 	static defaultProps = {
// 		role: false,
// 		handler: false,
// 		placeholder: "",
// 		bonusClass: "",
// 	};
// 	handleChange = (event) => {
// 		const val = event.target.value;
// 		if (this.props.role == "conference-search") {
// 			this.setState((prevState) => {
// 				prevState.value = val;
// 				return prevState;
// 			});
// 		} else {
// 			if (this.props.handler != false) {
// 				this.props.handler(val);
// 			}
// 		}
// 	};
// 	handleSubmit = (event) => {
// 		event.preventDefault();
// 		if (this.props.role != false) {
// 			if (this.props.handler != false) {
// 				let val = this.state.value;
// 				this.props.handler(val);
// 			}
// 		}
// 	};

// 	render() {
// 		const { role, value, placeholder, bonusClass } = this.props;
// 		if (role == false) {
// 			return (
// 				<form className={`react__search react__search`} onSubmit={this.handleSubmit}>
// 					<input
// 						id="react__search"
// 						className={bonusClass}
// 						type="text"
// 						name="react__search"
// 						placeholder={placeholder}
// 						value={value}
// 						onChange={this.handleChange}
// 					/>
// 				</form>
// 			);
// 		} else if (role == "conference-search") {
// 			return (
// 				<form className="react__search react__search--conference" onSubmit={this.handleSubmit}>
// 					<input
// 						onChange={this.handleChange}
// 						id="confman__search"
// 						type="text"
// 						name="confman_search"
// 						placeholder={placeholder}
// 						value={value}
// 					/>
// 					<span onClick={this.handleSubmit}>{">"}</span>
// 				</form>
// 			);
// 		}
// 	}
// }

// export default SearchInput;

import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { setQuery} from "../confman/src/Actions"
const SearchInput =({
	role= false,
	handler= false,
	placeholder= "",
	bonusClass= "",
})=> {
	const dispatch=useDispatch()
	// const valueQuery=useSelector(state=>state.filters.query)
	const queries=useSelector(state=>state.queries)
  
	//the default value of useState is linked to redux store
	
	const [value,setValue]=useState(queries.search)
	//every time the app re-render it updates the value of the field search
	//this to allow the button clear filters to reset the field when the provider 
	//filterquery is  empty & so the field should follow
	useEffect(()=>{
		setValue(queries.search)
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
				setValue(event.target.value)
				handler(val);
				
				
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
