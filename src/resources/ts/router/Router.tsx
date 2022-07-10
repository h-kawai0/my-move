import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";
import { Login } from '../components/pages/Login';
import { Register } from "../components/pages/Register";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Top />
            </Route>
            <Route path="/items">
                <Items />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    );
});
