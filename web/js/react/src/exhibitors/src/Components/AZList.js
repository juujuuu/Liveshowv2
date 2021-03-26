import React from 'react';

class AZList extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="az-list">
                {this.props.children}
            </div>
        );
    }
}
export default AZList;