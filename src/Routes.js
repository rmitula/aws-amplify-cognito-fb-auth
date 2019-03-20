import React from 'react';
import {Switch} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AppliedRoute from "./common/AppliedRoute";
import Register from "./components/Register";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps}/>
        <AppliedRoute path="/register" exact component={Register} props={childProps}/>
    </Switch>
