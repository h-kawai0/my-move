import React, { memo, ReactElement, ReactNode, VFC } from "react";
import {
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

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
import { useUser } from "../queries/AuthQuery";
import { Layout } from "../components/templates/Layout";
import { Page404 } from "../components/pages/404";

type Props = {
    children: ReactNode;
    exact: boolean;
    path: string;
};

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
        if (isAuth) return <Navigate to="/index" />;
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
                    <Route index element={<Top />} />
                    <Route path="/" element={<Top />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/forgot-password" element={<Forgot />} />

                    <Route
                        path="/reset-password/:code"
                        element={<ResetPassword />}
                    />
                </Route>

                {/* プライベートルート */}

                <Route element={<RequireAuth />}>
                    <Route path="/mypage" element={<Mypage />} />

                    <Route
                        path="/mypage/edit-profile"
                        element={<EdifProfile />}
                    />

                    <Route
                        path="/mypage/edit-password"
                        element={<EditPassword />}
                    />

                    <Route path="/items/new" element={<NewItem />} />

                    <Route path="/items/:id/editing" element={<EditItem />} />
                </Route>

                {/* 共通ルート */}
                <Route path="/index" element={<Items />} />

                <Route path="/items/:id" element={<DetailParentItem />} />

                <Route path="/items/:id/:pass" element={<DetailChildItem />} />

                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
});
