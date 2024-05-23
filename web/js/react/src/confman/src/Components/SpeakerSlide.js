import React from "react";

const SpeakerSlide = ({ id, speaker, modalHandler = false }) => {
    const { Head_Shot_URL__c, First_Name__c, Last_Name__c, Job_Title__c, Company__c, Logo_URL__c, Speaker__r } = speaker;
    const { web_logo_url__c } = Speaker__r;

    const runModalHandler = () => {
        if (modalHandler != false) {
            modalHandler(speaker, "speaker-modal");
        }
    };
    const getHeadShot = headshot => (headshot == null ? "./assets/resources/shared/web/apps/confman/silhouette.png" : headshot);

    const getCompany = company => (company == null ? "./assets/resources/shared/web/apps/confman/coming-soon.jpg" : company);

    return (

        <div className="row confman__speaker-slide" id={id}>
            <div className="col-3 speaker-headshot"> 
               {console.log(speaker.length)}
                <img src={getHeadShot(Head_Shot_URL__c)} className="img-fluid" alt={`${First_Name__c} ${Last_Name__c}`} onClick={runModalHandler} />
            </div>
            <div className="col-7 speaker-details">
                <p className="speaker__name" onClick={runModalHandler}>
                    {First_Name__c} {Last_Name__c}
                </p>
                <p className="speaker__job-title">{Job_Title__c}</p>
                <p className="speaker__company">{Company__c}</p>
            </div>
            <div className="col-2 speaker-company">
                <img src={getCompany(web_logo_url__c)} className="img-fluid" alt={Company__c} />
            </div>
        </div>
    );
};

export default SpeakerSlide;
