import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";
import { Login } from "../components/pages/Auth/Login";
import { Register } from "../components/pages/Auth/Register";
import { PrivateRoute, PublicRoute } from "../context/AuthContext";
import { Forgot } from "../components/pages/Auth/Forgot";
import { ResetPassword } from "../components/pages/Auth/ResetPassword";
import { Mypage } from "../components/pages/Mypage";
import { EdifProfile } from "../components/pages/EdifProfile";
import { EditPassword } from "../components/pages/EditPassword";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Top />
            </Route>

            {/* プライベートルート */}
            <PrivateRoute exact path="/items">
                <Items />
            </PrivateRoute>

            <PrivateRoute exact path="/mypage">
                <Mypage />
            </PrivateRoute>

            <PrivateRoute exact path="/mypage/edit-profile">
                <EdifProfile />
            </PrivateRoute>

            <PrivateRoute exact path="/mypage/edit-password">
                <EditPassword />
            </PrivateRoute>

            {/* パブリックルート */}
            <PublicRoute exact path="/login">
                <Login />
            </PublicRoute>
            <PublicRoute exact path="/register">
                <Register />
            </PublicRoute>
            <PublicRoute exact path="/forgot-password">
                <Forgot />
            </PublicRoute>

            <PublicRoute exact path="/reset-password/:code">
                <ResetPassword />
            </PublicRoute>
        </Switch>
    );
});
