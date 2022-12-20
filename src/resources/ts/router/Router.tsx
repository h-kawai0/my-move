import React, { memo, ReactNode, VFC } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

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
import { Layout } from "../components/templates/Layout";
import { Page404 } from "../components/pages/404";

// 型定義
type Props = {
    children: ReactNode;
    exact: boolean;
    path: string;
};

// ルーター
export const Router: VFC = memo(() => {
    const { isAuth } = useAuth();

    const GuardRoute = (props: Props) => {
        const { children, ...rest } = props;

        return (
            <Route
                {...rest}
                children={({ location }: { location: ReactNode }) =>
                    isAuth ? (
                        children
                    ) : (
                        <Navigate to="/login" state={{ from: location }} />
                    )
                }
            />
        );
    };

    // ログインしている場合はMyMove一覧へ遷移
    const NotLoginRoute = () => {
        if (isAuth) return <Navigate to="items" />;
        return <Outlet />;
    };

    const RequireAuth = () => {
        const location = useLocation();

        if (!isAuth) {
            console.log("ろぐいんしていません");
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        return <Outlet />;
    };

    return (
        <Routes>
            <Route element={<Layout />}>
                {/* ログインしていない時のみ表示 */}

                <Route element={<NotLoginRoute />}>
                    <Route path="/" element={<Top />} />
                    <Route index element={<Top />} />

                    <Route path="login">
                        <Route index element={<Login />} />
                        <Route path="forgot-password" element={<Forgot />} />
                        <Route
                            path="reset-password/:code"
                            element={<ResetPassword />}
                        />
                    </Route>
                    <Route path="register" element={<Register />} />
                </Route>

                {/* プライベートルート */}
                <Route element={<RequireAuth />}>
                    {/* マイページ */}
                    <Route path="mypage">
                        <Route index element={<Mypage />} />
                        <Route path="edit-profile" element={<EdifProfile />} />
                        <Route
                            path="edit-password"
                            element={<EditPassword />}
                        />
                        <Route path="new-item" element={<NewItem />} />
                        <Route path="edit-item/:id" element={<EditItem />} />
                    </Route>
                </Route>

                {/* 共通ルート */}
                <Route path="items">
                    <Route index element={<Items />} />
                    <Route path=":id">
                        <Route index element={<DetailParentItem />} />
                        <Route path=":pass" element={<DetailChildItem />} />
                    </Route>
                </Route>

                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
});
