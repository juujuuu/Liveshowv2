import React from "react";
import Listing from "./Listing";
import MetaInfo from "./MetaInfo";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { failed: false, options: this.props.options, loading: true, data: null, booth_data: null };
		this.mainClass =
			"exhibitor-drilldown " + "exhibitor-drilldown--" + this.state.options.show + " exhibitor-drilldown--" + this.state.options.boothid;
	}

	getData = async (boothid) => {
		let url = "/rest/assetListing?boothid=" + boothid;
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

	getBooth = async (boothid) => {
		let url = "/rest/boothOnly?boothid=" + boothid;
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

	componentDidMount = () => {
		console.log("Fetching data: " + this.state.options.boothid);
		this.getData(this.state.options.boothid).then((data) => {
			this.getBooth(this.state.options.boothid).then((booth_data) => {
				data = JSON.parse(data.results);
				console.log(data);
				booth_data = JSON.parse(booth_data.results);
				console.log(booth_data);
				//If no web logo try orginal logo
				booth_data[0].Logo_Url_Web__c == null ? booth_data[0].Logo_Url_Web__c = booth_data[0].Logo_Url_Company__c: booth_data[0].Logo_Url_Web__c;
				
				let failed = false;
				if (!booth_data || !data) {
					failed = true;
					this.setState((prevState) => {
						prevState.failed = failed;
						return prevState;
					});
					return;
				}
				let pageTitle = document.title;
				pageTitle = pageTitle.replace("Exhibitor", booth_data[0].Exhibiting_Name__c);
				document.title = pageTitle;

				this.setState((prevState) => {
					prevState.data = data;
					prevState.booth_data = booth_data[0];
					prevState.loading = false;
					return prevState;
				});
			});
		});
	};

	render() {
		if (this.state.failed) {
			return (
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<h1>404 Listing not found</h1>
				</div>
			);
		}
		if (this.state.loading) {
			return (
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		return (
			<div className={this.mainClass}>
				<div className="container">
					<MetaInfo
						options={this.state.options}
						data={this.state.data}
						booth_data={this.state.booth_data}
						hide="hidden-sm hidden-md hidden-lg"
					/>
					<Listing data={this.state.data} booth_data={this.state.booth_data} options={this.state.options} />
					<MetaInfo options={this.state.options} data={this.state.data} booth_data={this.state.booth_data} hide="hidden-xs" affix={true} />
				</div>
			</div>
		);
	}
}

export default App;
