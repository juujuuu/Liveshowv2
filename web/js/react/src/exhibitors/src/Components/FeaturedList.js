import React from 'react';

class FeaturedList extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="featured-list">
                {this.props.children}
            </div>
        );
    }
}
export default FeaturedList;