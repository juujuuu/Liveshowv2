import React from "react";

//Super simple BS5 spinner component
class Spinner extends React.Component {
	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border">
					<span className="sr-only"></span>
				</div>
			</div>
		);
	}
}
export default Spinner;
