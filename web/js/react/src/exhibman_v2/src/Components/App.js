import React, { Component } from "react";

import Spinner from "../../../common_components/Spinner";
import Slide from "./Slide";
import Alphabet from "../../../common_components/Alphabet";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			exhibsData: [],
			exhibitor: null,
			product: null,
			queries: {
				search: "",
				letter: "Show All",
			},
		};
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { ids, mode } = this.props.options;
		this.getSF(ids, mode).then((response) => {
			this.setState((prevState) => {
				prevState.exhibsData = response;
				prevState.loading = false;
				return prevState;
			});
		});
	}

	/**
	 * Salesforce Query
	 * @returns Salesforce data in an array
	 */
	getSF = async (ids = null, mode = null) => {
		if (ids === false || mode === false) {
			console.error("ID OR MODE AREN'T SET");
			return null;
		}
		let url;
		switch (mode) {
			case "LIST":
				let newIds;
				if (ids.length > 1) {
					ids.forEach((id) => {
						newIds = `${newIds},`;
					});
					newIds = newIds.substring(0, newIds.length - 1);
				} else {
					newIds = ids[0];
				}
				url = `/rest/exhibman.php?expos=${newIds}`;
				break;

			default:
				if (ids.length > 1) {
					ids.forEach((id) => {
						newIds = `${newIds},`;
					});
					newIds = newIds.substring(0, newIds.length - 1);
				} else {
					newIds = ids[0];
				}
				url = `/rest/exhibman.php?expos=${newIds}`;
		}
		try {
			let response;
			await fetch(url, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "same-origin", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((data) => data.json())
				.then((data) => {
					response = data;
				});
			response.sort((a, b) => {
				if (a.pagetitle < b.pagetitle) {
					return -1;
				}
				if (a.pagetitle > b.pagetitle) {
					return 1;
				}
				return 0;
			});
			return response;
		} catch (error) {
			console.error("Salesforce Controller failed:  ", error);
		}
	};

	setLetter = (letter) => {
		this.setState((prevState) => {
			prevState.queries.letter = letter;
			return prevState;
		});
	};

	filterExhibitors = (exhibitors, filters, queries) => {
		exhibitors = [...exhibitors];
		filters.forEach((filter) => {
			if (filter == "SEARCH") {
				//exhibitors = this.searchFilter(exhibitors, queries.search);
			} else if (filter == "ALPHABET") {
				exhibitors = this.alphabetFilter(exhibitors, queries.letter);
			}
		});
		return exhibitors;
	};

	alphabetFilter = (exhibitors, letter) =>{
		letter = letter.toLowerCase();

		if(letter == "show all"){
			return exhibitors;
		}
		
		return exhibitors.filter(exhibitor =>{
			const {pagetitle} = exhibitor
			const name = pagetitle.toLowerCase();
			
			if(letter == "0-9"){
				return !isNaN(name.charAt(0)) 
			} else if(letter.match(/[a-z]/i)){
				//is a letter
				return letter == name.charAt(0);
			}
			else{
				return true;
			}
		});
	};

	getSlides = (exhibitors, options) => {
		if (exhibitors.length < 1) {
			return <h2 className="no-exhibs-message d-flex justify-content-center align-items-center">No exhibitors found</h2>;
		}
		const { id } = exhibitors;
		return exhibitors.map((exhibitor, index) => {
			return <Slide key={`slide--${id}--${index}`} payload={exhibitor} />;
		});
	};

	getExhibList = (exhibitors, options, queries, loading) => {
		if (loading) {
			return <Spinner></Spinner>;
		}

		const { show, regLink, event, gtm, mode, convincepdf, multiExpo, filters } = options;
		const filteredExhibitors = this.filterExhibitors(exhibitors, filters, queries);

		return (
			<section className={`exhibmanV2 exhibmanV2--${show} row`}>
				<div className="col-md-4 control-col">control</div>
				<div className="col-md-8 viewport-col">
					<div className="alphabet-filter">
						<Alphabet activeLetter={queries.letter} handler={this.setLetter} />
					</div>
					<div className="row viewport__header">
						<h3>
							<strong>Exhibitors A-Z</strong>
						</h3>
					</div>
					<div className="slide-list">{this.getSlides(filteredExhibitors, options)}</div>
				</div>
			</section>
		);
	};

	render() {
		const { exhibsData, exhibitor, product, queries, loading } = this.state;
		const { mode } = this.props.options;
		switch (mode) {
			case "LIST":
				console.log("Switch case:  ", exhibsData);
				return this.getExhibList(exhibsData, this.props.options, queries, loading);
			default:
				break;
		}
	}
}
export default App;
