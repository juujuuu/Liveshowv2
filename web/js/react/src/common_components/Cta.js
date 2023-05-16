// import React from "react";

// class Cta extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	static defaultProps = {
// 		link: false,
// 		download: false,
// 		handler: false,
// 		children: "CTA",
// 		/* max, reg , micro*/
// 		size: "reg",
// 		curved: true,
// 		target: "_self",
// 		/*primary == override
// 		ocs-blue==OCS
// 		sat-blue==SAT
// 		sat-dark-blue==SAT Dark Blue
// 		fmc==FMC
// 		cex-gold==CEX Gold
// 		cex-purple==CEX Purple
// 		cex-secondary==CEX White
// 		cex-red==CEX Red
// 		black==black*/
// 		color: "cex-red",
// 		active: true,
// 		value: false,
// 		role: false,
// 		margin: "vertical-margin--10",
// 		bonusClass: "",
// 		payload: false,
// 	};

// 	getExhibAssetsList = (exhibitor) => {
// 		const { Assets_Downloadable_Resource_Count__c, Assets_News_Count__c, Assets_Product_Count__c, Assets_Video_Count__c } = exhibitor;
// 		return (
// 			<span className="curved-cta__exhib-assets">
// 				<span>
// 					<i className="bi bi-envelope-fill"></i>
// 				</span>
// 				{Assets_Downloadable_Resource_Count__c > 0 ? (
// 					<span>
// 						<i className="bi bi-file-earmark-fill"></i>
// 					</span>
// 				) : null}
// 				{Assets_News_Count__c > 0 ? (
// 					<span>
// 						<i className="bi bi-newspaper"></i>
// 					</span>
// 				) : null}
// 				{Assets_Product_Count__c > 0 ? (
// 					<span>
// 						<i className="bi bi-cart-fill"></i>
// 					</span>
// 				) : null}
// 				{Assets_Video_Count__c > 0 ? (
// 					<span>
// 						<i className="bi bi-play-circle-fill"></i>
// 					</span>
// 				) : null}
// 			</span>
// 		);
// 	};

// 	handleClick = () => {
// 		const { role, handler, value } = this.props;
// 		if (handler != false) {
// 			if (role == false) {
// 				handler();
// 			} else if (role == "exhib-assets") {
// 				handler();
// 			} else if (role == "expand") {
// 				handler(value);
// 			} else if (role == "collapse") {
// 				handler(value);
// 			} else if (role == "pop-form") {
// 				//handle by site jquery
// 			} else if (role == "expo-query") {
// 				handler(value);
// 			}
// 		}
// 		return;
// 	};
// 	render() {
// 		const { size, curved, color, active, margin, bonusClass, link, download, children, payload, role, target } = this.props;

// 		switch (role) {
// 			case "pop-form":
// 				/* modal pop up form */
// 				return (
// 					<button
// 						className={`react__cta curved-cta react__cta--reg-pop curved-cta--${size} ${
// 							!curved ? "curved-cta--hard" : ""
// 						} curved-cta--${color} ${active ? "active" : ""} ${margin} ${bonusClass}`}>
// 						<a className="curved-cta__link" href={link} title={children}>
// 							{children}
// 						</a>
// 					</button>
// 				);
// 			case "exhib-assets":
// 				//Exhib assets button
// 				const {Exhibitor_listing_type__c} = payload; 
// 				const enhanced = Exhibitor_listing_type__c != "Standard"; //no assets if standard
// 				return (
// 					<button
// 						className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${
// 							active ? "active" : ""
// 						} ${margin} ${bonusClass}`}
// 						onClick={this.handleClick}>
// 						{link != false ? (
// 							<a className="curved-cta__link" href={link} download={download} title={children}>
// 								<span className="curved-cta__text">{children}</span>
// 								{enhanced ? this.getExhibAssetsList(payload): null}
// 							</a>
// 						) : (
// 							<span className="curved-cta__link" >
// 								<span className="curved-cta__text">{children}</span>
// 								{enhanced ? this.getExhibAssetsList(payload) : null}
// 							</span>
// 						)}
// 					</button>
// 				);
// 			default:
// 				return (
// 					<button
// 						className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${
// 							active ? "active" : ""
// 						} ${margin} ${bonusClass}`}
// 						onClick={this.handleClick}>
// 						{link != false ? (
// 							<a className="curved-cta__link" href={link} download={download} title={children} target={target}>
// 								{children}
// 							</a>
// 						) : (
// 							<span className="curved-cta__link">
// 								{children}
// 							</span>
// 						)}
// 					</button>
// 				);
// 		}
// 	}
// }
// export default Cta;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchConference,
	setLoading,
	setOpenSlides,
	setDay,
	setTrack,
	setLetter,
	setDealtWithInitialParams,
	setQuery,
	resetFiltersAction,
	setError,
	setLowestDay,
} from "../confman/src/Actions";

