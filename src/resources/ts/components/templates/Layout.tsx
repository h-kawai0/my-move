import React, { memo, VFC } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {
    useChildDetailItem,
    useDetailParentItem,
} from "../../queries/ItemsQuery";
import { colors } from "../../theme/setting/colors";
import { space } from "../../theme/setting/space";

import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

// 親MyMoveタイトル取得
const DynamicIdBreadCrumb = ({ match }: any) => {
    const { data } = useDetailParentItem(match.params.id);

    return <span>{data?.parentItem.name}</span>;
};

// 子MyMoveタイトル取得
const DynamicPassBreadCrumb = ({ match }: any) => {
    const { data } = useChildDetailItem({
        id: match.params.id,
        pass: match.params.pass,
    });
    return <span>{data?.childItem.name}</span>;
};

export const routes = [
    {
        path: "/",
        breadcrumb: "TOP",
        children: [
            {
                path: "items",
                breadcrumb: "MyMove一覧",
                children: [
                    {
                        path: ":id",
                        breadcrumb: DynamicIdBreadCrumb,
                        children: [
                            {
                                path: ":pass",
                                breadcrumb: DynamicPassBreadCrumb,
                            },
                        ],
                    },
                ],
            },
            {
                path: "login",
                breadcrumb: "ログイン",
                children: [
                    {
                        path: "forgot-password",
                        breadcrumb: "パスワードをお忘れのかた",
                    },
                    {
                        path: "reset-password",
                        breadcrumb: "新しいパスワードの入力",
                    },
                ],
            },
            {
                path: "register",
                breadcrumb: "会員登録",
            },
            {
                path: "mypage",
                breadcrumb: "マイページ",
                children: [
                    {
                        path: "edit-profile",
                        breadcrumb: "プロフィール登録・編集",
                    },
                    {
                        path: "edit-password",
                        breadcrumb: "パスワードを変更",
                    },
                    {
                        path: "new-item",
                        breadcrumb: "MyMove新規登録",
                    },
                    {
                        path: "edit-item/:id",
                        breadcrumb: "MyMove編集",
                    },
                ],
            },
        ],
    },
];

export const Layout: VFC = memo(() => {
    const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

    return (
        <>
            <Header />
            <SBread>
                {breadcrumbs.map(({ match, breadcrumb }, i) => (
                    <div key={match.pathname}>
                        {!(breadcrumbs.length - 1 === i) ? (
                            <>
                                <SBreadLink to={match.pathname}>
                                    {breadcrumb}
                                </SBreadLink>
                                &gt;
                            </>
                        ) : (
                            <span>{breadcrumb}</span>
                        )}
                    </div>
                ))}
            </SBread>

            <SMain>
                <Outlet />
            </SMain>
            <Footer />
        </>
    );
});

const SMain = styled.main`
    margin: 0 auto;
    width: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
`;

const SBread = styled.div`
    padding-top: 90px;
    padding-left: ${space.xl};
    padding-right: ${space.xl};
    padding-bottom: ${space.m};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
    word-break: break-all;
    display: flex;
`;

const SBreadLink = styled(NavLink)`
    &:hover {
        color: ${colors.base.paletteGambogeOrange};
    }
`;
