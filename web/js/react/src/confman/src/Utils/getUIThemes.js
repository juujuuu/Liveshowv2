import React from "react";

/**
 *
 * @param {String} show - Show acronym.
 * @param {Number} day - Current day.
 * @param {String} extraMode - stuff like the innovation agenda.
 * @returns Theme for that day to show.
 */
const getUIThemes = (show, day, track = [], extraMode, mode, trackNumber) => {
    let theme = [];
    let themeCocktail=[]


// COCKTAILS UITHEMES

    // GENERAL UITHEMES 
    switch (show) {
        case "FMX":
        case "ABX":
            if (extraMode === "innovation-agenda") {
                return null;
            } else {

                switch (day) {
                    case 1:
                        theme = [...theme, "Industry & Technology", "Sustainability & Applications"];
                        break;
                    case 2:
                        theme = [...theme, "Applications", "Sustainability"];
                        break;
                    case 3:
                        theme = [...theme, "Engineering & Solutions", "Talent & Thermal"];
                        break;
                }
                return (
                    <>
                        {mode === "cocktail-expo" 
                        ? theme[trackNumber - 1] 
                        :
                         (
                            <div>

                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#d52c60" }}>Track 1 Theme</span> - {theme[0]}
                                    </strong>
                                </p>
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#5bb7ce" }}>Track 2 Theme</span> - {theme[1]}
                                    </strong>
                                </p>
                            </div>
                        )}
                    </>



                );
            }

        
       
            case "TEE2":

            if (extraMode === "innovation-agenda") {
                console.log(extraMode)
                return null;
            } else {

                switch (day) {
                    case 1:
                        theme = ["Automotive & Aerospace "];
                        break;
                    case 2:
                        theme = ["Data Centers, Semiconductors, Electronics "];
                        break;
                    case 3:
                        theme = ["Manufacturing, Industrial Applications & AI"];
                        break;
                }
                return (
                    <>
                        {mode === "cocktail-expo" ?
                         theme[trackNumber - 1] :
                          (
                            <div className="d-flex align-items-center">
                                <p style={{ fontSize: "16px", marginBottom:"0px" }}>
                                    <strong className="Ui-themes-text">Day {day}:  </strong>
                                    <span >{theme[0]}</span>
                                    
                                </p>
                    
                            </div>
                        )}
                    </>
                );
            }
            case "ABE2":

            if (extraMode === "innovation-agenda") {
                console.log(extraMode)
                return null;
            } else {

                switch (day) {
                    case 1:
                        theme = ["Construction Chemicals, Packaging & Medical Adhesives "];
                        break;
                    case 2:
                        theme = ["Developing Sustainable Adhesives"];
                        break;
                    case 3:
                        theme = ["Adhesives as Innovation Drivers"];
                        break;
                }
                return (
                    <>
                        {mode === "cocktail-expo" ?
                         theme[trackNumber - 1] :
                          (
                            <div className="d-flex align-items-center">
                                <p style={{ fontSize: "16px", marginBottom:"0px" }}>
                                    <strong className="Ui-themes-text">Day {day}:  </strong>
                                    <span >{theme[0]}</span>
                                    
                                </p>
                    
                            </div>
                        )}
                    </>
                );
            }
            case "FME2":

            if (extraMode === "innovation-agenda") {
                console.log(extraMode)
                return null;
            } else {

                switch (day) {
                    case 1:
                        theme = ["Product Development"];
                        break;
                    case 2:
                        theme = ["Sustainability, Regulation & EU Competitiveness"];
                        break;
                    case 3:
                        theme = ["Manufacturing, Digitalisation & AI"];
                        break;
                }
                return (
                    <>
                        {mode === "cocktail-expo" ?
                         theme[trackNumber - 1] :
                          (
                            <div className="d-flex align-items-center">
                                <p style={{ fontSize: "16px", marginBottom:"0px" }}>
                                    <strong className="Ui-themes-text">Day {day}:  </strong>
                                    <span >{theme[0]}</span>
                                    
                                </p>
                    
                            </div>
                        )}
                    </>
                );
            }
            case "CEX":
                
                
        
                    if (extraMode === "innovation-agenda") {
                        console.log(extraMode)
                        return null;
                    } else {
        
                        switch (day) {
                            case 1:
                                theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                break;
                            case 2:
                                theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                break;
                            case 3:
                                theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                break;
                        }
                        return (
                            <>
                                {mode === "cocktail-expo" ?
                                 theme[trackNumber - 1] :
                                  (
                                    <div>
                                    {!track.includes(2) ? (
                                        <p style={{ fontSize: "16px" }}>
                                            <strong>
                                            <span style={{ color: "#b18b2f" }}>CERAMICS STAGE: </span></strong>  {theme[1]}
                                                
                                            
                                        </p>
                                    ) : null}
                                      {!track.includes(1) ? (
                                        <p style={{ fontSize: "16px" }}>
                                            <strong>
                                            <span style={{ color: "#ad2d20" }}>THERMAL STAGE: </span></strong>  {theme[0]}
                                            
                                        </p>
                                    ) : null}
                                    {!track.includes(3) ? (
                                        <p style={{ fontSize: "16px" }}>
                                            <strong>
                                                <span style={{ color: "#134f73" }}>SOLUTIONS INNOVATION STAGE: </span></strong>  {theme[2]}
                                            
                                        </p>
                                    ) : null}
                                      
                                  
                                    {/* {!track.includes(4) ? (
                                        <p style={{ fontSize: "16px" }}>
                                            <strong>
                                                <span style={{ color: "#f09d00" }}>Exhibitor Technology Forum: </span>  {theme[3]}
                                            </strong>
                                        </p>
                                    ) : null} */}
                                </div>
                                )}
                            </>
                        );
                    }
                
                        case "TME":
                        
                
                            if (extraMode === "innovation-agenda") {
                                console.log(extraMode)
                                return null;
                            } else {
                
                                switch (day) {
                                    case 1:
                                        theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                        break;
                                    case 2:
                                        theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                        break;
                                    case 3:
                                        theme = ["Explore breakthroughs in materials, system-level design, and sustainable solutions driving the future of thermal management.","Gain insights into market dynamics, advanced materials, manufacturing innovations, supply chain resilience, and emerging applications in technical ceramics.","Live product showcases and demonstrations from industry leaders, unveiling cutting-edge solutions to your toughest manufacturing challenges."];
                                        break;
                                }
                                return (
                                    <>
                                        {mode === "cocktail-expo" ?
                                         theme[trackNumber - 1] :
                                          (
                                            <div>
                                            {!track.includes(1) ? (
                                                <p style={{ fontSize: "16px" }}>
                                                    <strong>
                                                        <span style={{ color: "#ad2d20" }}>THERMAL STAGE: </span></strong>  {theme[0]}
                                                    
                                                </p>
                                            ) : null}
                                              {!track.includes(2) ? (
                                                <p style={{ fontSize: "16px" }}>
                                                    <strong>
                                                        <span style={{ color: "#c7910c" }}>CERAMICS STAGE: </span>  </strong>  {theme[1]}
                                                  
                                                </p>
                                            ) : null}
                                            {!track.includes(3) ? (
                                                <p style={{ fontSize: "16px" }}>
                                                    <strong>
                                                        <span style={{ color: "#134f73" }}>SOLUTIONS INNOVATION STAGE: </span></strong>  {theme[2]}
                                                    
                                                </p>
                                            ) : null}
                                              
                                          
                                            {/* {!track.includes(4) ? (
                                                <p style={{ fontSize: "16px" }}>
                                                    <strong>
                                                        <span style={{ color: "#f09d00" }}>Exhibitor Technology Forum: </span>  {theme[3]}
                                                    </strong>
                                                </p>
                                            ) : null} */}
                                        </div>
                                        )}
                                    </>
                                );
                            }
        case "BRE":
            themeCocktail=["Industry Conference","Smallsats Conference","Connectivity Conference","Technology Forum"]
            switch (day) {
                
                case 1:
                    theme = [
                        "Competitiveness, Legislation and Supply Chains",
                        "Constellations and Ground Stations",
                        "Small Satellite Production and the Micro-launch Services Market",
                       "Innovations, Solutions, and Emerging Technologies"
                        
                        
                    ];
                    
                    break;
                case 2:
                    theme = [
                        "Access to Investment and Sustainability",
                        "Always Connected",
                        "The Role of Earth Observation and Evolving Requirements",
                        "Innovations, Solutions, and Emerging Technologies"
                    ];
                    break;
                case 3:
                    theme = [
                        "Regional Sovereignty and The Future of Exploration",
                        "Satellite Innovation",
                        "Digitalisation and Sustainability",
                        "Innovations, Solutions, and Emerging Technologies"
                    ];
                    break;
            }
            return (
                <>
                    {mode === "cocktail-expo" ?
                    
                    themeCocktail[trackNumber - 1] 

                    : (
                        <div>
                            {!track.includes(1) ? (
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#146259" }}>Industry Conference: </span>  {theme[0]}
                                    </strong>
                                </p>
                            ) : null}
                              {!track.includes(2) ? (
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#41b9eb" }}>Smallsats Conference: </span>  {theme[2]}
                                    </strong>
                                </p>
                            ) : null}
                            {!track.includes(3) ? (
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#426ab3" }}>Connectivity Conference: </span>  {theme[1]}
                                    </strong>
                                </p>
                            ) : null}
                              {!track.includes(4) ? (
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#7c51a1" }}>Technology Forum: </span>  {theme[3]}
                                    </strong>
                                </p>
                            ) : null}
                          
                            {/* {!track.includes(4) ? (
                                <p style={{ fontSize: "16px" }}>
                                    <strong>
                                        <span style={{ color: "#f09d00" }}>Exhibitor Technology Forum: </span>  {theme[3]}
                                    </strong>
                                </p>
                            ) : null} */}
                        </div>
                    )}
                </>
            );
    }
};
export default getUIThemes;
