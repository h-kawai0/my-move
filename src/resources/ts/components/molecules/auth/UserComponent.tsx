import React, { memo, VFC, ReactNode } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const UserComponent: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SAuthComponent>{children}</SAuthComponent>;
});

const SAuthComponent = styled.div`
    margin-bottom: ${space.xl};
`;
