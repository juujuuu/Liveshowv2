import React from 'react'

import Slide from "./Slide";
import StickyNav from "../../../common_components/StickyNav";
import Cta from "../../../common_components/Cta";
import SearchInput from "../../../common_components/SearchInput";
import Spinner from "../../../common_components/Spinner";
import Alphabet from "../../../common_components/Alphabet";

import PDFMake from "../Utils/PDFMake/PDFMake";

function ExhibitorList({ inputState, options, functionsBundle }) {
	const { resetFilters, setSearch, setLetter, switchMode, alphabetFilter, searchFilter, expoFilter } = functionsBundle;

	const { show, filters, debug, multiExpo } = options;
	const { exhibsData: exhibitors, queries, loading } = inputState;

	const getMultiExpo = (options, state) => {
		const { ids, show, event, multiExpo } = options;
		const { expo } = state;
		if (!multiExpo) {
			return null;
		} else {
			let jsx = [];

			ids.forEach((showId) => {
				let text;
				let sanitisedShowId = showId.replaceAll("'", "");
				text = getShowNameFromId(sanitisedShowId);
				let newShowButton = (
					<Cta
						size="max"
						curved={false}
						active={expo.includes(showId)}
						bonusClass={`control-col__show-filter control-col__show-filter--${sanitisedShowId}`}
						key={`show-filter-${showId}`}
						handler={this.setExpo}
						role="expo-query"
						value={showId}>
						<span>{text}</span>
						{expo.includes(showId) ? (
							<img className="img-fluid" src="../assets/web/js/react/src/exhibman_v2/Assets/tick.png" alt="tick" />
						) : null}
					</Cta>
				);
				jsx = [...jsx, newShowButton];
			});
			return jsx;
		}
	};

	const getExtraNavButtons = (options, state) => {
		const { show, regLink, event, gtm, mode, convincepdf, multiExpo, filters } = options;
		let jsx = [];

		const newJsx = (
			<Cta
				size="max"
				color="black"
				handler={() => new PDFMake(options, state.exhibsData)}
				key={"download list"}
				bonusClass="control-col__download-list">
				Download Full List PDF
			</Cta>
		);
		jsx = [...jsx, newJsx];
		if (regLink) {
			const newJsx = (
				<Cta size="max" color="cex-red" link={regLink} bonusClass="control-col__reg-link" key={"register to attend"}>
					Register To Attend
				</Cta>
			);
			jsx = [...jsx, newJsx];
		}
		return jsx;
	};

	const filterExhibitors = (exhibitors, filters, queries, multiExpo) => {
		exhibitors = [...exhibitors];
		filters.forEach((filter) => {
			if (filter == "SEARCH") {
				exhibitors = searchFilter(exhibitors, queries.search);
			} else if (filter == "ALPHABET") {
				exhibitors = alphabetFilter(exhibitors, queries.letter);
			}
		});
		if (multiExpo) {
			exhibitors = expoFilter(exhibitors);
		}
		return exhibitors;
	};

	const getSlides = (exhibitors, options) => {
		if (exhibitors.length < 1) {
			return <h2 className="no-exhibs-message d-flex justify-content-center align-items-center">No exhibitors found</h2>;
		}
		return exhibitors.map((exhibitor, index) => {
			const { id } = exhibitor;
			return <Slide key={`slide--${id}--${index}`} payload={exhibitor} switchMode={switchMode} options={options} inputState={inputState}/>;
		});
	};

	if (loading) {
		return <Spinner></Spinner>;
	} else {
		console.log(exhibitors, filters, queries);

		const filteredExhibitors = filterExhibitors(exhibitors, filters, queries, multiExpo);

		return (
			<section className={`exhibmanV2 exhibmanV2--${show} row`}>
				<nav className="col-12 col-md-4 control-col">
					<StickyNav>
						<div className="control-col__header">
							<h3>
								<strong>Refine Results</strong>
							</h3>
							<Cta bonusClass="control-col__reset" handler={resetFilters} size="micro" color="black" margin="vertical-margin--0">
								Clear Filters
							</Cta>
						</div>
						<div className="control-col__search vertical-margin--10">
							<SearchInput handler={setSearch} value={filters.search} bonusClass="form-control" placeholder="Refine by Keyword" />
							{getMultiExpo(options, inputState)}
						</div>
						{getExtraNavButtons(options, inputState)}
					</StickyNav>
				</nav>
				<div className="col-md-8 viewport-col">
					<div className="alphabet-filter">
						<Alphabet activeLetter={queries.letter} handler={setLetter} />
					</div>
					<div className="row viewport__header">
						<h3>
							<strong>Exhibitors A-Z</strong>
						</h3>
					</div>
					<div className="slide-list">{getSlides(filteredExhibitors, options)}</div>
				</div>
			</section>
		);
	}
}
export default ExhibitorList;
