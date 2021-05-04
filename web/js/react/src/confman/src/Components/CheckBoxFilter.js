import React from 'react';

class CheckBoxFilter extends React.Component{
    constructor(props){
        super(props);
    }
    static defaultProps = {
        name: "Filter Name",
        class: "filter-class",
        handler: false,
        checked: true,
        value: -1
    }
    handleClick = (event) =>{
        if (this.props.handler != false){
            console.log("checkbox update");
            this.props.handler(this.props.value);
        }
    }
    render(){
        return(
            <div className={`checkbox-filter`}>
                <div className="checkbox-filter__checkbox">
                    {this.props.checked ? 
                    <input onChange={this.handleClick} type="checkbox" name={this.props.class} checked/> 
                    : 
                    <input onChange={this.handleClick} type="checkbox" name={this.props.class}/>}
                </div>
                <div className="checkbox-filter__name"><h3>{this.props.name}</h3></div>
            </div>
        );
    }
}
export default CheckBoxFilter;