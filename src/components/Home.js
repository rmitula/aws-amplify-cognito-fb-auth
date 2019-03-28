import React, {Component} from 'react';
import {Container, Form, Media} from "reactstrap";
import logo from "../img/lambda-logo.png";
import {API} from "aws-amplify";
import LoaderButton from "../common/LoaderButton";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            displayError: false,
            response: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({
            isLoading: true,
        });
        this.call()
    };

    call() {
        return API.get("test-api", "/", {headers: {'Content-Type': 'application/json'}}).then(response => {
            this.setState({
                isLoading: false,
                displayError: false,
                response: response
            });
        }).catch(error => {
            this.setState({
                isLoading: false,
                displayError: true
            });
        });
    }


    render() {
        return (
            <Container className="form">
                <Media
                    object
                    className="image"
                    src={logo}
                    alt="Generic placeholder image"
                />

                <h2 className="h3 mb-3 font-weight-normal text-center">Try it</h2>

                <Form onSubmit={this.handleSubmit}>
                    <LoaderButton
                        block
                        className="mb-3 btn-lg btn-block yellow-button"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Call Lambda"
                        loadingText="Calling…"
                    />
                </Form>

                {this.state.response &&
                <code>{JSON.stringify(this.state.response, null, 2)}</code>
                }

                {this.state.displayError &&
                <p className="mt-4 text-danger text-center">Lambda call failed, try to login ;)</p>
                }
            </Container>
        );
    }
}

export default Home;
