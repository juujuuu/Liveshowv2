import React from "react";
import MainMenu from "./MainMenu";
import ViewPort from "./ViewPort";
import PDFMake from "../pdfmake";

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log();
		this.state = {
			loading: true,
			data: null,
			featured: null,
			query: "",
			alph: "Show All",
			expoQuery: Object.assign({}, props.options).multiExpo,
			resetIndex : 0,
			controlLogic: { processQuery: this.processQuery, processAlph: this.processAlph, setExpo: this.setExpo, genPDF: this.genPDF },
		};
		this.mainClass = "enhanced-exhibitors " + "enhanced-exhibitors--" + this.props.options.show;
	}

	processQuery = (query) => {
		window.scroll(0, 4); //force lazy load
		window.scroll(0, 0);
		this.setState((prevState) => {
			prevState.query = query;
			return prevState;
		});
	};
	processAlph = (selection) => {
		window.scroll(0, 4);
		window.scroll(0, 0);
		this.setState((prevState) => {
			prevState.alph = selection;
			return prevState;
		});
	};
	setExpo = (expo, active, reset=false) => {
		if(reset){
			this.setState(prevState=>{
				prevState.expoQuery = this.props.options.expo.replace(/'/g,'').split(",");
				prevState.resetIndex ++;
				return prevState;
			});
		}
		if (active) {
			//Activate show
			this.setState((prevState) => {
				prevState.expoQuery.push(expo);
				return prevState;
			});
		} else {
			//Remove show
			this.setState((prevState) => {
				const index = prevState.expoQuery.indexOf(expo);
				if (index > -1) {
					prevState.expoQuery.splice(index, 1);
				}
				return prevState;
			});
		}
	};
	genPDF = () => {
		console.log("Running pdf gen");
		new PDFMake(this.props.options, this.state.data);
	};

	getData = async (expo) => {
		let url = "/rest/exhibSS?expoIds=" + expo;
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
		console.log("Fetching data: " + this.props.options.expo);
		this.getData(this.props.options.expo).then((data) => {
			console.log(data.results);
			console.log("sorted");
			data.results.sort(function (a, b) {
				var textA = a.pagetitle.toUpperCase();
				var textB = b.pagetitle.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
			console.log(this.extractPremium(data.results, true));
			this.setState((prevState) => {
				prevState.featured = this.extractPremium(data.results, true);
				prevState.data = this.extractPremium(data.results, false);
				prevState.loading = false;
				return prevState;
			});
		});
	};

	//return subarray of elements with that are or aren't premium
	extractPremium = (array, pr) => {
		return array.filter((exhibitor, index) => {
			if (pr) {
				return exhibitor.Exhibitor_listing_type__c === "Premium";
			} else {
				return exhibitor.Exhibitor_listing_type__c !== "Premium";
			}
		});
	};

	render() {
		return (
			<div className={this.mainClass}>
				<MainMenu
					loading={this.state.loading}
					searchHandler={this.state.controlLogic.processQuery}
					alphHandler={this.state.controlLogic.processAlph}
					pdfHandler={this.state.controlLogic.genPDF}
					expoHandler={this.state.controlLogic.setExpo}
					options={this.props.options}
					expo={this.props.options.expo}
					resetIndex={this.state.resetIndex}
				/>
				<ViewPort
					data={this.state.data}
					loading={this.state.loading}
					featured={this.state.featured}
					query={this.state.query}
					alph={this.state.alph}
					alphHandler={this.state.controlLogic.processAlph}
					expoQuery={this.state.expoQuery}
					options={this.props.options}
				/>
			</div>
		);
	}
}

export default App;
