import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const Notes: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SNotes>{children}</SNotes>;
});

const SNotes = styled.span`
    font-size: ${fonts.size.m};
    color: ${colors.base.paletteTrueRed};
    margin-left: ${space.s};
`;
