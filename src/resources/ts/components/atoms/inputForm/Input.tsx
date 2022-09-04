import React, { memo, VFC, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    value: string | number;
    type: string;
    name: string;
    placeholder: string;
    autoComplete?: string;
    autoFocus?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isValid?: string | undefined;
};

export const Input: VFC<Props> = memo((props) => {
    const {
        isValid,
        value,
        type,
        name,
        placeholder,
        autoComplete,
        autoFocus = false,
        onChange,
    } = props;

    return (
        <SInput
            value={value}
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={onChange}
            isValid={isValid}
        />
    );
});

const SInput = styled.input<{ isValid: string | undefined }>`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: ${space.m};
    height: 60px;
    border: 1px solid ${colors.base.paletteDarkGray};
    font-size: ${fonts.size.default};
    border-radius: 3px;
    ${({ isValid }) =>
        isValid &&
        css`
            background: ${colors.valid.validColorBackGround};
            border-color: ${colors.valid.validColorBorder};
        `};
`;
