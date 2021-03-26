import React from "react";

class Downloadable extends React.Component {
	constructor(props) {
		super(props);
	}

	getFileIcon = (type) => {
		let name;
		switch (type) {
			case "application/pdf":
				name = "pdf";
				break;
			case "text/csv":
				name = "csv";
				break;
			case "application/vnd.ms-excel":
				name = "xls";
				break;
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				name = "xls";
				break;
			case "application/msword":
				name = "doc";
				break;
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				name = "doc";
				break;
			case "application/rtf":
				name = "txt";
				break;
			case "application/vnd.ms-powerpoint":
				name = "ppt";
				break;
			default:
				name="default";
				break;
		} 
		let classN="fi fi-size-lg fi-" + name;
		return (
			<div className={classN}>
				<div className="fi-content">{name}</div>
			</div>
		);
	};

	render() {
		return (
			<div className="col-sm-4 exhibitor-article__downloadable">
				<div>
					<div>
						<a href={this.props.link} target="_blank" title={this.props.title}>
							<img className="thumb" src={this.props.thumb} alt="Downloadable Resource" />
							{this.getFileIcon(this.props.type)}
						</a>
					</div>
					<p>{this.props.title}</p>
				</div>
			</div>
		);
	}
}
export default Downloadable;
