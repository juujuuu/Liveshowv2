import React from "react";
import Cta from "./Cta";
import Bio from "./Bio";
import HorizontalItems from "./HorizontalItems";
import VerticalItems from "./VerticalItems";
import News from "./News";
import Video from "./Video";
import Downloadable from "./Downloadable";
import QuickMenu from "./QuickMenu";

class Listing extends React.Component {
	constructor(props) {
		super(props);
	}

	getAssets = (data) => {
		let types = this.getTypes(data);
		return (
			<div className="exhibitor-drilldown__content">
				<Bio
					name={this.props.data.pagetitle}
					logo={this.props.data.web_logo}
					webbio={this.props.data.content}
					enhancedbio={this.props.data.Company_Bio_Enhanced__c}
					link={this.props.data.url}
					cats={this.props.data["exhibitor-cat"]}
				/>

				{types.map((type, index) => {
					switch (type) {
						case "Video":
							return (
								<HorizontalItems id="videos" key={"HR " + index} title="Exhibitor Videos">
									{this.populate(data, type)}
								</HorizontalItems>
							);
							break;
						case "Downloadable Resource":
							return (
								<HorizontalItems id="downloads" key={"HR " + index} title="Resource Downloads">
									{this.populate(data, type)}
								</HorizontalItems>
							);
							break;
						case "Product":
							return (
								<VerticalItems id="products" key={"VR " + index} title="Featured Products">
									{this.populate(data, type)}
								</VerticalItems>
							);
							break;
						case "News":
							return (
								<VerticalItems id="news" key={"VR " + index} title="News Articles">
									{this.populate(data, type)}
								</VerticalItems>
							);
							break;
					}
				})}
			</div>
		);
	};

	populate = (data, type) => {
		data = data.filter((item) => {
			return type === item.Asset_Type__c;
		});
		return data.map((item, index) => {
			switch (type) {
				case "Video":
					return (
						<Video
							key={"video " + index}
							link={item.Link__c}
							title={item.Title__c}
							exName={this.props.data.pagetitle}
							id={this.props.data.id}
							data-type={"Video"}
						/>
					);
					break;
				case "Downloadable Resource":
					return (
						<Downloadable
							key={"Downloadable " + index}
							title={item.Title__c}
							link={item.Link__c}
							thumb={item.Thumbnail_Link__c}
							type={item.File_Type__c}
							exName={this.props.data.pagetitle}
							id={this.props.data.id}
							data-type={"Downloadable"}
						/>
					);
					break;
				case "Product":
					return (
						<News
							product={true}
							id={item.Id}
							intro={item.Intro__c}
							key={"product " + index}
							image={item.Link__c}
							body={item.Body__c}
							title={item.Title__c}
							booth={this.props.data}
							options={this.props.options}
							data-type={"Product"}
						/>
					);
					break;
				case "News":
					return (
						<News
							intro={item.Intro__c}
							id={item.Id}
							key={"news " + index}
							body={item.Body__c}
							image={item.Link__c}
							title={item.Title__c}
							booth={this.props.data}
							options={this.props.options}
							data-type={"News"}
						/>
					);
					break;
			}
		});
	};

	getTypes = (data) => {
		let types = [];
		data.forEach((item) => {
			if (!types.includes(item.Asset_Type__c)) {
				types.push(item.Asset_Type__c);
			}
		});
		return types;
	};
	showCta = (hide) => {
		if (!hide) {
			return (
				<div className="exhibitor-drilldown__listing-cta hidden-xs hidden-sm">
					<Cta
						text="ENHANCED LISTING"
						size="small"
						type={this.props.data.Exhibitor_listing_type__c == "Enhanced" ? "enhanced-listing" : "premium-listing"}
					/>
				</div>
			);
		}
	};
	render() {
		return (
			<div className="col-md-9">
				<div className="row">
					{this.showCta(this.props.options)}
					<h1 className="hidden-xs hidden-sm h1-mob">{this.props.data.pagetitle}</h1>
					<QuickMenu types={this.getTypes(this.props.data.Exhibitor_Assets__r)} />
				</div>
				{this.getAssets(this.props.data.Exhibitor_Assets__r)}
			</div>
		);
	}
}
export default Listing;
