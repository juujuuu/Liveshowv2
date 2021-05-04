import React from 'react';

class SearchInput extends React.Component{
    constructor(props){
        super(props);
        //this.state = {value: ""}
    }
    handleChange = (event)=>{
        let val = event.target.value;
        this.props.handler(val);
    }
    render(){
        return (
            <input onChange={this.handleChange} className="search" id="conference_search" type="text" name="conference_search" placeholder="" value={this.props.value}/>
        );
    }
}

export default SearchInput;