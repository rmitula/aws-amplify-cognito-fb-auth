import React, {Component, Fragment} from "react";
import {Auth} from "aws-amplify";
import {Link, withRouter} from 'react-router-dom';
import Routes from "../Routes";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import config from "../config";

library.add(faSpinner);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = async event => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    };

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated});
        console.log("isAuthenticated: ", authenticated);
    };

    async componentDidMount() {
        this.loadFacebookSDK();

        try {
            await Auth.currentAuthenticatedUser();
            this.userHasAuthenticated(true);
        } catch (e) {
            if (e !== "not authenticated") {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    loadFacebookSDK() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId            : config.social.FACEBOOK,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.1'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            !this.state.isAuthenticating &&
            <div className="App">
                <div>
                    <Navbar className="navbar-bg" dark expand="md">
                        <NavbarBrand tag={Link} to="/"><strong>aws-cognito-auth</strong></NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto strong" navbar>
                                {this.state.isAuthenticated
                                    ? <NavItem className="logout" onClick={this.handleLogout}>Logout</NavItem> :
                                    <Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} to="/login">Login</NavLink>
                                        </NavItem>
                                        <NavItem className="or">or</NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/register">Register</NavLink>
                                        </NavItem>
                                    </Fragment>
                                }
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(App);
