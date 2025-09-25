/**
 * Split an array of ids into a nice comma delimited string for apis
 * @param {array} ids
 * @returns comma delimited string
 */
import React from 'react'
import Button from 'react-bootstrap/esm/Button';
const dualLanguage = (show,englishtext,germanText)=> {
    let message;
    { if(show=="ABM" || show=="" || show==""){ message= germanText} else{message=englishtext }}
    
    return message
};

const dualLanguageStyle = (show)=> {
    let styles;
    { if(show=="ABM" || show=="ABE2" || show=="TEE2"){ styles={
        display:{display:'block'},
        h3Style:{fontSize:'23px',textAlign:"center",marginBottom:"15px"},
        CTAStyle:{width:"100%"}}
    } else{styles= " "}}
   
 return styles
};
export  {dualLanguageStyle,dualLanguage};
 


