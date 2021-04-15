import React from "react";
import Listing from "./Listing";
import MetaInfo from "./MetaInfo";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { options: this.props.options, loading: true, data: null, asset_data: null, failed: false };
		this.mainClass = "exhibitor-article " + "exhibitor-article--" + this.state.options.show + " exhibitor-article--" + this.state.options.boothid;
	}

	getData = async (boothid) => {
		boothid = `'${boothid}'`;
		let url = "/rest/exhib_drilldown.php?booth=" + boothid;
		console.log("getting: " + url);
		try {
			const response = await fetch(url, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "same-origin", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.json(); // parses JSON response into native JavaScript objects
		} catch (e) {
			console.log(typeof e);
			return e;
		}
	};

	getAsset = (data) => {
		return data.find((asset) => {
			return this.state.options.assetid == asset.Id;
		});
	};

	componentDidMount = () => {
		console.log("Fetching data: " + this.state.options.boothid);
		this.getData(this.state.options.boothid).then((data) => {
			let failed = false;
			console.log(data);
			data = data[0];
			let asset_data = this.getAsset(data.Exhibitor_Assets__r);
			if (!data) {
				failed = true;
			}
			let pageTitle = document.title;
			pageTitle = pageTitle.replace("Product", asset_data.Title__c);
			document.title = pageTitle;

			this.setState((prevState) => {
				prevState.failed = failed;
				prevState.asset_data = asset_data;
				prevState.data = data;
				prevState.loading = false;
				return prevState;
			});
		});
	};

	render() {
		if (this.state.loading) {
			return (
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else if (this.state.failed) {
			return (
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<h1>404 Listing not found</h1>
				</div>
			);
		}
		return (
			<div className={this.mainClass}>
				<div className="container">
					<div className="row">
						<Listing data={this.state.asset_data} booth_data={this.state.data} options={this.props.options} />
						<MetaInfo
							options={this.state.options}
							data={this.state.asset_data}
							booth_data={this.state.data}
							hide="hidden-xs hidden-sm"
							desk={true}
						/>
						<MetaInfo
							options={this.state.options}
							data={this.state.asset_data}
							booth_data={this.state.data}
							hide="hidden-sm hidden-md hidden-lg hidden-xl hidden-xxl"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
