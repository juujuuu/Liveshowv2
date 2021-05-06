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
            <input onChange={this.handleChange} className="confman__search" id="confman__search" type="text" name="confman_search" placeholder="" value={this.props.value}/>
        );
    }
}

export default SearchInput;