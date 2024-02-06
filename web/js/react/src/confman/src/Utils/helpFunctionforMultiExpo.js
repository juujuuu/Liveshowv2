
/// not used so far can be deleted

const helpFunctionforMultiExpo=(arrToFilter)=>{

    
    if (!arrToFilter.includes("ABE") && !arrToFilter.includes("FME") ) {
        arrToFilter = arrToFilter.filter(el => !el.includes("ABE-FME"))
        arrToFilter.push("ABE-FME-TEE")
        console.log(arrToFilter, "removed ABE-FME")
        //ALERT("removed ABE-FME")
    }
    if (!arrToFilter.includes("ABE") && !arrToFilter.includes("TEE") ) {
        arrToFilter = arrToFilter.filter(el => !el.includes("ABE-TEE"))
        console.log(arrToFilter, "removed ABE-TEE-")
        //ALERT("removed ABE-TEE-")
    }
    if (!arrToFilter.includes("FME") && !arrToFilter.includes("TEE")) {
        arrToFilter = arrToFilter.filter(el => !el.includes("FME-TEE"))
        // find a solution incase the write TEE-FME instad of FME-TEE 
        // arrToFilter.filter(el => !el.includes("FME-TEE"))
        arrToFilter.push("ABE-FME-TEE")
        console.log(arrToFilter, "removed FME-TEE")
        //ALERT("removed FME-TEE")
    }
   if (!arrToFilter.includes("ABE") && !arrToFilter.includes("FME") && !arrToFilter.includes("TEE")) {
        arrToFilter = arrToFilter.filter(el => !el.includes("ABE-FME-TEE"))
        console.log(arrToFilter, "removed ABE-FME-TEE")
        //ALERT("removed ABE-FME-TEE")
    }
}


export default helpFunctionforMultiExpo;