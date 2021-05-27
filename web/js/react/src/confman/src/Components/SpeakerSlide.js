import React from "react";

class SpeakerSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultprops = {
		modalHandler: false
	};
	modalHandler = ()=>{
		if(this.props.modalHandler != false){
			this.props.modalHandler(this.props.speaker, "speaker-modal");
		}
	}

	render() {
		return (
			<div className="row confman__speaker-slide" id={this.props.id}>
				<div className="col-3 speaker-headshot">
					<img
						src={this.props.speaker.Head_Shot_URL__c}
						className="img-fluid"
						alt={`${this.props.speaker.First_Name__c} ${this.props.speaker.Last_Name__c}`}
						onClick={this.modalHandler}
					/>
				</div>
				<div className="col-7 speaker-details">
					<p className="speaker__name" onClick={this.modalHandler}>
						{this.props.speaker.First_Name__c} {this.props.speaker.Last_Name__c}
					</p>
					<p className="speaker__job-title">{this.props.speaker.Job_Title__c}</p>
					<p className="speaker__company">{this.props.speaker.Company__c}</p>
				</div>
				<div className="col-2 speaker-company">
					<img src={this.props.speaker.Logo_URL__c} className="img-fluid" alt={this.props.speaker.Company__c} />
				</div>
			</div>
		);
	}
}

export default SpeakerSlide;
