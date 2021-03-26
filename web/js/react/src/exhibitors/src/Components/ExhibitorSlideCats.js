import React from "react";

class ExhibitorSlideCats extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cats: props.cats.split("||") };
	}
	getCats = () => {
		if(!this.state.cats){
			return;
		}
		return this.state.cats.map((cat, index) => <li key={`cat-${index}`}>{cat}</li>);
	};
	render() {
		let cName = this.props.colName +  " exhibitor-slide__cats";
		return (
			<div className={cName}>
				<div>
					<ul>{this.getCats()}</ul>
				</div>
			</div>
		);
	}
}
export default ExhibitorSlideCats;
