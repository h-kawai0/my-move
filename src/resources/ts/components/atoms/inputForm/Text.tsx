import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const Text: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SText>{children}</SText>;
});

const SText = styled.p`
    font-size: ${fonts.size.m};
    margin-bottom: ${space.xl};
`;
