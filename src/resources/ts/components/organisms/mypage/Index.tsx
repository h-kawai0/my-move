import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const Index: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SIndex>{children}</SIndex>;
});

const SIndex = styled.div`
    margin-bottom: ${space.xl};
`;
