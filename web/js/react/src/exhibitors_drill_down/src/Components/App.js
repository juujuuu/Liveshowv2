import React from "react";
import Listing from "./Listing";
import MetaInfo from "./MetaInfo";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { failed: false, options: this.props.options, loading: true, data: null };
		this.mainClass =
			"exhibitor-drilldown " + "exhibitor-drilldown--" + this.state.options.show + " exhibitor-drilldown--" + this.state.options.boothid;
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

	componentDidMount = () => {
		this.getData(this.state.options.boothid).then((data) => {
			//data = JSON.parse(data.results);
			data = data[0];
			console.log(data[0]);
			//If no web logo try orginal logo
			data.web_logo == null ? (data.web_logo = data.logo) : data.web_logo;
			data.web_logo = data.logo; //sticking here because image quality isn't great
			let failed = false;

			if (!data) {
				failed = true;
				this.setState((prevState) => {
					prevState.failed = failed;
					return prevState;
				});
				return;
			}
			//shift
			let pageTitle = document.title;
			pageTitle = pageTitle.replace("Exhibitor", data.pagetitle);
			document.title = pageTitle;

			this.setState((prevState) => {
				prevState.data = data;
				prevState.loading = false;
				return prevState;
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
					<div className="row">
						<MetaInfo options={this.state.options} data={this.state.data} hide="hidden-md hidden-lg hidden-xl hidden-xxl" key="mob" />
						<Listing data={this.state.data} options={this.state.options} />
						<MetaInfo options={this.state.options} data={this.state.data} hide="hidden-xs hidden-sm" affix={true} key="desk" />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
