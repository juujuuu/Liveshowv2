import React from "react";
import LazyLoad from "react-lazyload";
import ExhibitorSlideCats from "./ExhibitorSlideCats";
import EnhancedCta from "./EnhancedCta";

class ExhibitorSlide extends React.Component {
	constructor(props) {
		super(props);
		let link = "../exhibitor-list/exhibitor?boothid=" + props.id.substring(0, props.id.length - 3);
		this.state = { drilldownlink: link };
	}
	//set what booth is called ie 'stand' or 'booth'
	getBooth = (continent) => {
		if (continent === null) {
			return "Booth";
		} else if (continent === "Europe") {
			return "Stand";
		} else {
			return "Booth";
		}
	};
	openDrilldown = () => {
		window.open(this.state.drilldownlink, "_self");
	};
	getListingCTA = (enhancedtext, listing_type, assettypes) => {
		if (listing_type === "Premium") {
			return (
				<EnhancedCta text="Premium Listing" size="small" type="premium-listing" clickHandler={this.openDrilldown} assettypes={assettypes} />
			);
		} else if (listing_type === "Enhanced") {
			return (
				<EnhancedCta text="Enhanced Listing" size="small" type="enhanced-listing" clickHandler={this.openDrilldown} assettypes={assettypes} />
			);
		} else {
			return <EnhancedCta text="View Profile" size="small" type="enhanced-listing" clickHandler={this.openDrilldown} assettypes={assettypes} />;
		}
	};
	render() {		
		return (
			<div className={`row exhibitor-slide exhibitor-slide--${this.props.listing_type} exhibitor-slide--${this.props.show_code}`} id={this.props.id}>
				<div className="exhibitor-slide__hr">
					<hr />
					{this.getListingCTA(this.props.options.enhancedtext, this.props.listing_type, this.props.assettypes)}
				</div>
				<div className="exhibitor-slide__desk  visible-lg visible-xl visible-xxl hidden-xs hidden-sm hidden-md">
					<div className="row">
						<div className="exhibitor-slide__side-flag"></div>
						<div className="col-md-3 exhibitor-slide__logo">
							<div>
									<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
										<img src={this.props.weblogo} alt="logo" />
									</a>
							</div>
						</div>
						<div className="col-md-5 exhibitor-slide__body">
							<div>
								<h4>
									<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
										{this.props.name}
									</a>
								</h4>
								<p>
									{this.getBooth(this.props.options.continent)} Number: {this.props.booth}
								</p>
							</div>
						</div>
						<ExhibitorSlideCats colName="col-md-4" cats={this.props.cats} />
					</div>
				</div>
				<div className="exhibitor-slide__mob visible-xs visible-sm visible-md hidden-lg hidden-xl hidden-xxl">
					<div className="row">
						<div className="exhibitor-slide__side-flag"></div>
						<div className="col-5 exhibitor-slide__logo">
							<div>
									<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
										<img src={this.props.weblogo} alt="logo" />
									</a>
							</div>
						</div>
						<div className="col-7 exhibitor-slide__body">
							<div>
								<h4>
									<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
										{this.props.name}
									</a>
								</h4>
								<p>
									{this.getBooth(this.props.options.continent)} Number: {this.props.booth}
								</p>
								<ExhibitorSlideCats cats={this.props.cats} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ExhibitorSlide;
