import React from "react";
import Cta from "./Cta";
import Product from "./Product";
import ModalCta from "./ModalCta";

class Listing extends React.Component {
	constructor(props) {
		super(props);
		this.link= "../exhibitor-list/exhibitor?boothid=" + props.booth_data.id;
	}

	openDrilldown = () => {
		window.open(this.link, "_self");
	};

	render() {
		return (
			<div className="col-md-9">
				<div className="exhibitor-article__listing-cta hidden-sm hidden-md hidden-lg">
					<Cta
						text="ENHANCED LISTING"
						size="small"
						type={this.props.booth_data.Exhibitor_listing_type__c == "Enhanced" ? "enhanced-listing" : "premium-listing"}
					/>
				</div>
				<div className="row">
					<div className="listing-titles">
						<h2 onClick={this.openDrilldown} className="hidden-xs">{this.props.booth_data.pagetitle}</h2>
						<h1 className="">{this.props.data.Title__c}</h1>
					</div>
					<Product image={this.props.data.Link__c} body={this.props.data.Body__c} name={this.props.data.Title__c} />
					<div className="padded-cta">
						<ModalCta
							size="small"
							type="reg"
							text="Enquire about product"
							booth_data={this.props.booth_data}
							options={this.props.options}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default Listing;
