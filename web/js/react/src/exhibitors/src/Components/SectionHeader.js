import React from "react";

class SectionHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="section_header">
				<h3>{this.props.content}</h3>
			</div>
		);
	}
}
export default SectionHeader;
