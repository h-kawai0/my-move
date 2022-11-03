import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

export const Spinner: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SSpinner>{children}</SSpinner>;
});

const SSpinner = styled.div`
  display: flex;
  justify-content: center;
`;