import React from "react";

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		this.bodyRef = React.createRef();
		this.mainRef = React.createRef();
	}
	static defaultProps = {
		open: false,
	};

	handleClick = event => {
		//jquery solution (probably not ideal)
		$(this.bodyRef.current).collapse("toggle");
		if (
			$(this.bodyRef.current)
				.prev()
				.find(".accordion-button")
				.hasClass("collapsed")
		) {
			$(this.bodyRef.current)
				.prev()
				.find(".accordion-button")
				.removeClass("collapsed");
			$(this.mainRef.current).removeClass("session--collapsed");
			$(this.mainRef.current).addClass("session--show");
		} else {
			$(this.bodyRef.current)
				.prev()
				.find(".accordion-button")
				.addClass("collapsed");
			$(this.mainRef.current).removeClass("session--show");
			$(this.mainRef.current).addClass("session--collapsed");
		}
	};
	getHeadShot = headshot => {
		return headshot == null
			? "./assets/resources/shared/web/apps/confman/silhouette.png"
			: headshot;
	};
	getCompany = company => {
		return company == null
			? "./assets/resources/shared/web/apps/confman/coming-soon.jpg"
			: company;
	};
	getTime = timeObj => {
		let hour = timeObj.hour;
		let minute = timeObj.minute;
		if (this.props.continent == "USA") {
			if (timeObj.ampm == "PM") {
				if (hour != 12) {
					hour = hour - 12;
				}
			}
			return `${hour}.${minute}${timeObj.ampm}`;
		} else if (this.props.continent == "Germany") {
			return `${hour}:${minute}`;
		}
	};
	getSpeakers = () => {
		let getSpeaker = (speaker, index = -1) => {
			//quick converter function

			const {
				Id,
				First_Name__c,
				Prefix__c,
				Last_Name__c,
				Title__c,
				Job_Title__c,
				Company__c,
				Presentation_Slides_PDF_link__c,
				Logo_URL__c,
				Head_Shot_URL__c,
			} = speaker;
			const { ondemand, windowwidth } = this.props;

			return (
				<div
					key={`speaker-${index}`}
					className={`row speakers__speaker`}
					id={Id}>
					{Title__c != null ? (
						<h3 className="speaker__presentation-name">
							{Title__c}
						</h3>
					) : null}
					{windowwidth > 992 ? (
						<div className="col-3 speaker__headshot">
							<img
								className="img-fluid"
								src={this.getHeadShot(Head_Shot_URL__c)}
								alt={`${First_Name__c} ${Last_Name__c}`}
							/>
						</div>
					) : (
						""
					)}
					<div
						className={`col-${
							windowwidth > 992 ? "5" : "12"
						} speaker__info`}>
						<h4 className="speaker__info__name">{`${
							Prefix__c != null ? `${Prefix__c} ` : ""
						}${First_Name__c} ${speaker.Last_Name__c}`}</h4>
						<h4 className="speaker__info__job-title">{`${Job_Title__c}`}</h4>
						<h4 className="speaker__info__company">{`${Company__c}`}</h4>
						{ondemand && Presentation_Slides_PDF_link__c ? (
							<h3 className="speaker__info__presentation">
								<i>
									Download the presentation{" "}
									<a
										href={Presentation_Slides_PDF_link__c}
										target="_blank"
										download>
										here
									</a>
								</i>
							</h3>
						) : (
							""
						)}
					</div>
					{windowwidth > 992 ? (
						<div className="col-4 speaker__company">
							<img
								className="img-fluid"
								src={this.getCompany(Logo_URL__c)}
								alt={`${Company__c}`}
							/>
						</div>
					) : (
						""
					)}
				</div>
			);
		};
		if (this.props.session.presentations.length < 1) {
			return;
		}
		let presentations = JSON.parse(
			JSON.stringify(this.props.session.presentations)
		);
		let hasModerator =
			undefined !=
			presentations.find(speaker => {
				return speaker.Roll__c == "Moderator";
			});
		let moderator;
		if (hasModerator) {
			moderator = presentations.find(speaker => {
				return speaker.Roll__c == "Moderator";
			});
			presentations.splice(presentations.indexOf(moderator), 1);
			moderator = getSpeaker(moderator);
		}
		let speakers = presentations.map((speaker, index) => {
			return getSpeaker(speaker, index);
		});

		return (
			<>
				{hasModerator ? (
					<>
						<h3>Moderator</h3>
						{moderator}
						<h3>Speakers</h3>
						{speakers}
					</>
				) : (
					<>
						<h3>Speakers</h3>
						{speakers}
					</>
				)}
			</>
		);
	};
	render() {
		const { options, session, openSlides: open, windowwidth } = props;
		const { continent, ondemand } = options;
		return (
			<div
				className={`body__session accordion-item session--track-${
					session.Track_Number__c
				} session--day-${session.Day__c} session--type-${
					session.Type__c
				} session--${open ? "show" : "collapsed"}`}
				id={session.Id}
				ref={this.mainRef}>
				<div
					className="session__anchor"
					style={
						windowwidth > 992
							? {
									marginTop: "-250px",
									height: "250px",
									zIndex: "-1",
							  }
							: { marginTop: "-150px", height: "150px" }
					}></div>
				<div className="row">
					<div
						className={`col-${
							windowwidth > 992 ? "2" : "3"
						} session__flag`}>
						<h3>{this.getTime(session.normalTime)}</h3>
					</div>
					<div
						className={`col-${
							windowwidth > 992 ? "10" : "9"
						} session__content`}>
						{session.Type__c == "Break" ? (
							<>
								<div className="accordion-header session__title">
									<button
										className={`accordion-button`}
										type="button">
										<div
											className={
												session.Sponsor_URL__c
													? "session--sponsored"
													: ""
											}>
											<div className="session__meta">
												<h3 className="session__name">
													{session.Long_Name__c}
												</h3>
												{/*<p className="session__time">{this.getTime(session.normalTime)}</p>*/}
											</div>
											{session.Sponsor_URL__c ? (
												<div className="session__sponsor">
													<p>
														<i>Sponsored by: </i>
													</p>
													<img
														className="img-fluid"
														src={
															session.Sponsor_URL__c
														}
														alt="Sponsor"
													/>
												</div>
											) : (
												""
											)}
										</div>
									</button>
								</div>
							</>
						) : (
							<>
								<div
									className="accordion-header session__title"
									onClick={this.handleClick}>
									<button
										className={`accordion-button ${
											!open ? "collapsed" : ""
										}`}
										type="button">
										<div
											className={
												session.Sponsor_URL__c
													? "session--sponsored"
													: ""
											}>
											<div className="session__meta">
												<h3 className="session__name">
													{session.Long_Name__c}
												</h3>
												{/*<p className="session__time">{this.getTime(session.normalTime)}</p>*/}
											</div>
											{session.Sponsor_URL__c ? (
												<div className="session__sponsor">
													<p>
														<i>Sponsored by: </i>
													</p>
													<img
														className="img-fluid"
														src={
															session.Sponsor_URL__c
														}
														alt="Sponsor"
													/>
												</div>
											) : (
												""
											)}
										</div>
									</button>
								</div>
								<div
									ref={this.bodyRef}
									className={`accordion-collapse collapse session__body ${
										open ? "show" : "collapsed"
									}`}>
									<div className="accordion-body">
										{ondemand &&
										session.Vimeo_Video_Link__c ? (
											<div className="body__video">
												<iframe
													src={
														session.Vimeo_Video_Link__c
													}
													frameborder="0"
													allow="autoplay; fullscreen; picture-in-picture"
													allowfullscreen=""></iframe>
											</div>
										) : (
											""
										)}
										<div
											className="body__synopsis"
											dangerouslySetInnerHTML={{
												__html: session.Synopsis__c,
											}}></div>
										<div className="body__speakers">
											{this.getSpeakers()}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return { ...store, session: ownProps.session };
};
export default connect(mapStateToProps, {})(Slide);
