import React from 'react';

class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ""}
    }
    handleChange = ()=>{
        return;
    }
    render(){
        return (
            <input id="search" type="text" name="search" title="Search" placeholder="" value={this.state.value}/>
        );
    }
}

export default SearchInput;