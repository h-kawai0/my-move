import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

export const Author: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SPanelAuthor>{children}</SPanelAuthor>;
});

const SPanelAuthor = styled.div`
    align-items: center;
    display: flex;
`;
