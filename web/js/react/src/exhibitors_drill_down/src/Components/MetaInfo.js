import React from "react";
import Cta from "./Cta";
import ModalCta from "./ModalCta";

class MetaInfo extends React.Component {
	constructor(props) {
		super(props);
		this.class = "col-md-3 exhibitor-drilldown__meta " + props.hide;
	}

	getBooth = (continent) => {
		if (continent === "USA") {
			return "Booth";
		} else if (continent === "Europe") {
			return "Stand";
		} else {
			return "Booth";
		}
	};
	showEnhanced = (hide) => {
		console.log(hide);
		if (!hide) {
			return (
				<div className="exhibitor-drilldown__listing-cta hidden-md hidden-lg hidden-xl hidden-xxl">
					<Cta
						text="ENHANCED LISTING"
						size="small"
						type={this.props.data.Exhibitor_listing_type__c == "Enhanced" ? "enhanced-listing" : "premium-listing"}
					/>
				</div>
			);
		}
	};
	getMeta = (data) => {
		return (
			<div className="meta-data">
				<h4>Contact</h4>
				<p>
					<a
						href={data.url.includes("http") ? data.url : "http://" + data.url}
						target="_blank"
						title={data.Exhibiting_Name__c}>
						<i className="bi bi-link-45deg">
							{"  "}
							</i>{" "}
						Website
					</a>
				</p>
				{data.Link_to_MYS_Floorplan__c != null ? (
					<p>
						<a href={data.Link_to_MYS_Floorplan__c} target="_blank" title="floorplan">
							<span>
								<img
									style={{ width: "20px", height: "auto" }}
									src="../assets/web/js/react/src/exhibitors_drill_down/assets/nearby.png"
								/>
							</span>{" "}
							View on floorplan
						</a>
					</p>
				) : (
					""
				)}
				{data.Linkedin__c != null ? (
					<p>
						<a href={data.Linkedin__c} target="_blank" title="Linkedin">
							<span>
								<img
									style={{ width: "20px", height: "auto" }}
									src="../assets/web/js/react/src/exhibitors_drill_down/assets/linkedin.svg"
								/>
							</span>{" "}
							Linkedin
						</a>
					</p>
				) : (
					""
				)}
				{data.Facebook__c != null ? (
					<p>
						<a href={data.Facebook__c} target="_blank" title="Facebook">
							<span>
								<img
									style={{ width: "20px", height: "auto" }}
									src="../assets/web/js/react/src/exhibitors_drill_down/assets/facebook.svg"
								/>
							</span>{" "}
							Facebook
						</a>
					</p>
				) : (
					""
				)}
				{data.Twitter__c != null ? (
					<p>
						<a href={data.Twitter__c} target="_blank" title="Twitter">
							<span>
								<img
									style={{ width: "20px", height: "auto" }}
									src="../assets/web/js/react/src/exhibitors_drill_down/assets/twitter.svg"
								/>
							</span>{" "}
							Twitter
						</a>
					</p>
				) : (
					""
				)}
				{data.Youtube_Channel__c != null ? (
					<p>
						<a href={data.Youtube_Channel__c} target="_blank" title="YouTube">
							<span>
								<img
									style={{ width: "20px", height: "auto" }}
									src="../assets/web/js/react/src/exhibitors_drill_down/assets/youtube.svg"
								/>
							</span>{" "}
							Youtube
						</a>
					</p>
				) : (
					""
				)}
				{data.Company_Address__c != null ? (
					<p className="address">
						<i style={{color: "black"}} className="bi bi-house-door-fill"></i> Address: <br />
						{data.Company_Address__c != null ? (
							<>
								<span>{data.Company_Address__c}, </span>
								<br />
							</>
						) : (
							""
						)}
						{data.Company_City__c != null ? (
							<>
								<span>{data.Company_City__c}, </span>
								<br />
							</>
						) : (
							""
						)}
						{data.Company_State__c != null ? (
							<>
								<span>{data.Company_State__c}, </span>
								<br />
							</>
						) : (
							""
						)}
						{data.country != null ? (
							<>
								<span>{data.country} </span>
								<br />
							</>
						) : (
							""
						)}
					</p>
				) : (
					""
				)}
			</div>
		);
	};

	getRegLink = (regLink) => {
		if (regLink != null && regLink != "") {
			return (
				<div className="message">
					<p>
						Don't forget to register today to meet {this.props.data.pagetitle} at {this.props.options.event}
					</p>
					<Cta size="micro" type="reg" text="REGISTER FOR FREE" />
				</div>
			);
		}
	};

	getCats = (cats) => {
		if(!cats){return;}
		cats = cats.split(";");
		cats = cats.map((cat, index) => {
			if (index + 1 !== cats.length) {
				return (
					<>
						{cat}
						{" / "}
					</>
				);
			} else {
				return <>{cat}</>;
			}
		});
		return <>{cats}</>;
	};

	render() {
		if (this.props.affix) {
			return (
				<div className={this.class}>
					<div>
						<div className="affix-top" data-spy="affix" data-offset-top="100" data-offset-bottom="500">
							<div className="main-cta">
								<ModalCta
									size="small"
									type="reg"
									text="Contact Exhibitor"
									data={this.props.data}
									options={this.props.options}
								/>
							</div>
							<div className="booth">
								<h4>{this.getBooth(this.props.options.continent)} Number: {this.props.data["exhibitor-booth"]}</h4>
							</div>
							{this.getMeta(this.props.data)}
							{this.getRegLink()}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className={this.class}>
					{this.showEnhanced(this.props.options)}
					<div className="row">
						<div>
							<div className="mob-upper">
								<h1>{this.props.data.pagetitle}</h1>
								<img
									className="img-fluid"
									src={this.props.data.web_logo}
									alt={this.props.data.pagetitle}
								/>
							</div>
							<div className="main-cta">
								<ModalCta
									size="small"
									type="reg"
									text="Contact Exhibitor"
									data={this.props.data}
									options={this.props.options}
								/>
							</div>
							<div className="booth">
								<h4>{this.getBooth(this.props.options.continent)} Number: {this.props.data["exhibitor-booth"]}</h4>
							</div>
							{this.getMeta(this.props.data)}
							{this.getRegLink()}
							<div className="mob-lower">
								<div className="bio">
									<p className="short-bio">{this.props.data.content}</p>
									<div
										className="long-bio"
										dangerouslySetInnerHTML={{ __html: this.props.data.Company_Bio_Enhanced__c }}></div>
									<div className="cats">
										<p>
											<i>
												<span>Categories: </span>
												{this.getCats(this.props.data["exhibitor-cat"])}
											</i>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
export default MetaInfo;
