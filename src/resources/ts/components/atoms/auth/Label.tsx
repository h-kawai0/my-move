import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

export const Label: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SAuthLabel>{children}</SAuthLabel>;
});

const SAuthLabel = styled.label`
    display: block;
`;
