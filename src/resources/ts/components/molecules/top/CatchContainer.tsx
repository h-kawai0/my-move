import React, { memo, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { fonts } from "../../../theme/setting/fonts";
import { SignUpButton } from "../../atoms/button/BaseButton";

type Props = {
    title: string;
    button: string;
};

export const CatchContainer: VFC<Props> = memo((props) => {
    const { title, button } = props;
    return (
        <section>
            <SCatch>
                <SCatchTitle>{title}</SCatchTitle>
                <SCatchButton>{button}</SCatchButton>
            </SCatch>
        </section>
    );
});

const SCatch = styled.div`
    width: 100%;
    padding: ${space.m} ${space.xxl};
    box-sizing: border-box;
    margin-top: ${space.xxl};
    margin-bottom: ${space.xxl};
    text-align: center;
    ${breakPoint.sm`
        padding: ${space.m};
    `}
    ${breakPoint.md`
        padding: ${space.m};
    `}
`;

const SCatchTitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxxl};
    font-family: ${fonts.family.catch};
    margin-bottom: ${space.xl};
    ${breakPoint.sm`
    font-size: ${fonts.size.l};
    `}
    ${breakPoint.md`
    font-size: ${fonts.size.xl};
    `}
`;

const SCatchButton = styled(SignUpButton)`
    padding: ${space.m} ${space.xl};
    font-size: ${fonts.size.l};
    display: inline-block;
`;
