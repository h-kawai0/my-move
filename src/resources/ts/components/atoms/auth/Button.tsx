import React, { memo, VFC } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    value: string;
    isLoading: boolean;
};

export const Button: VFC<Props> = memo((props) => {
    const { value, isLoading } = props;

    return (
        <SButton
            type="submit"
            value={value}
            disabled={isLoading}
            $isLoading={isLoading}
        />
    );
});

const SButton = styled.input<{ $isLoading: boolean }>`
    background: ${colors.base.paletteTrueRed};
    width: 100%;
    border: none;
    padding: ${space.l} ${space.xxl};
    display: block;
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.l};
    border-radius: 3px;
    transition: 0.3s;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    &:hover {
        cursor: pointer;
        opacity: 0.9;
        ${({ $isLoading }) =>
            $isLoading &&
            css`
                cursor: not-allowed;
            `}
    }
`;
