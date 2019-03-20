import React, {Component} from 'react';
import {Container, FormGroup, Media} from 'reactstrap';
import {AvField, AvForm, AvGroup} from 'availity-reactstrap-validation';
import {Link} from "react-router-dom";
import logo from "../img/cognito-logo.png";
import LoaderButton from "../common/LoaderButton";
import {Auth} from "aws-amplify";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmationCode: "",
            newUser: null,
            errorMessage: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({
                newUser
            });
        } catch (e) {
            this.setState({
                errorMessage: e.message
            });
        }

        this.setState({isLoading: false});
    };

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            this.setState({
                isLoading: false,
                errorMessage: e.message
            });
        }
    };

    renderRegisterForm() {
        return (
            <AvForm onSubmit={this.handleSubmit} d>
                <Media
                    object
                    className="image"
                    src={logo}

                    alt="Generic placeholder image"
                />

                <h2 className="h3 mb-3 font-weight-normal text-center">Create new account</h2>

                {this.state.errorMessage &&
                <p className="text-center text-danger">{this.state.errorMessage}</p>
                }

                <AvGroup>
                    <AvField
                        name="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                        validate={{
                            required: {value: true, errorMessage: 'Enter email'},
                            email: {value: true, errorMessage: 'Invalid email adress'},
                            minLength: {value: 6, errorMessage: 'Your email must be between 6 and 30 characters'},
                            maxLength: {value: 30, errorMessage: 'Your email must be between 6 and 30 characters'},
                        }}
                    />
                </AvGroup>

                <AvGroup>
                    <AvField
                        name="password"
                        type="password"
                        placeholder="Super secret password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        validate={{
                            required: {value: true, errorMessage: 'Enter password'}
                        }}
                    />
                </AvGroup>

                <AvGroup>
                    <AvField
                        required
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        validate={{
                            required: {value: true, errorMessage: 'Enter password confirmation'},
                            match: {value: 'password', errorMessage: 'Passwords don\'t match'}
                        }}

                    />
                </AvGroup>

                <FormGroup>
                    <LoaderButton
                        block
                        className="btn-lg btn-block purple-button"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Signup"
                        loadingText="Signing up..."
                    />
                </FormGroup>

                <p className="small-text mt-2 text-center">Already registered? <Link to="/login">Login now!</Link></p>
            </AvForm>
        );
    }

    renderConfirmForm() {
        return (
            <AvForm onSubmit={this.handleConfirmationSubmit}>
                <Media object className="image" src={logo}
                       alt="Generic placeholder image"/>

                <h2 className="h3 mb-3 font-weight-normal text-center">Confirmation code</h2>

                {this.state.errorMessage &&
                <p className="text-center text-danger">{this.state.errorMessage}</p>
                }

                <AvGroup>
                    <AvField
                        name="confirmationCode"
                        placeholder="Enter your confirmation code"
                        value={this.state.confirmationCode}
                        onChange={e => this.setState({confirmationCode: e.target.value})}
                        validate={{
                            required: {value: true, errorMessage: 'Enter valid confirmation code'},
                            pattern: {
                                value: '^[A-Za-z0-9]+$',
                                errorMessage: 'Your username must be composed only with letter and numbers'
                            },
                            minLength: {
                                value: 6,
                                errorMessage: 'Your username must be between 6 and 30 characters'
                            },
                            maxLength: {
                                value: 30,
                                errorMessage: 'Your username must be between 6 and 30 characters'
                            },
                        }}
                    />
                </AvGroup>

                <FormGroup>
                    <LoaderButton
                        block
                        className="btn-lg btn-block purple-button"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Verify"
                        loadingText="Veryfing..."
                    />
                </FormGroup>
            </AvForm>
        );
    }


    render() {
        if (this.state.showError) {
            this.notification = [
                <p className="text-center text-danger">{this.state.errorMessage}</p>
            ]
        } else {
            this.notification = "";
        }

        return (
            <Container className="form">
                {this.state.newUser === null
                    ? this.renderRegisterForm()
                    : this.renderConfirmForm()}
            </Container>
        );
    }
}

export default Login;

