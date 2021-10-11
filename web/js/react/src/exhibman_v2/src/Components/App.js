import React, { Component } from "react";
import Spinner from "../../../common_components/Spinner";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exhibsData: [],
			exhibitor: null,
			product: null,
			queries: {
				search: "",
				alphabet: "",
			},
		};
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { ids, mode } = this.props.options;
		this.getSF(ids, mode).then((response) => {
			console.log("SF Query:  ", response);
			this.setState((prevstate) => {
				prevstate.exhibsData = response;
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
			return response;
		} catch (error) {
			console.error("Salesforce Controller failed:  ", error);
		}
	};

	filterExhibitors = (exhibitors, filters, queries) => {
		exhibitors = [...exhibitors];
		filters.forEach((filter) => {
			if (filter == "SEARCH") {
				//exhibitors = this.searchFilter(exhibitors, queries.search);
			} else if (filter == "ALPHABET") {
				//exhibitors = this.alphabetFilter(exhibitors, queries.alphabet);
			}
		});
		return exhibitors;
	};

	getExhibList = (exhibitors, options, queries) => {
		const { show, regLink, event, gtm, mode, convincepdf, multiExpo, filters } = options;
		const filteredExhibitors = this.filterExhibitors(exhibitors, filters, queries);
		if (!exhibitors) {
			return <Spinner></Spinner>;
		}
		return (
			<section className={`exhibmanV2 exhibmanV2--${show} row`}>
				<div className="col-md-4 control-col">control</div>
				<div className="col-md-8 viewport-col">viewport</div>
			</section>
		);
	};

	render() {
		const { exhibsData, exhibitor, product, queries } = this.state;
		const { mode } = this.props.options;
		switch (mode) {
			case "LIST":
				return this.getExhibList(exhibsData, this.props.options, queries);
				break;
			default:
				break;
		}
	}
}
export default App;
