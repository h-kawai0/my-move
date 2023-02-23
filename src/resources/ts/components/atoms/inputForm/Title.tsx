import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
};

export const Title: VFC<Props> = memo((props) => {
    const { children } = props;
    return <STitle>{children}</STitle>;
});

const STitle = styled.h1`
    margin-bottom: ${space.xxxl};
    text-align: center;
    font-size: ${fonts.size.xxl};
`;
