import React from 'react';

class CheckBoxFilter extends React.Component{
    constructor(props){
        super(props);
    }
    static defaultProps = {
        name: "Filter Name",
        class: "filter-class",
        handler: false
    }
    handleClick = () =>{
        if (this.props.handler != false){
            handler();
        }
    }
    render(){
        return(
            <div className={`check-box-filter`}>
                <span><input type="checkbox" name={this.props.class} value=""/></span><span>{this.props.name}</span>
            </div>
        );
    }
}
export default CheckBoxFilter;