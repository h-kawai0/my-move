import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";
import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import { PrivateRoute, PublicRoute } from "../context/AuthContext";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Top />
            </Route>
            <PrivateRoute path="/items">
                <Items />
            </PrivateRoute>
            <PublicRoute path="/login">
                <Login />
            </PublicRoute>
            <PublicRoute path="/register">
                <Register />
            </PublicRoute>
        </Switch>
    );
});
