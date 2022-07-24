import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { FlashMsg } from "../organisms/FlashMsg";

import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
};

export const Layout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <FlashMsg />
            <Header />
            <SMain>{children}</SMain>
            <Footer />
        </>
    );
});

const SMain = styled.main`
    margin: 0 auto;
    width: 100%;
    padding-top: 160px;
    padding-bottom: 160px;
`;
