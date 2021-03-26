import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Recaptcha from "react-recaptcha";

class ContactModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				first_name: "",
				last_name: "",
				email: "",
				company: "",
				title: "",
				phone: "",
				Inquiry_Notes__c: "",
				contact: "true",
			},
			valid: {
				first_name: true,
				last_name: true,
				email: true,
				company: true,
				title: true,
				phone: true,
			},
			submitted: false,
			showCaptcha: true,
			sending: false,
			failed: false,
			recaptcha: "",
			booth_data: props.booth_data,
			options: props.options,
		};
	}

	handleClose = () => {
		console.log("closing");
		this.props.setShow(false);
	};

	handleCaptcha = (response) => {
		let resp = response;
		this.setState((prevState) => {
			prevState.recaptcha = resp;
			return prevState;
		});
	};

	sendSf = async (data) => {
		if (this.state.recaptcha == "") {
			return -1;
		}
		let url = "/sfForm";
		console.log("posting: " + url);
		data["g-recaptcha-response"] = this.state.recaptcha;
		data[this.state.options.contactobject] = this.state.options.event;
		data.Campaign_ID = this.props.options.contactcampaign;
		data.Inquiry_Notes__c = data["first_name"] + " " + data["last_name"] + " " + "\n\nWOULD LIKE TO CONTACT:\n\n" + this.state.booth_data.Exhibiting_Name__c + " - " + this.state.booth_data.Name + "\n\n" + "WITH THE FOLLOWING MESSAGE" + "\n\n" + data["Inquiry_Notes__c"];

		console.log(data);
		let serializedArray = [];
		for (const property in data) {
			serializedArray.push({ name: property, value: data[property] });
		}
		let formData = new FormData();
		serializedArray.forEach((object) => {
			formData.append(object.name, object.value);
		});
		//serializedArray = JSON.stringify(serializedArray);
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				body: formData,
			});
			return response; // parses JSON response into native JavaScript objects
		} catch (e) {
			console.log(typeof e);
			return e;
		}
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let clonedForm = Object.assign({}, this.state.form);
		if (this.state.submitted) {
			return;
		}
		if (!this.validate()) {
			return;
		}
		this.setState((prevState) => {
			prevState.sending = true;
			prevState.showCaptcha = false;
			prevState.failed = false;
			return prevState;
		});

		this.sendSf(clonedForm).then((response) => {
			console.log(response);
			if (response == -1) {
				this.setState((prevState) => {
					prevState.failed = true;
					prevState.sending = false;
					return prevState;
				});
			}

			if (!this.state.failed) {
				this.setState((prevState) => {
					prevState.sending = false;
					prevState.submitted = true;
					return prevState;
				});
				setTimeout(() => {
					this.handleClose();
				}, 3000);
			} else {
				this.setState((prevState) => {
					prevState.showCaptcha = true;
					return prevState;
				});
			}
		});
	};

	//assess form fields
	validate = () => {
		console.log("run");
		console.log(clonedForm);
		console.log(this.state.valid);
		let clonedForm = Object.assign({}, this.state.form);
		let globValid = true;
		let tempForm = clonedForm;
		let tempValid = this.state.valid;
		delete tempForm.contact;

		for (const property in tempForm) {
			tempValid[property] = true;
			tempForm[property] = tempForm[property].trim();
			console.log(tempForm[property]);
			if (tempForm[property] == "") {
				globValid = false;
				tempValid[property] = false;
			} else if (property == "phone" && tempForm[property].match(/^d+$/) !== null) {
				globValid = false;
				tempValid[property] = false;
			} else if (property == "email") {
				if (tempForm[property].indexOf("@") == -1) {
					globValid = false;
					tempValid[property] = false;
				}
			}
		}
		console.log(tempValid);
		this.setState((prevState) => {
			prevState.valid = tempValid;
			return prevState;
		});
		return globValid;
	};

	//Output message if invalid field
	invalidMessage = (field, placeholderName) => {
		if (field == false) {
			return <div style={{ color: "#dc3545", fontSize: "1rem" }}>Please provide a valid {placeholderName}.</div>;
		}
	};

	handleChange = (event) => {
		let name = event.target.name;
		let val = event.target.value;
		this.setState((prevState) => {
			prevState.form[name] = val;
			return prevState;
		});
	};

	componentDidUpdate = () => {
		if (this.state.booth_data == null || this.state.booth_data == undefined) {
			var onloadCallback = function () {
				grecaptcha.render("html_element", {
					sitekey: "6LdmffkUAAAAAO_J-k20zOw_9OzNtGQ_Rq6pJAln",
				});
			};
		}
	};

	render() {
		if (this.state.booth_data == null || this.state.booth_data == undefined) {
			return <></>;
		}
		//console.log("render");
		return (
			<Modal className="exhibitor-drilldown__modal" show={this.props.show} onHide={this.handleClose} centered>
				<ModalHeader closeButton>
					<ModalTitle>Contact: {this.state.booth_data.Exhibiting_Name__c}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div id="newFormModal">
						<div className="formsChunk">
							<p>
								Please complete the below form giving as much detail as you can to your request.{" "}
								{this.state.options.event} will relay this on to the exhibitor on your behalf.
							</p>
							<p style={{ color: "red" }}>
								The purpose of this form is to request further information on the exhibitor’s goods, capabilities or services.{"  "}
								Messages will be reviewed by {this.state.options.event} and solicitation or off topic messages will not be forwarded.
							</p>
							<form id="sfForm" className="Enquiry" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="inputWrapper">
										<label htmlFor="first_name"></label>
										<input
											id="first_name"
											name="first_name"
											value={this.state.form.first_name}
											onChange={this.handleChange}
											placeholder="First Name"
											title="First Name"
											required
											className="required form-control"
										/>
										{this.invalidMessage(this.state.valid.first_name, "First Name")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="last_name"></label>
										<input
											id="last_name"
											name="last_name"
											value={this.state.form.last_name}
											onChange={this.handleChange}
											placeholder="Last Name"
											title="Last Name"
											required
											className="required form-control"
										/>
										{this.invalidMessage(this.state.valid.last_name, "Last Name")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="email"></label>
										<input
											id="email"
											name="email"
											value={this.state.form.email}
											onChange={this.handleChange}
											placeholder="Email"
											title="Email"
											required
											className="required form-control"
											type="email"
										/>
										{this.invalidMessage(this.state.valid.email, "Email")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="company"></label>
										<input
											id="company"
											name="company"
											value={this.state.form.company}
											onChange={this.handleChange}
											placeholder="Company"
											required
											title="Company"
											className="required form-control"
											type="text"
										/>
										{this.invalidMessage(this.state.valid.company, "Company")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="job_title"></label>
										<input
											id="title"
											name="title"
											value={this.state.form.title}
											onChange={this.handleChange}
											placeholder="Job Title"
											required
											title="Job Title"
											className="required form-control"
											type="text"
										/>
										{this.invalidMessage(this.state.valid.title, "Job Title")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="Phone Number"></label>
										<input
											id="phone"
											name="phone"
											value={this.state.form.phone}
											onChange={this.handleChange}
											placeholder="Phone Number"
											title="Phone Number"
											type="text"
											className="form-control required"
											required
										/>
										{this.invalidMessage(this.state.valid.phone, "Phone Number")}
									</div>
									<div className="inputWrapper">
										<label htmlFor="Details of inquiry"></label>
										<textarea
											style={{ height: "150px" }}
											id="Inquiry_Notes__c"
											name="Inquiry_Notes__c"
											value={this.state.form.Inquiry_Notes__c}
											onChange={this.handleChange}
											placeholder="Details of inquiry"
											title="Details of inquiry"
											type="text"
											className="form-control required"
											required></textarea>
										{this.invalidMessage(this.state.valid.Inquiry_Notes__c, "Message")}
									</div>
								</div>
								<input type="hidden" name="contact" value="true" />
								<div style={{ display: this.state.submitted ? "block" : "none" }} className="row">
									<div style={{ textAlign: "center" }} className="col-md-12">
										<p style={{ marginTop: "15px" }}>Thank you. Your request has been fowarded.</p>
									</div>
								</div>
								<div style={{ display: this.state.failed ? "block" : "none" }} className="row">
									<div style={{ textAlign: "center" }} className="col-md-12">
										<p style={{ marginTop: "15px", color: "red" }}>Please check the the captcha form.</p>
									</div>
								</div>
								{this.state.showCaptcha ? (
									<div style={{ marginTop: "15px" }}>
										<Recaptcha sitekey="6LdmffkUAAAAAO_J-k20zOw_9OzNtGQ_Rq6pJAln" verifyCallback={this.handleCaptcha} />
									</div>
								) : (
									""
								)}
								{!this.state.submitted ? (
									<>
										<div className="row">
											<div style={{ padding: "15px" }}>
												<div id="html_element"></div>
											</div>
											{this.state.sending ? (
												<div style={{ textAlign: "center", marginTop: "40px" }}>
													<div className="spinner-border" role="status">
														<span className="sr-only">Loading...</span>
													</div>
												</div>
											) : (
												""
											)}
											{!this.state.sending ? (
												<>
													<div style={{ textAlign: "center" }} className="col-md-6">
														<button type="button" className="btn btn-default primaryAction" onClick={this.handleClose}>
															Cancel
														</button>
													</div>
													<div style={{ textAlign: "center" }} className="col-md-6">
														<button
															type="submit"
															name="submit"
															className="btn btn-default primaryAction submitQuery"
															onClick={this.handleSubmit}>
															Submit
														</button>
													</div>
												</>
											) : (
												""
											)}
										</div>
									</>
								) : (
									""
								)}
							</form>
						</div>
						<p style={{ fontSize: "12px", marginTop: "12px", fontWeight: "bold" }}>
							<em>By submitting this form I acknowledge my contact details will be shared with the exhibitor. </em>
						</p>
						<p style={{ fontSize: "12px", marginTop: "12px", fontWeight: "bold" }}>
							<em>
								View our{" "}
								<a style={{ fontWeight: "bolder" }} href="site/privacy-policy">
									privacy policy
								</a>{" "}
								to understand how we collect, protect and manage your personal information
							</em>
						</p>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}
export default ContactModal;
