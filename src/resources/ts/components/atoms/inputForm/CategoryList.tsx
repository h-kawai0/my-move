import React, { VFC, memo, ChangeEvent } from "react";

import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
    name: string;
    category_id: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    isValid?: string | undefined;
    categoryList: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    }[];
};

export const CategoryList: VFC<Props> = memo((props) => {
    const { name, category_id, onChange, categoryList, isValid } = props;

    return (
        <SSelect value={category_id} onChange={onChange} name={name} isValid={isValid }>
            <option value={0}>選択してください</option>

            {categoryList.map((val, i) => (
                <option key={val.id} value={val.id}>
                    {val.name}
                </option>
            ))}
        </SSelect>
    );
});

const SSelect = styled.select<{ isValid: string | undefined }>`
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
    ${({ isValid }) =>
        isValid &&
        css`
            background: ${colors.valid.validColorBackGround};
            border-color: ${colors.valid.validColorBorder};
        `};

`;
