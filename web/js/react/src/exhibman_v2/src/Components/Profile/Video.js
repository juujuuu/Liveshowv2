import React from "react";
import VideoSanitizer from "../../Utils/VideoSanitizer";
import { connect,useDispatch, useSelector } from "react-redux";
function Video({ asset }) {
	let video;

	const getJsx = (asset) => {
		const { Id, Name, Title__c,Link__c } = asset;
		
		
		
const options=useSelector(state=>state.options)
const { multiExpo, filters, show } = options;
if(show=="FMC"){
	return (
		<div className="profile-video col-md-4">
			<video src={Link__c} frameBorder="0" autoPlay="0" allowFullScreen="1" controls="controls" style={{width:100+"%"}}></video>
			<p>{Title__c}</p>
		</div>
	);

}else{return (
	<div className="profile-video col-md-4">
		<div>
			<iframe src={video} title={Name} frameBorder="0" style={{ border: "0" }} allowFullScreen data-name={Name} data-id={Id}></iframe>
		</div>
		<p>{Title__c}</p>
	</div>
);}
		
	};

	try {
		video = VideoSanitizer.getVideo(asset.Link__c);
		return getJsx(asset);
	} catch (error) {
		console.error("Video sanitizer failed", error);
		return (
			<div className="profile-video col-md-4">
				<p>An Unexpected error has occured</p>
			</div>
		);
	}
}

export default Video;
