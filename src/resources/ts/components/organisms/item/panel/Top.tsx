import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

export const Top: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SPanelTop>{children}</SPanelTop>;
});

const SPanelTop = styled.div`
    position: relative;
`;
