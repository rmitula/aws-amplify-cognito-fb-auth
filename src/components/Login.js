import React, {Component} from 'react';
import {Container, FormGroup, Media} from 'reactstrap';
import {AvField, AvForm, AvGroup} from 'availity-reactstrap-validation';
import {Link} from "react-router-dom";
import {Auth} from "aws-amplify";
import LoaderButton from "../common/LoaderButton";
import logo from "../img/cognito-logo.png";
import FacebookButton from "../common/FacebookButton";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            errorMessage: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({
            isLoading: true,
            errorMessage: ''
        });

        try {
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

    handleFbLogin = () => {
        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
    };

    render() {
        return (
            <Container className="form">
                <AvForm onSubmit={this.handleSubmit}>

                    <Media
                        object
                        className="image"
                        src={logo}

                        alt="Generic placeholder image"
                    />

                    <h2 className="h3 mb-3 font-weight-normal text-center">Please sign in</h2>
                    {this.state.errorMessage &&
                    <p className="text-center text-danger">{this.state.errorMessage}</p>
                    }

                    <AvGroup>
                        <AvField
                            name="usernameOrEmail"
                            placeholder="Username or Email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            validate={{
                                required: {value: true, errorMessage: 'Enter your username or email'},
                                minLength: {
                                    value: 6,
                                    errorMessage: 'Your username or email must be between 6 and 30 characters'
                                },
                                maxLength: {
                                    value: 30,
                                    errorMessage: 'Your username or email must be between 6 and 30 characters'
                                },
                            }}
                        />
                    </AvGroup>

                    <AvGroup>
                        <AvField
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                            validate={{
                                required: {value: true, errorMessage: 'Enter your password'},
                                minLength: {
                                    value: 4,
                                    errorMessage: 'Your password must be between 4 and 30 characters'
                                },
                                maxLength: {
                                    value: 30,
                                    errorMessage: 'Your password must be between 4 and 30 characters'
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
                            text="Sign in"
                            loadingText="Logging in…"
                        />
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <FacebookButton
                            onLogin={this.handleFbLogin}
                        />
                    </FormGroup>

                    <p className="small-text mt-2 text-center">Or <Link to="/register">register now!</Link></p>

                </AvForm>
            </Container>
        );
    }
}

export default Login;

