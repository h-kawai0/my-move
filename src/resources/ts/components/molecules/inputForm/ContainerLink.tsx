import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const ContainerLink: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SContainerLink>{children}</SContainerLink>;
});

const SContainerLink = styled.div`
    margin-bottom: ${space.xl};
`;
