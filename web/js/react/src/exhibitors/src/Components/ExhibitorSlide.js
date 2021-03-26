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
	render() {
		let cName = `row exhibitor-slide exhibitor-slide--${this.props.listing_type} exhibitor-slide--${this.props.show_code}`;
		return (
			<div className={cName} id={this.props.id}>
				<div className="exhibitor-slide__hr">
					<hr />
					{this.props.listing_type === "Premium" ? (
						<EnhancedCta
							text={this.props.options.enhancedtext}
							size="small"
							type="premium-listing"
							clickHandler={this.openDrilldown}
							assettypes={this.props.assettypes}
						/>
					) : (
						<EnhancedCta
							text={this.props.options.enhancedtext}
							size="small"
							type="enhanced-listing"
							clickHandler={this.openDrilldown}
							assettypes={this.props.assettypes}
						/>
					)}
				</div>
				<div className="exhibitor-slide__desk visible-sm visible-md visible-lg hidden-xs">
					<div className="exhibitor-slide__side-flag"></div>
					<div className="col-sm-3 exhibitor-slide__logo">
						<div>
							<LazyLoad height={100} offset={100} once>
								<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
									<img src={this.props.weblogo} alt="logo" />
								</a>
							</LazyLoad>
						</div>
					</div>
					<div className="col-sm-5 exhibitor-slide__body">
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
					<ExhibitorSlideCats colName="col-sm-4" cats={this.props.cats} />
				</div>
				<div className="exhibitor-slide__mob visible-xs hidden-sm hidden-md hidden-lg">
					<div className="exhibitor-slide__side-flag"></div>
					<div className="col-xs-5 exhibitor-slide__logo">
						<div>
							<LazyLoad height={100} offset={100} once>
								<a href={this.state.drilldownlink} target="_self" title={this.props.name}>
									<img src={this.props.weblogo} alt="logo" />
								</a>
							</LazyLoad>
						</div>
					</div>
					<div className="col-xs-7 exhibitor-slide__body">
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
		);
	}
}
export default ExhibitorSlide;
