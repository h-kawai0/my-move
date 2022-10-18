import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

export const Author: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SPanelAuthor className="c-panel__author">{children}</SPanelAuthor>;
});

const SPanelAuthor = styled.div`
    align-items: center;
    display: flex;
`;
