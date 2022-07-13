import React, { VFC, memo, ReactNode, FormEvent } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const Form: VFC<Props> = memo((props) => {
    const { children, onSubmit } = props;
    return (
        <SAuth>
            <SAuthForm onSubmit={onSubmit}>{children}</SAuthForm>
        </SAuth>
    );
});

const SAuth = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
`;

const SAuthForm = styled.form`
    margin: 0 auto;
    width: 50%;
    padding: ${space.xxl};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
    ${breakPoint.sm`
    width: 100%;
  `}
    ${breakPoint.md`
  width: 80%;
  `}
`;
