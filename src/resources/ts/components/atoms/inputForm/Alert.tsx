import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const Alert: VFC<Props> = memo((props) => {
    const { children } = props;
    
    return <SAlert>{children}</SAlert>;
});

const SAlert = styled.span`
    display: block;
    color: ${colors.valid.validColorInputText};
    margin-top: ${space.s};
`;
