import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
};

export const Layout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <Header />
            <SMain>{children}</SMain>
            <Footer />
        </>
    );
});

const SMain = styled.main`
    margin: 0 auto;
    width: 100%;
`;
