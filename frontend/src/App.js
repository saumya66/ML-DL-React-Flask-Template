import React, { Component } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			formData: {
				sepalLength: 4,
				sepalWidth: 2,
				petalLength: 1,
				petalWidth: 0,
			},
			result: "",
		};
	}

	handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		var formData = this.state.formData;
		formData[name] = value;
		this.setState({
			formData,
		});
	};

	handlePredictClick = (event) => {
		const formData = this.state.formData;
		this.setState({ isLoading: true });
		fetch("http://127.0.0.1:5000/prediction/", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					result: response.result,
					isLoading: false,
				});
			});
	};

	handleCancelClick = (event) => {
		this.setState({ result: "" });
	};

	render() {
		const isLoading = this.state.isLoading;
		const formData = this.state.formData;
		const result = this.state.result;

		return (
			<Container>
				<div>
					<h1 className="title font-weight-bold">
						Deploying Models for Humans
					</h1>
				</div>
				<div className="content">
					<Form>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Sepal Length</Form.Label>
								<Form.Control
									type="text"
									value={formData.sepalLength}
									name="sepalLength"
									onChange={this.handleChange}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Sepal Width</Form.Label>
								<Form.Control
									type="text"
									value={formData.sepalWidth}
									name="sepalWidth"
									onChange={this.handleChange}
								></Form.Control>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Petal Length</Form.Label>
								<Form.Control
									type="text"
									value={formData.petalLength}
									name="petalLength"
									onChange={this.handleChange}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Petal Width</Form.Label>
								<Form.Control
									value={formData.petalWidth}
									name="petalWidth"
									onChange={this.handleChange}
								></Form.Control>
							</Form.Group>
						</Form.Row>
						<Row className="btnrow">
							<Col>
								<Button
									className="btn1 font-weight-bold"
									variant="primary"
									disabled={isLoading}
									onClick={!isLoading ? this.handlePredictClick : null}
								>
									{isLoading ? "Making prediction" : "Predict"}
								</Button>
							</Col>
							<Col>
								<Button
									className="btn2 font-weight-bold"
									variant="primary"
									disabled={isLoading}
									onClick={this.handleCancelClick}
								>
									Reset
								</Button>
							</Col>
						</Row>
					</Form>
					{result === "" ? null : (
						<Row>
							<Col className="result-container">
								<h5 id="result">{result}</h5>
							</Col>
						</Row>
					)}
				</div>
			</Container>
		);
	}
}

export default App;
