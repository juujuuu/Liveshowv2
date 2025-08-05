
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getSiteFromAcronym } from "../Utils/getSite";
import getUIThemes from "../Utils/getUIThemes";

import CocktailLoader from "../../../common_components/cocktailLoader"



const CocktailSlide = (props) => {
  const { sessions } = props;
  const options = useSelector(state => state.options)
  const { conf, show, mode, continent } = options;
  const selectedTags = useSelector(state => state.cocktailReducer.selectedTags)


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  //button to link to the conference 

  const viewConfHandleClick = (id, day) => {
   // Append  id and day to the URL
    const url = getSiteFromAcronym(show) + "conference/conference-agenda#" + id.toLowerCase() + "-" + day 
     const newTab = window.open();
   // Detach the new tab from the current window to prevent it from being considered a popup
    newTab.opener = null; 
   //Redirect to the new page in a new tab
    newTab.location.href = url;
 }


  return loading ?(

 <CocktailLoader />
):(

    < >
      
      {sessions.map((session, index) => (




        // <div key={index} className={`  card bg-light p-0 session${index}`} >
        <div key={index} className={`col-12 col-md-12 pb-5  session${index}`}>

          {/* //fix this for the mobile */}
          <div style={{ borderTop: "2px solid black", borderBottom: "2px solid black" }} className="card border-0"  >

            <div className="d-flex justify-content-around flex-column">

              <div /*style={{ minHeight: "250px" }}*/ className="row g-0">
                {/* <div style={{ backgroundImage: `URL(https://oda0cs26.modx.dev//assets/resources/shared/images/testcocktails/a-${index + 1}.png)`, backgroundSize: "cover" }} className="col-md-1 rounded"> */}
                  {/* <img src="https://oda0cs26.modx.dev/assets/resources/500px_5.png" className="img-fluid rounded-start" alt="..."/> */}
                {/* </div> */}
                <div className="col-md-8">
                  <div className=" pb-0">   
                  {/* <div className="card-body pb-0">    */}
                   {/* <div  style={{ color:"#323232"}} className="session-info card-text  pb-2 text-uppercase"> DAY  {session.Day__c} - {show == "BRE"? "": "STAGE" }  { getUIThemes(show, session.Day__c,session.Track_Name__c,null,mode,session.Track_Number__c)} - TIME {session.Session_Duration_Time__c}</div> */}
                   <div  style={{ color:"#323232"}} className="session-info card-text  pb-2 text-uppercase"> DAY  {session.Day__c} - {session.Track_Name__c} - TIME {session.Session_Duration_Time__c}</div>
                    <h5  className="session-title card-title text-uppercase"><b>{session.CKTLT_Title__c}</b></h5>
               
                    <p  className="session-description card-text " dangerouslySetInnerHTML={{ __html: session.CKTLD_Description__c }} />

                    
                    <div className="row ">
                      <div className="col-12 col-md-6 mt-2 ps-0  ps-md-2 ">
                        <button onClick={() => viewConfHandleClick(session.Id, session.Day__c)} type="button"  className="col-12 col-md-6 btn cocktailColoredButtons  pb-0 pt-0 border-0">
                          <b> VIEW ON AGENDA </b>
                        </button>
                      </div>
                      {/* <div className="col-12 col-md-6 ">
                        <button type="button" className="btn btn-dark w-100 w-md-auto pb-0 pt-0 border-0" style={{ backgroundColor: "#FF00FF" }}>
                          <b> REGISTER  </b>
                        </button>

                      </div> */}
                      <div className="pt-3 ps-0 ps-md-2 pb-3 d-flex flex-wrap  rounded">
                        {session.cocktailsTags.map((el, index) =>
                        (selectedTags.includes(el) ?
                          <div key={index} className=" col-auto me-2 "><span style={{fontSize:"14px"}} className="fst-italic ">{el}</span> </div> :
                         ""
                        )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ))}
      <div>

  </div>

    </>
  );
};


export default CocktailSlide