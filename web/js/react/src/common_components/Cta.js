import React from "react";

class Cta extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		link: false,
		download: false,
		handler: false,
		children: "CTA",
		/* max, reg , micro*/
		size: "reg",
		curved: true,
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
		color: "cex-red",
		active: true,
		value: false,
		role: false,
		margin: "vertical-margin--10",
		bonusClass: "",
		exhibAssets: false,
		payload: false,
	};

	getExhibAssetsList = (exhibitor) => {
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

	handleClick = () => {
		if (this.props.handler != false) {
			if (this.props.role == false) {
				this.props.handler();
			} else if (this.props.role == "expand") {
				this.props.handler(this.props.value);
			} else if (this.props.role == "collapse") {
				this.props.handler(this.props.value);
			} else if (this.props.role == "pop-form") {
				//handle by site jquery
			}
		}
		return;
	};
	render() {
		const { size, curved, color, active, margin, bonusClass, link, download, children, exhibAssets, payload } = this.props;
		console.log(this.props.bonusClass, this.props.role, "exhib assets " ,this.props.exhibAssets, " ", this.props.exhibAssets != false);
		switch (this.props.role) {
			case "pop-form":
				/* modal pop up form */
				return (
					<button
						className={`react__cta curved-cta react__cta--reg-pop curved-cta--${size} ${
							!curved ? "curved-cta--hard" : ""
						} curved-cta--${color} ${active ? "active" : ""} ${margin} ${bonusClass}`}>
						<a className="curved-cta__link" href={link} title={children}>
							{children}
						</a>
					</button>
				);
			case false && this.props.exhibAssets !== false:
				//Exhib assets button
				console.log(this.props.bonusClass, " Here");
				return (
					<button
						className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${
							active ? "active" : ""
						} ${margin} ${bonusClass}`}
						onClick={this.handleClick}>
							{link != false ? (
							<a className="curved-cta__link" href={link} download={download} title={children}>
								<span className="curved-cta__text">{children}</span>
								{this.getExhibAssetsList(payload)}
							</a>
						) : (
							<a className="curved-cta__link" title={children}>
								<span className="curved-cta__text">{children}</span>
								{this.getExhibAssetsList(payload)}
							</a>
						)}
					</button>
				);
			default:
				return (
					<button
						className={`react__cta curved-cta curved-cta--${size} ${!curved ? "curved-cta--hard" : ""} curved-cta--${color} ${
							active ? "active" : ""
						} ${margin} ${bonusClass}`}
						onClick={this.handleClick}>
						{link != false ? (
							<a className="curved-cta__link" href={link} download={download} title={children}>
								{children}
							</a>
						) : (
							<a className="curved-cta__link" title={children}>
								{children}
							</a>
						)}
					</button>
				);
		}
	}
}
export default Cta;
