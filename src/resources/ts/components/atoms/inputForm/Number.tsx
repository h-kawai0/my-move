import React, { VFC, memo, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    name: string;
    value: string;
    isValid?: string | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Number: VFC<Props> = memo((props) => {
    const { name, value, isValid, onChange } = props;
    return (
        <SContainer>
            <SNumber
                type="number"
                min="0"
                step="0.1"
                name={name}
                value={value}
                isValid={isValid}
                onChange={onChange}
            />
            時間
        </SContainer>
    );
});

const SContainer = styled.div`
    display: flex;
    align-items: flex-end;
`;

const SNumber = styled.input<{ isValid: string | undefined }>`
    width: 20%;
    box-sizing: border-box;
    padding: ${space.m};
    height: 40px;
    border: 1px solid ${colors.base.paletteDarkGray};
    font-size: ${fonts.size.default};
    border-radius: 3px;
    margin-right: ${space.m};
    ${({ isValid }) =>
        isValid &&
        css`
            background: ${colors.valid.validColorBackGround};
            border-color: ${colors.valid.validColorBorder};
        `};
`;
