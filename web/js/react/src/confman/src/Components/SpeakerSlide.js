import React from "react";

class SpeakerSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultprops = {
		modalHandler: false,
	};
	modalHandler = () => {
		if (this.props.modalHandler != false) {
			this.props.modalHandler(this.props.speaker, "speaker-modal");
		}
	};
	getHeadShot = (headshot) => {
		return headshot == null ? "./assets/resources/shared/web/apps/confman/silhouette.png" : headshot;
	};
	getCompany = (company) => {
		return company == null ? "./assets/resources/shared/web/apps/confman/coming-soon.jpg" : company;
	};
	render() {
		const { id, First_Name__c } = this.props;
		const { Head_Shot_URL__c, Last_Name__c, Job_Title__c, Company__c, Logo_URL__c } = this.props.speaker;
		return (
			<div className="row confman__speaker-slide" id={id}>
				<div className="col-3 speaker-headshot">
					<img
						src={this.getHeadShot(Head_Shot_URL__c)}
						className="img-fluid"
						alt={`${First_Name__c} ${Last_Name__c}`}
						onClick={this.modalHandler}
					/>
				</div>
				<div className="col-7 speaker-details">
					<p className="speaker__name" onClick={this.modalHandler}>
						{First_Name__c} {Last_Name__c}
					</p>
					<p className="speaker__job-title">{Job_Title__c}</p>
					<p className="speaker__company">{Company__c}</p>
				</div>
				<div className="col-2 speaker-company">
					<img src={this.getCompany(Logo_URL__c)} className="img-fluid" alt={Company__c} />
				</div>
			</div>
		);
	}
}

export default SpeakerSlide;
