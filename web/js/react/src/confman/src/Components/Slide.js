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

	handleClick = (event) => {
		//jquery solution (probably not ideal)
		$(this.bodyRef.current).collapse("toggle");
		if ($(this.bodyRef.current).prev().find(".accordion-button").hasClass("collapsed")) {
			$(this.bodyRef.current).prev().find(".accordion-button").removeClass("collapsed");
			$(this.mainRef.current).removeClass("session--collapsed");
			$(this.mainRef.current).addClass("session--show");
		} else {
			$(this.bodyRef.current).prev().find(".accordion-button").addClass("collapsed");
			$(this.mainRef.current).removeClass("session--show");
			$(this.mainRef.current).addClass("session--collapsed");
		}
	};
	getHeadShot = (headshot) => {
		return headshot == null ? "./assets/resources/shared/web/apps/confman/silhouette.png" : headshot;
	};
	getCompany = (company) => {
		return company == null ? "./assets/resources/shared/web/apps/confman/coming-soon.jpg" : company;
	};
	getTime = (timeObj) => {
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
		let toJsx = (speaker, index = -1) => {
			//quick converter function
			return (
				<div key={`speaker-${index}`} className={`row speakers__speaker`} id={speaker.Id}>
					{this.props.windowwidth > 992 ? (
						<div className="col-3 speaker__headshot">
							<img
								className="img-fluid"
								src={this.getHeadShot(speaker.Head_Shot_URL__c)}
								alt={`${speaker.First_Name__c} ${speaker.Last_Name__c}`}
							/>
						</div>
					) : (
						""
					)}
					<div className={`col-${this.props.windowwidth > 992 ? "5" : "12"} speaker__info`}>
						<h3 className="speaker__info__name">{`${speaker.Title__c != null ? speaker.Title__c + " " : ""}${speaker.First_Name__c} ${
							speaker.Last_Name__c
						}`}</h3>
						<h3 className="speaker__info__job-title">{`${speaker.Job_Title__c}`}</h3>
						<h3 className="speaker__info__company">{`${speaker.Company__c}`}</h3>
					</div>
					{this.props.windowwidth > 992 ? (
						<div className="col-4 speaker__company">
							<img className="img-fluid" src={this.getCompany(speaker.Logo_URL__c)} alt={`${speaker.Company__c}`} />
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
		let presentations = JSON.parse(JSON.stringify(this.props.session.presentations));
		let hasModerator =
			undefined !=
			presentations.find((speaker) => {
				return speaker.Roll__c == "Moderator";
			});
		let moderator;
		if (hasModerator) {
			moderator = presentations.find((speaker) => {
				return speaker.Roll__c == "Moderator";
			});
			presentations.splice(presentations.indexOf(moderator), 1);
			moderator = toJsx(moderator);
		}
		let speakers = presentations.map((speaker, index) => {
			return toJsx(speaker, index);
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
		return (
			<div
				className={`body__session accordion-item session--track-${this.props.session.Track_Number__c} session--day-${
					this.props.session.Day__c
				} session--type-${this.props.session.Type__c} session--${this.props.open ? "show" : "collapsed"}`}
				id={this.props.session.Id}
				ref={this.mainRef}>
				<div
					className="session__anchor"
					style={
						this.props.windowwidth > 992
							? { marginTop: "-250px", height: "250px", zIndex: "-1" }
							: { marginTop: "-150px", height: "150px" }
					}></div>
				<div className="row">
					<div className={`col-${this.props.windowwidth > 992 ? "2" : "3"} session__flag`}>
						<h3>{this.getTime(this.props.session.normalTime)}</h3>
					</div>
					<div className={`col-${this.props.windowwidth > 992 ? "10" : "9"} session__content`}>
						{this.props.session.Type__c == "Break" ? (
							<>
								<div className="accordion-header session__title">
									<button className={`accordion-button`} type="button">
										<div>
											<div className="session__meta">
												<h3 className="session__name">{this.props.session.Long_Name__c}</h3>
												{/*<p className="session__time">{this.getTime(this.props.session.normalTime)}</p>*/}
											</div>
										</div>
									</button>
								</div>
							</>
						) : (
							<>
								<div className="accordion-header session__title" onClick={this.handleClick}>
									<button className={`accordion-button ${!this.props.open ? "collapsed" : ""}`} type="button">
										<div className={this.props.session.Sponsor_URL__c ? "session--sponsored" : ""}>
											<div className="session__meta">
												<h3 className="session__name">{this.props.session.Long_Name__c}</h3>
												{/*<p className="session__time">{this.getTime(this.props.session.normalTime)}</p>*/}
											</div>
											{this.props.session.Sponsor_URL__c ? (
												<div className="session__sponsor">
													<p>
														<i>Sponsored by: </i>
													</p>
													<img class="img-fluid" src={this.props.session.Sponsor_URL__c} alt="Sponsor" />
												</div>
											) : (
												""
											)}
										</div>
									</button>
								</div>
								<div
									ref={this.bodyRef}
									className={`accordion-collapse collapse session__body ${this.props.open ? "show" : "collapsed"}`}>
									<div className="accordion-body">
										<div className="body__synopsis" dangerouslySetInnerHTML={{ __html: this.props.session.Synopsis__c }}></div>
										<div className="body__speakers">{this.getSpeakers()}</div>
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

export default Slide;
