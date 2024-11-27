// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import { setMode, setProfile, setLoading, setDownloadList } from "../Actions";

// import Cta from "../../../common_components/Cta";

// import { getProfilePath } from "../Utils/GetPath";
// import { pushPageView } from "../Utils/pushPageView";

// class DesignSlide extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}

// 	isListed = ({ id, size }, downloadList) => {
// 		if (downloadList.length > 0) {
// 			return (
// 				downloadList.find(
// 					download => id === download.id && size === download.size
// 				) !== undefined
// 			);
// 		} else {
// 			return false;
// 		}
// 	};

// 	handleCheckbox = (id, size) => {
// 		this.props.setDownloadList(id, size);
// 	};

// 	render() {
// 		const { payload, options, downloadList } = this.props;

// 		const { id, Exhibitor_listing_type__c, pagetitle, web_logo, logo } =
// 			this.props.payload;

// 		const booth = payload["exhibitor-booth"];
		
// 		console.log("Payload ---->", this.props.payload);	

// 		return (
// 			<div
// 				className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} row`}
// 				id={id}>
// 				<div className="col-3 exhibitor-slide__logo">
// 					<span>
// 						<img
// 							className="img-fluid"
// 							src={web_logo !== "" ? web_logo : logo}
// 							alt={pagetitle}
// 						/>
// 					</span>
// 				</div>
// 				<div className="col-9 exhibitor-slide__body">
// 					<div style={{ width: "25%" }}>
// 						<h4 className="exhibitor-name">{pagetitle}</h4>
// 						<p className="exhibitor-booth">Booth Number: {booth}</p>
// 					</div>
// 					<div
// 						className="d-flex flex-column justify-content-center align-items-center"
// 						style={{ width: "25%" }}>
// 						{logo !== "" && logo.includes("filestack") ? (
// 							<Cta link={logo}>Big Logo</Cta>
// 						) : (
// 							<Cta size="max" color="black">
// 								No Big Logo
// 							</Cta>
// 						)}
// 					</div>
// 					<div
// 						className="d-flex flex-column justify-content-center align-items-center"
// 						style={{ width: "25%" }}>
// 						{web_logo !== "" && web_logo.includes("filestack") ? (
// 							<Cta link={web_logo}>Small Logo</Cta>
// 						) : (
// 							<Cta size="max" color="black">
// 								No Small Logo
// 							</Cta>
// 						)}
// 					</div>					
// 					<div
// 						className="checkboxes d-flex flex-column justify-content-center align-items-center"
// 						style={{ width: "25%" }}>
// 						{web_logo !== "" && web_logo.includes("filestack") ? (
// 							<div className="d-flex align-items-center">
// 								<label>Add Big Logo</label>
// 								{this.isListed(
// 									{ id, size: "BIG" },
// 									downloadList
// 								) ? (
// 									<input
// 										checked
// 										onClick={() =>
// 											this.handleCheckbox(id, "BIG")
// 										}
// 										type="checkbox"
// 										style={{ margin: "5px" }}
// 									/>
// 								) : (
// 									<input
// 										onClick={() =>
// 											this.handleCheckbox(id, "BIG")
// 										}
// 										type="checkbox"
// 										style={{ margin: "5px" }}
// 									/>
// 								)}
// 							</div>
// 						) : null}
// 						{logo !== "" && logo.includes("filestack") ? (
// 							<div className="d-flex align-items-center">
// 								<label>Add Small Logo</label>
// 								{this.isListed(
// 									{ id, size: "SMALL" },
// 									downloadList
// 								) ? (
// 									<input
// 										checked
// 										onClick={() =>
// 											this.handleCheckbox(id, "SMALL")
// 										}
// 										type="checkbox"
// 										style={{ margin: "5px" }}
// 									/>
// 								) : (
// 									<input
// 										onClick={() =>
// 											this.handleCheckbox(id, "SMALL")
// 										}
// 										type="checkbox"
// 										style={{ margin: "5px" }}
// 									/>
// 								)}
// 							</div>
// 						) : null}
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
// const mapStateToProps = (store, ownProps) => {
// 	return { ...store, payload: ownProps.payload };
// };
// export default connect(mapStateToProps, {
// 	setMode,
// 	setLoading,
// 	setProfile,
// 	setDownloadList,
// })(DesignSlide);

