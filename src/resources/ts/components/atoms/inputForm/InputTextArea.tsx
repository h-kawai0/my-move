import React, { ChangeEvent, memo, useCallback, VFC } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    value: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    isValid?: string | undefined;
};

export const InputTextArea: VFC<Props> = memo((props) => {
    const { value, name, onChange, isValid } = props;

    const validMax = useCallback(() => {
        if (value.length <= 500) {
            return false;
        } else {
            return true;
        }
    }, [value]);

    return (
        <>
            <STextArea
                value={value}
                name={name}
                onChange={onChange}
                isValid={isValid}
                cols={30}
                rows={10}
            />
            <SCounter>
                <SCounterIsValid value={value}>{value.length}</SCounterIsValid>
                /500
            </SCounter>
        </>
    );
});

const STextArea = styled.textarea<{ isValid: string | undefined }>`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: ${space.m};
    border: 1px solid ${colors.base.paletteDarkGray};
    font-size: ${fonts.size.default};
    border-radius: 3px;
    ${({ isValid }) =>
        isValid &&
        css`
            background: ${colors.valid.validColorBackGround};
            border-color: ${colors.valid.validColorBorder};
        `}
`;

const SCounter = styled.p`
    display: block;
    text-align: right;
`;

const SCounterIsValid = styled.span<{ value: string }>`
    ${({ value }) =>
        value.length > 500 &&
        css`
            color: ${colors.valid.validColorInputText};
            font-weight: bold;
        `}
`;
