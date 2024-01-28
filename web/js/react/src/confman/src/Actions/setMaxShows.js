// used to  count how many  show buttons are shown
import setShow from "./setShow";
const setMaxShows= show => {
	// let showNumber = 0;
    // let showArray = [];
	// sessions.forEach(session => {
    // const {showName} = session;
    //     if(showName!== undefined  ){
    //      showArray.push(showName);
    //       }
    //     //   console.log(sessions,"sessionssss")
     
	// });
    // // could use join to create string and remove the - and filter again to get the buttons 
    // const showsNamesSanitised =showArray.join(" ").split(" ").join("-").split("-")
    // const showsNumbersFiltered=  showsNamesSanitised.filter((el,index)=>{
    // return  showsNamesSanitised.indexOf(el)===index

    //       })
          

    // console.log( showsNumbersFiltered,"showwwwwww")

	return {
		type: "SET_MAX_SHOWS",
		payload:  show,
	};
};

export default setMaxShows;
