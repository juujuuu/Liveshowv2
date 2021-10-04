import React, { Component } from "react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state.sfData = null;
	}

	/**
	 * Resolve inital params and run the iniital SF lookup
	 */
	componentDidMount() {
		const { ids, mode } = this.props.options;
        console.log("SF Query:  ", this.getSf(ids, mode));
	}

	/**
	 * Salesforce Query
	 * @returns Salesforce data in an array
	 */
	getSF = async (ids = null, mode = null) => {
		if (ids || mode === false) {
			console.error("ID OR MODE AREN'T SET");
			return null;
		}
        let url;
        switch (mode) {
            case "LIST":
                let newIds;
                if(ids.length > 1){                    
                    ids.forEach(id => {
                        newIds = newIds + id + ",";
                    });
                    newIds = newIds.substring(0, newIds.length - 1);
                } else{
                    newIds = ids[0];
                }
                url=`/rest/exhibman.php?expos=${newIds}`;
                break;
        
            default:
                if(ids.length > 1){                    
                    ids.forEach(id => {
                        newIds = newIds + id + ",";
                    });
                    newIds = newIds.substring(0, newIds.length - 1);
                } else{
                    newIds = ids[0];
                }
                url=`/rest/exhibman.php?expos=${newIds}`;
        }
		try {
			const response = await fetch(url, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				mode: "same-origin", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
				},
			});
            return response.json();
		} catch (error) {
			console.error("Salesforce Controller failed:  ", error);
		}
	};

	render() {
		return <div>Test</div>;
	}
}
export default App;
