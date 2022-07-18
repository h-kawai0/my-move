import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";
import { Login } from "../components/pages/Auth/Login";
import { Register } from "../components/pages/Auth/Register";
import { PrivateRoute, PublicRoute } from "../context/AuthContext";
import { Forgot } from "../components/pages/Auth/Forgot";
import { ResetPassword } from "../components/pages/Auth/ResetPassword";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Top />
            </Route>

            {/* プライベートルート */}
            <PrivateRoute path="/items">
                <Items />
            </PrivateRoute>

            {/* パブリックルート */}
            <PublicRoute path="/login">
                <Login />
            </PublicRoute>
            <PublicRoute path="/register">
                <Register />
            </PublicRoute>
            <PublicRoute path="/forgot-password">
                <Forgot />
            </PublicRoute>

            <PublicRoute path="/reset-password/:code">
                <ResetPassword />
            </PublicRoute>
        </Switch>
    );
});
