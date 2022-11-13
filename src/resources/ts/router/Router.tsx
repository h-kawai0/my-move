import React, { memo, ReactNode, VFC } from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";

import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";
import { Login } from "../components/pages/Auth/Login";
import { Register } from "../components/pages/Auth/Register";
import { Forgot } from "../components/pages/Auth/Forgot";
import { ResetPassword } from "../components/pages/Auth/ResetPassword";
import { Mypage } from "../components/pages/Mypage";
import { EdifProfile } from "../components/pages/EdifProfile";
import { EditPassword } from "../components/pages/EditPassword";
import { EditItem } from "../components/pages/EditItem";
import { NewItem } from "../components/pages/NewItem";
import { DetailParentItem } from "../components/pages/DetailParentItem";
import { DetailChildItem } from "../components/pages/DetailChildItem";
import { useAuth } from "../hooks/AuthContext";

type Props = {
    children: ReactNode;
    exact: boolean;
    path: string;
};

export const Router: VFC = memo(() => {
    const { isAuth } = useAuth();

    const GuardRoute = (props: Props) => {

        const { children, ...rest} = props;

        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    };
    // ログインしている場合はMyMove一覧へ遷移
    const LoginRoute = (props: RouteProps) => {
        if (isAuth) return <Redirect to="/index" />;
        return <Route {...props} />;
    };

    return (
        <Switch>
            <LoginRoute exact path="/">
                <Top />
            </LoginRoute>

            <Route exact path="/index">
                <Items />
            </Route>

            {/* プライベートルート */}

            <GuardRoute exact path="/mypage">
                <Mypage />
            </GuardRoute>

            <GuardRoute exact path="/mypage/edit-profile">
                <EdifProfile />
            </GuardRoute>

            <GuardRoute exact path="/mypage/edit-password">
                <EditPassword />
            </GuardRoute>

            <GuardRoute exact path="/items/new">
                <NewItem />
            </GuardRoute>

            <GuardRoute exact path="/items/:id/editing">
                <EditItem />
            </GuardRoute>

            {/* パブリックルート */}
            <LoginRoute exact path="/login">
                <Login />
            </LoginRoute>
            <LoginRoute exact path="/register">
                <Register />
            </LoginRoute>
            <LoginRoute exact path="/forgot-password">
                <Forgot />
            </LoginRoute>

            <LoginRoute exact path="/reset-password/:code">
                <ResetPassword />
            </LoginRoute>

            <Route exact path="/items/:id">
                <DetailParentItem />
            </Route>

            <Route exact path="/items/:id/:pass">
                <DetailChildItem />
            </Route>
        </Switch>
    );
});
