
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getSiteFromAcronym } from "../Utils/getSite";






const CocktailSlide = (props) => {
  const { sessions } = props;
  const options = useSelector(state => state.options)
  const { conf, show, mode, continent } = options;
  const selectedTags = useSelector(state => state.cocktailReducer.selectedTags)




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


  return (


 
    < >

      {sessions.map((session, index) => (




        // <div key={index} className={`  card bg-light p-0 session${index}`} >
        <div key={index} className={`col-12 col-md-12 pt-4  session${index}`}>

          {/* //fix this for the mobile */}
          <div style={{ borderTop: "2px solid black", borderBottom: "2px solid black" }} className="card border-0"  >

            <div className="d-flex justify-content-around flex-column">

              <div style={{ minHeight: "250px" }} className="row g-0">
                <div style={{ backgroundImage: `URL(https://oda0cs26.modx.dev//assets/resources/shared/images/testcocktails/a-${index + 1}.png)`, backgroundSize: "cover" }} className="col-md-1 rounded">
                  {/* <img src="https://oda0cs26.modx.dev/assets/resources/500px_5.png" className="img-fluid rounded-start" alt="..."/> */}
                </div>
                <div className="col-md-11">
                  <div className="card-body pb-0">   
                   <div className=" card-text text-muted pb-2"> DAY  <b>{session.Day__c}</b> - STAGE X - TIME <b>{session.Session_Duration_Time__c}</b> </div>
                    <h5 className="card-title">{session.CKTLT_Title__c}</h5>
               
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: session.CKTLD_Description__c }} />

                    
                    <div className="row pt-3 ">
                      <div className="col-12 col-md-6  pd-md-0 ">
                        <button onClick={() => viewConfHandleClick(session.Id, session.Day__c)} type="button" className="btn btn-dark w-100 w-md-auto pb-0 pt-0 border-0">
                          <b> VIEW AGENDA </b>
                        </button>
                      </div>
                      <div className="col-12 col-md-6 ">
                        <button type="button" className="btn btn-dark w-100 w-md-auto pb-0 pt-0 border-0" style={{ backgroundColor: "#FF00FF" }}>
                          <b> REGISTER  </b>
                        </button>

                      </div>
                      <div className="pt-3 pb-3 d-flex flex-wrap justify-content-center rounded">
                        {session.cocktailsTags.map((el, index) =>
                        (selectedTags.includes(el) ?
                          <div key={index} className="badge bg-success col-auto m-1">{el}</div> :
                          <div key={index} className="badge bg-dark col-auto m-1">{el}</div>
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