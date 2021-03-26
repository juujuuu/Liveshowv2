import React from "react";

class HorizontalItems extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="exhibitor-drilldown__horizontal row">
				<p id={this.props.id} style={{marginTop: "-90px", height: "0", marginBottom: "105px"}}></p>
				<div>
					<h4>{this.props.title}</h4>
					{this.props.children}
				</div>
			</div>
		);
	}
}
export default HorizontalItems;
