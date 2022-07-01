import React from "react";
import Cta from "../../../common_components/Cta";

const DesignSpeakerSlide = ({ id, speaker, modalHandler = false }) => {
    const { Head_Shot_URL__c, First_Name__c, Last_Name__c, Job_Title__c, Company__c } = speaker;
    const { original_headshot_url__c, print_headshot_url__c, Logo_URL__c } = speaker.Speaker__r;

    const runModalHandler = () => {
        if (modalHandler != false) {
            modalHandler(speaker, "speaker-modal");
        }
    };
    const getHeadShot = headshot => (headshot == null ? "./assets/resources/shared/web/apps/confman/silhouette.png" : headshot);

    const getCompany = company => (company == null ? "./assets/resources/shared/web/apps/confman/coming-soon.jpg" : company);

    return (
        <div className="row confman__speaker-slide" id={id}>
            <div className="col-2 speaker-headshot">
                <img src={getHeadShot(Head_Shot_URL__c)} className="img-fluid" alt={`${First_Name__c} ${Last_Name__c}`} onClick={runModalHandler} />
            </div>
            <div className="col-3 speaker-details">
                <p className="speaker__name" onClick={runModalHandler}>
                    {First_Name__c} {Last_Name__c}
                </p>
                <p className="speaker__job-title">{Job_Title__c}</p>
                <p className="speaker__company">{Company__c}</p>
            </div>
            <div className="col-7 speaker-downloads">
                <div className="d-flex">
                    <Cta link={original_headshot_url__c} target="_blank">
                        ORIGINAL HEADSHOT
                    </Cta>
                    <Cta link={print_headshot_url__c} target="_blank">
                        PRINT HEADSHOT
                    </Cta>
                    <Cta link={Logo_URL__c} target="_blank">
                        COMPANY LOGO
                    </Cta>
                </div>
            </div>
        </div>
    );
};

export default DesignSpeakerSlide;
