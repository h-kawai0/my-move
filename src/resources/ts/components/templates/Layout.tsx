import React, { memo, VFC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

export const Layout: VFC = memo(() => {
    return (
        <>
            <Header />
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
