import React from "react";
//Note -- Will probably have to change around soon depending on what we do with embed
class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = { valid: true };
	}

	getEmbedIframe = (rawLink) => {
		let id;
		if (this.isVimeo(rawLink)) {
			return this.getVimeoIframe(rawLink);
		} else if (this.isYoutube(rawLink)) {
			return this.getYoutubeIframe(rawLink);
		} else {
			this.setState({ valid: false });
		}
	};

	getVimeoIframe = (rawlink) => {
		let id = rawlink.split(".com/")[1];
		if(id.includes("&")){
			id = id.split("&")[1]; //split of on & if there are other parameters
		}
		//Vimeo video ids are numbers eg 123424
		if (Number.isInteger(id)) {
			return (
				<iframe
					src={`https://player.vimeo.com/video/${id}`}
					frameborder="0"
					allow="fullscreen"
					allowfullscreen
					style={{ border: "0" }}
					data-name={this.props.exName}
					data-id={this.props.id}></iframe>
			);
		} else {
			this.setState({ valid: false });
			return null;
		}
	};

	getYoutubeIframe = (rawLink) => {
		let id, link;
		if (rawLink.includes("https://youtu.be/") && !rawLink.includes("&feature=youtu.be")) {
			id = rawLink.split(".be/")[1];
			if (id.includes("?")) {
				id = id.split("?")[0];
			}
		} else {
			id = rawLink.split("watch?v=")[1];
			if (id.length < 2) {
				//split failed try &v=
				id = rawLink.split("&v=")[1];
			}
			if (id.length < 2) {
				//still won't split?  dodgy link
				this.setState({ valid: false });
				console.log(rawLink);
				return null;
			} 
			if (id.includes("&")) { //now we've got an id
				//The video id isn't the end of the url so cut it at the parameter after
				id = id.split("&")[0];
			} 
		}
		link = `https://youtube.com/embed/${id}?enablejsapi=1`;
		
		return (
			<iframe src={link} frameBorder="0" style={{ border: "0" }} allowFullScreen data-name={this.props.exName} data-id={this.props.id}></iframe>
		);
	};

	isVimeo = (rawlink) => {
		if (rawlink.includes("vimeo")) {
			return true;
		}
		return false;
	};

	isYoutube = (rawlink) => {
		if ((rawlink.includes("youtube") || rawlink.includes("/youtu.be")) && !rawlink.includes("https://www.youtube.com/channel/")) {
			return true;
		}
		return false;
	};

	render() {
		if (this.state.valid) {
			return (
				<div className="col-sm-4 exhibitor-drilldown__video" data-type={this.props["data-type"]}>
					<div>
						{this.getEmbedIframe(this.props.link)}
					</div>
					<p>{this.props.title}</p>
				</div>
			);
		} else {
			return <p>Sorry this video format ({this.props.link}) is not supported</p>;
		}
	}
}
export default Video;
