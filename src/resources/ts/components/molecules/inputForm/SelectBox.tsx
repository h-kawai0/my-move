import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const SelectBox: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <SBox>
                {children}
        </SBox>
    );
});

const SBox = styled.div`
    width: 60%;
    text-align: center;
    margin-bottom: ${space.s};
    position: relative;
    border: 1px solid ${colors.base.paletteSilverGray};
    border-radius: 2px;
    background: ${colors.base.paletteTrueWhite};
    &::before {
        position: absolute;
        top: 45%;
        right: 0.9em;
        width: 0;
        height: 0;
        padding: 0;
        content: "";
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid ${colors.base.paletteDimGray};
        pointer-events: none;
    }
    &::after {
        position: absolute;
        top: 0;
        right: 2.5em;
        bottom: 0;
        width: 1px;
        content: "";
        border-left: 1px solid ${colors.base.paletteSilverGray};
    }

    ${breakPoint.sm`
        width: 100%;
    `}
`;

const SSelect = styled.select`
    width: 100%;
    padding: ${space.m} ${space.xxxl} ${space.m} ${space.m};
    text-indent: 0.01px;
    font-size: ${fonts.size.default};
    cursor: pointer;
    text-overflow: ellipsis;
    border: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    appearance: none;
    &::-ms-expand {
        display: none;
    }
`;
