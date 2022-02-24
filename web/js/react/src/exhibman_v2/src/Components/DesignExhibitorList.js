import React, { useEffect } from "react";

import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";
import SearchInput from "../../../common_components/SearchInput";
import Spinner from "../../../common_components/Spinner";

import DesignSlide from "./DesignSlide";

import { fetchExhibs, setQueries, setLoading } from "../Actions";

import { connect } from "react-redux";
import { getSiteFromId, getShowNameFromId } from "../Utils/GetShow";
import sanitizeIds from "../Utils/SanitizeIds";

const DesignExhibitorList = props => {
	const {
		options,
		exhibs,
		queries,
		loading,
		setQueries,
		setLoading,
		fetchExhibs,
		downloadList,
	} = props;

	useEffect(() => {
		if (exhibs.length > 0) {
			setLoading(false);
		} else {
			console.log("EXHIB PROPS:  ", props);
			const siteURL = getSiteFromId(
				options.ids instanceof Array ? options.ids[0] : options.ids
			);
			const expos = sanitizeIds(options.ids);
			fetchExhibs(siteURL, expos).then(response => {
				setLoading(false);
			});
		}
	}, []);

	const getSlides = exhibitors => {
		if (exhibitors.length < 1) {
			return (
				<h2 className="no-exhibs-message d-flex justify-content-center align-items-center">
					No exhibitors found
				</h2>
			);
		}
		return exhibitors.map((exhibitor, index) => {
			const { id } = exhibitor;
			return (
				<DesignSlide
					key={`slide--${id}--${index}`}
					payload={exhibitor}
				/>
			);
		});
	};

	const handleReset = () => {
		setQueries({
			search: "",
			letter: "Show All",
			expo: options.ids,
		});
		document.getElementById("react__search").value = "";
	};

	const handleSearch = term => {
		setQueries({
			search: term,
			letter: queries.letter,
			expo: queries.expo,
		});
	};

	const searchFilter = (exhibitors, search) => {
		if (search.trim() == "") {
			return exhibitors;
		}
		search = search.toLowerCase();
		return exhibitors.filter(exhibitor => {
			const cats = exhibitor["exhibitor-cat"].toLowerCase();
			const pagetitle = exhibitor.pagetitle.toLowerCase();
			const content = exhibitor.content.toLowerCase();
			if (
				cats.includes(search) ||
				pagetitle.includes(search) ||
				content.includes(search)
			) {
				return true;
			} else {
				return false;
			}
		});
	};

	const filterExhibitors = (exhibitors, queries) => {
		exhibitors = [...exhibitors];
		exhibitors = searchFilter(exhibitors, queries.search);
		return exhibitors;
	};

	const downloadSelected = (downloads, exhibitors) => {
		let output = [];
		downloads.forEach(({ id, size }) => {
			const exhibitor = exhibitors.find(exhibitor => exhibitor.id === id);
			if (size === "BIG") {
				output = [...output, exhibitor.logo.split(".com/")[1]];
			} else {
				output = [...output, exhibitor.web_logo.split(".com/")[1]];
			}
		});
		if (output.length > 0) {
			let outputString = output.join(",");
			window.open(`https://process.filestackapi.com/AMBQBmyNkQv6Gi2tiO8xsz/zip/[${outputString}]`);
		}
	};

	if (loading) {
		return <Spinner></Spinner>;
	} else {
		const { show } = options;
		const filteredExhibitors = filterExhibitors(exhibs, queries);

		return (
			<section className={`exhibmanV2 exhibmanV2--${show} row`}>
				<nav className="col-3 control-col">
					<StickyNav>
						<div className="control-col__header">
							<h3>
								<strong>Refine Results</strong>
							</h3>
						</div>
						<div className="control-col__search vertical-margin--10">
							<SearchInput
								handler={handleSearch}
								value={queries.search}
								bonusClass="form-control"
								placeholder="Refine by Keyword"
							/>
						</div>
						<Cta
							handler={() =>
								downloadSelected(downloadList, exhibs)
							}
							size="max"
							color="black">
							Download Selected
						</Cta>
					</StickyNav>
				</nav>
				<div className="col-9 viewport-col">
					<div className="row viewport__header">
						<h3>
							<strong>Exhibitors A-Z</strong>
						</h3>
					</div>
					<div className="slide-list">
						{getSlides(filteredExhibitors)}
					</div>
				</div>
			</section>
		);
	}
};

const mapStateToProps = (store, ownProps) => store;

export default connect(mapStateToProps, {
	setQueries,
	fetchExhibs,
	setLoading,
})(DesignExhibitorList);
