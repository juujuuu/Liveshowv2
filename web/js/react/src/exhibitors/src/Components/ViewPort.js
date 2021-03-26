import React from "react";
import SectionHeader from "./SectionHeader";
import ExhibitorSlide from "./ExhibitorSlide";
import AZList from "./AZList";
import FeaturedList from "./FeaturedList";
import Alphabet from "./Alphabet";

class ViewPort extends React.Component {
	constructor(props) {
		super(props);
	}

	//return a 5 prop object of true and false
	getAssets = (exhibitor) => {
		let contact, downloads, videos, products, news;
		contact = true;
		downloads = exhibitor.Assets_Downloadable_Resource_Count__c > 0;
		videos = exhibitor.Assets_Video_Count__c > 0;
		products = exhibitor.Asset_Product_Count__c > 0;
		news = exhibitor.Assets_News_Count__c > 0;
		return { contact: contact, downloads: downloads, videos: videos, products: products, news: news };
	};

	//Get non featured exhibitors
	getAZList = () => {
		return <AZList>{this.slideBuilder(this.props.data)}</AZList>;
	};
	getFeaturedList = () => {
		if (!this.props.featured.length) {
			return;
		}
		return <FeaturedList>{this.slideBuilder(this.props.featured)}</FeaturedList>;
	};
	slideWillShow = (exhibitor) => {
		console.log(exhibitor["Show_On_Colocate__c"]);
		console.log(typeof exhibitor["Show_On_Colocate__c"]);
		if (exhibitor["Show_On_Colocate__c"]) {
			if (
				exhibitor.pagetitle.toLowerCase().includes(this.props.query.toLowerCase()) ||
				exhibitor["exhibitor-booth"].toLowerCase().includes(this.props.query.toLowerCase()) ||
				exhibitor["exhibitor-cat"].toLowerCase().includes(this.props.query.toLowerCase())
			) {
				if (this.alphMatch(exhibitor.pagetitle)) {
					return true;
				}
			}
		}
		return (
			(exhibitor.pagetitle.toLowerCase().includes(this.props.query.toLowerCase()) ||
				exhibitor["exhibitor-booth"].toLowerCase().includes(this.props.query.toLowerCase()) ||
				exhibitor["exhibitor-cat"].toLowerCase().includes(this.props.query.toLowerCase())) &&
			this.props.expoQuery.includes(exhibitor.Expo__c) &&
			this.alphMatch(exhibitor.pagetitle)
		);
	};
	slideBuilder = (data) => {
		return (
			<>
				{data.map((exhibitor, index) => {
					//Process Querys here
					if (this.slideWillShow(exhibitor)) {
						return (
							<ExhibitorSlide
								name={exhibitor.pagetitle}
								booth={exhibitor["exhibitor-booth"]}
								weblogo={exhibitor.web_logo}
								cats={exhibitor["exhibitor-cat"]}
								expo={exhibitor.Expo__c}
								country={exhibitor.country}
								id={exhibitor.id}
								colocate={exhibitor.Show_On_Colocate__c}
								listing_type={exhibitor.Exhibitor_listing_type__c}
								show_code={exhibitor.expoType}
								key={`booth-${exhibitor.id}`}
								options={this.props.options}
								assettypes={this.getAssets(exhibitor)}
							/>
						);
					}
				})}
			</>
		);
	};

	alphMatch = (name) => {
		if (this.props.alph === "" || this.props.alph === "Show All") {
			return this.props.alph === "" || this.props.alph === "Show All";
		} else if (this.props.alph == "0-9") {
			return name.charAt(0) <= "9" && name.charAt(0) >= "0";
		} else {
			return this.props.alph.toLowerCase() === name.charAt(0) || this.props.alph === name.charAt(0);
		}
	};

	render() {
		if (this.props.loading) {
			return (
				<div style={{ textAlign: "center", marginTop: "40px" }} className="col-sm-8">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		return (
			<div className="col-sm-7 col-md-8">
				<Alphabet handler={this.props.alphHandler} active={this.props.alph} />
				{this.props.featured.length > 0 ? <SectionHeader content="Featured Exhibitors" /> : ""}
				{this.getFeaturedList()}
				<SectionHeader content="Exhibitors A-Z" />
				{this.getAZList()}
			</div>
		);
	}
}

export default ViewPort;
