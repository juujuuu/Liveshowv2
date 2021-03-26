import React from "react";
import LazyLoad from "react-lazyload";

class News extends React.Component {
	constructor(props) {
		super(props);
		this.link = "../exhibitor-list/product?boothid=" + props.booth.Id + "&assetid=" + props.id;
	}

	openProduct = () => {
		window.open(this.link, "_blank");
	};

	getThumb = (thumb) => {
		if (thumb === null) {
			if (this.props.product) {
				thumb = "../assets/web/js/react/src/exhibitors_drill_down/src/assets/product-default.jpg";
			} else {
				thumb = "../assets/web/js/react/src/exhibitors_drill_down/src/assets/news-default.jpg";
			}
		}
		return thumb;
	};

	render() {
		return (
			<div className="exhibitor-drilldown__news" data-type={this.props["data-type"]}>
				<div className="mob hidden-sm hidden-md hidden-lg">
					<div>
						<div className="news__image">
							<LazyLoad height={100} offset={100} once>
								<img src={this.getThumb(this.props.image)} alt={this.props.title} />
							</LazyLoad>
						</div>
						<div className="news__copy">
							<p>
								{this.props.intro}
								{"  "}
								<a href={this.link} title={this.props.title} target="_blank" data-type={this.props["data-type"]}>
									Read more...
								</a>
							</p>
						</div>
					</div>
				</div>
				<div className="desk hidden-xs">
					<div className="col-sm-3 news__image">
						<div>
							<span>
								<LazyLoad height={100} offset={100} once>
									<a href={this.link} target="_blank" title={this.props.title} data-type={this.props["data-type"]}>
										<img className="img-responsive" src={this.getThumb(this.props.image)} alt={this.props.title} />
									</a>
								</LazyLoad>
							</span>
						</div>
					</div>
					<div className="col-sm-9 news__body">
						<div>
							<h5>
								<a href={this.link} target="_blank" title={this.props.title} data-type={this.props["data-type"]}>
									{this.props.title}
								</a>
							</h5>
							<div className="news__copy">
								<p>
									{this.props.intro}
									{"  "}
									<a href={this.link} target="_blank" title={this.props.title} data-type={this.props["data-type"]}>
										Read more...
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default News;
