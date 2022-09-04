import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";

type Props = {
    children: ReactNode;
};

export const Sup: VFC<Props> = memo((props) => {
    const { children } = props;
    return <STxt>{children}</STxt>;
});

const STxt = styled.span`
    font-size: ${fonts.size.s};
    display: block;
`;