import React, { Component, useState } from "react";
import { connect,useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
	//  setMode,
	//  setProfile,
	//   setLoading,
	   setDownloadList } from "../Actions";

import Cta from "../../../common_components/Cta";

import { getProfilePath } from "../Utils/GetPath";
import { pushPageView } from "../Utils/pushPageView";

// class DesignSlide extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}

const DesignSlide=(props)=>{
const dispatch=useDispatch()
const downloadList=useSelector(state=>state.downloadList)
const [checkBig,setCheckBig]=useState(false)
const [checkSmall,setCheckSmall]=useState(false)

	const isListed = ({ id, size }, downloadList) => {
		if (downloadList.length > 0) {
			return (
				downloadList.find(
					download => id === download.id && size === download.size
				) !== undefined
			);
		} else {
			return false;
		}
	};

const	handleCheckbox = (e,id, size) => {
	
	if(e.target.name==="BIG"){
	setCheckBig(!checkBig)
	} else{
		setCheckSmall(!checkSmall)
		
	}
	   
		
		dispatch(setDownloadList(id, size));
	};

	
		const { payload, options } = props;

		const { id, Exhibitor_listing_type__c, pagetitle, web_logo, logo } =
			props.payload;

		const booth = payload["exhibitor-booth"];
		
		// console.log("Payload ---->", props.payload);
			

		return (
			<div
				className={`exhibitor-slide exhibitor-slide--${Exhibitor_listing_type__c} row`}
				id={id}>
				<div className="col-3 exhibitor-slide__logo">
					<span>
						<img
							className="img-fluid"
							src={web_logo !== "" ? web_logo : logo}
							alt={pagetitle}
						/>
					</span>
				</div>
				<div className="col-9 exhibitor-slide__body">
					<div style={{ width: "25%" }}>
						<h4 translate="no" className="exhibitor-name">{pagetitle}</h4>
						<p className="exhibitor-booth">Booth Number: {booth}</p>
					</div>
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{ width: "25%" }}>
						{logo !== "" && logo.includes("filestack") ? (
							<Cta link={logo}>Big Logo</Cta>
						) : (
							<Cta size="max" color="black">
								No Big Logo
							</Cta>
						)}
					</div>
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{ width: "25%" }}>
						{web_logo !== "" && web_logo.includes("filestack") ? (
							<Cta link={web_logo}>Small Logo</Cta>
						) : (
							<Cta size="max" color="black">
								No Small Logo
							</Cta>
						)}
					</div>					
					<div
						className="checkboxes d-flex flex-column justify-content-center align-items-center"
						style={{ width: "25%" }}>
						{web_logo !== "" && web_logo.includes("filestack") ? (
							<div className="d-flex align-items-center">
								<label>Add Big Logo</label>
								{isListed(
									{ id, size: "BIG" },
									downloadList
								) ? (
									<input
										checked={checkBig}
										onChange={(e) =>
										handleCheckbox(e,id, "BIG")
										}
										type="checkbox"
										name="BIG"
										style={{ margin: "5px" }}
									/>
								) : (
									<input
									    checked={checkBig}
										onChange={(e) =>
											handleCheckbox(e,id, "BIG")
										}
										type="checkbox"
										name="BIG"
										style={{ margin: "5px" }}
									/>
								)
								}
							</div>
						) : null}
						{logo !== "" && logo.includes("filestack") ? (
							<div className="d-flex align-items-center">
								<label>Add Small Logo</label>
								{isListed(
									{ id, size: "SMALL" },
									downloadList
								) ? (
									<input
									checked={checkSmall}
										onChange={(e) =>
											handleCheckbox(e,id, "SMALL")
										}
										type="checkbox"
										name="SMALL"
										style={{ margin: "5px" }}
										
									/>
								) : (
									<input
									checked={checkSmall}
										onChange={(e) =>
											handleCheckbox(e,id, "SMALL")
										}
										type="checkbox"
										name="SMALL"
										style={{ margin: "5px" }}
									/>
								)}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}

// const mapStateToProps = (store, ownProps) => {
// 	return { ...store, payload: ownProps.payload };
// };
// export default connect(mapStateToProps, {
// 	// setMode,
// 	// setLoading,
// 	// setProfile,
// 	// setDownloadList,
// })(DesignSlide);
export default DesignSlide