const Cta = ({
	link = false,
	download = false,
	handler = false,
	handlerTest = "ciao",
	children = "CTA",
	/* max, reg , micro*/
	size = "reg",
	curved = true,
	target = "_self",
	/*primary == override
	ocs-blue==OCS
	sat-blue==SAT
	sat-dark-blue==SAT Dark Blue
	fmc==FMC
	cex-gold==CEX Gold
	cex-purple==CEX Purple
	cex-secondary==CEX White
	cex-red==CEX Red
	black==black*/
	color = "cex-red",
	active = true,
	value = false,
	role = false,
	margin = "vertical-margin--10",
	bonusClass = "",
	payload = false,
}) => {

	const dispatch = useDispatch()
	const lowestDay = useSelector(state => state.lowestDay)
	const getExhibAssetsList = (exhibitor) => {
		const { Assets_Downloadable_Resource_Count__c, Assets_News_Count__c, Assets_Product_Count__c, Assets_Video_Count__c } = exhibitor;
		return (
			<span className="curved-cta__exhib-assets">
				<span>
					<i className="bi bi-envelope-fill"></i>
				</span>
				{Assets_Downloadable_Resource_Count__c > 0 ? (
					<span>
						<i className="bi bi-file-earmark-fill"></i>
					</span>
				) : null}
				{Assets_News_Count__c > 0 ? (
					<span>
						<i className="bi bi-newspaper"></i>
					</span>
				) : null}
				{Assets_Product_Count__c > 0 ? (
					<span>
						<i className="bi bi-cart-fill"></i>
					</span>
				) : null}
				{Assets_Video_Count__c > 0 ? (
					<span>
						<i className="bi bi-play-circle-fill"></i>
					</span>
				) : null}
			</span>
		);
	};

	const handleClick = () => {


		if (handler != false) {

			if (role == false) {
				//CTA to clear filters 
				dispatch(resetFiltersAction({ track: [], day: lowestDay, query: "", letter: -1 }));
				dispatch(setOpenSlides(false));
				document.getElementById("confman__search").value = "";
		
				"clearSpeaker"

			}else if(role=="clearSpeaker"){
				dispatch(resetFiltersAction());
				//     document.getElementById("react__search").value = "";
			} else if (role == "clearFiltersConf") {

				dispatch(resetFiltersAction({ track: [], day: lowestDay, query: "", letter: -1 }));
				dispatch(setOpenSlides(false));
				// ALERT("LERT spEAKERlIST TO DO") 
				// document.getElementById("confman__search").value = "as";
				

			} else if (role == "exhib-reset" || role == "exhibDownloadPDF" || role == "contactExhibitor" || role== "EnquireAboutProduct") {
				handler()

			}
			// else if (role == "exhibDownloadPDF") {
			// 	handler()
			// }
			// else if (role=="contactExhibitor") {
			// 	handler()
			// }

			else if (role == "exhib-assets") {
				handler();
			} else if (role == "expand") {

				// console.log("pass",handler)
				// console.log(handlerTest)
				dispatch(setOpenSlides(value))
				// handler(value);
			} else if (role == "collapse") {
				dispatch(setOpenSlides(value))
				// handler(value);
			} else if (role == "pop-form") {
				//handle by site jquery
			} else if (role == "expo-query") {
				handler(value);
			}
		}
		return;
	};

	// const { size, curved, color, active, margin, bonusClass, link, download, children, payload, role, target } = this.props;


	switch (role) {
		case "pop-form":
			/* modal pop up form */
			return (
				<button
					className={`react__cta curved-cta react__cta--reg-pop curved-cta--${size} ${!curved ? "curved-cta--hard" : ""
						} curved-cta--${color} ${active ? "active" : ""} ${margin} ${bonusClass}`}>
					<a className="curved-cta__link" href={link} title={children}>
						{children}
					</a>
				</button>
			);
		case "exhib-assets":
			//Exhib assets button
			const { Exhibitor_listing_type__c } = payload;
			const enhanced = Exhibitor_listing_type__c != "Standard"; //no assets if standard
			return (
				<button
					className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${active ? "active" : ""
						} ${margin} ${bonusClass}`}
					onClick={handleClick}>
					{link != false ? (
						<a className="curved-cta__link" href={link} download={download} title={children}>
							<span className="curved-cta__text">{children}</span>
							{enhanced ? getExhibAssetsList(payload) : null}
						</a>
					) : (
						<span className="curved-cta__link" >
							<span className="curved-cta__text">{children}</span>
							{enhanced ? getExhibAssetsList(payload) : null}
						</span>
					)}
				</button>
			);
		default:
			return (
				<button
					className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${active ? "active" : ""
						} ${margin} ${bonusClass} `}
					onClick={handleClick}>
						
					{link != false ? (
						<a className="curved-cta__link" href={link} download={download} title={children} target={target}>
							{children}
						</a>
					) : (
						<span className="curved-cta__link">
							{children}
						</span>
					)}
				</button>
			);
	}
}

export default Cta;
