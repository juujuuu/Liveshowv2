import React from "react";

class Product extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="exhibitor-article__Product">
				{this.props.image === null ? (
					""
				) : (
					<div className="image">
						<img className="img-responsive" src={this.props.image} alt={this.props.name} />
					</div>
				)}
				<div className="body">
					<div className="description" dangerouslySetInnerHTML={{ __html: this.props.body }}></div>
				</div>
			</div>
		);
	}
}
export default Product;
