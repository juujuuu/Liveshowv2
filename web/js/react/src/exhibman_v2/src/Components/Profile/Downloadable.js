import React from "react";

function Downloadable({asset, pagetitle}) {
	const { Id, Body__c, File_Type__c, Intro__c, Link__c, Name, Thumbnail_Link__c, Title__c } = asset;

	const getFileType = (fileType) => {
		switch (fileType) {
			case "application/pdf":
				return "pdf";
			default:
				return "pdf";				
		}
	};
	return (
		<div className="profile-downloadable col-md-4">
			<div>
				<a href={Link__c} target="_blank" title={Title__c} data-id={Id} data-name={pagetitle} data-type="Downloadable" rel="noreferrer">
					<img className="img-fluid" src={Thumbnail_Link__c} alt="Downloadable" />
					<div className={`fi fi-size-lg fi-${getFileType(File_Type__c)}`}>
						<div className="fi-content">{getFileType(File_Type__c)}</div>
					</div>
				</a>
				<p>{Title__c}</p>
			</div>
		</div>
	);
}

export default Downloadable;
