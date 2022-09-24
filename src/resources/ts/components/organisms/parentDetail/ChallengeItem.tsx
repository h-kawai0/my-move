import React, { memo, MouseEvent, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { BaseButton, SignUpButton } from "../../atoms/button/BaseButton";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    toggleChallenge: (e: MouseEvent<HTMLButtonElement>) => void;
    isSuccess: boolean;
    isChallenge: boolean;
    user: number;
};

export const ChallengeItem: VFC<Props> = memo((props) => {
    const { toggleChallenge, isChallenge, isSuccess, user } = props;

    return (
        <>
            {user && isChallenge && isSuccess ? (
                <SAllClearBtn
                    as="span"
                    className="c-btn c-btn--comped c-btn--notAllowed p-parentDetail__btn"
                >
                    全てクリア!!
                </SAllClearBtn>
            ) : user && isChallenge ? (
                <SChallenging
                    as="span"
                    className="c-btn c-btn--comped c-btn--notAllwed p-parentDetail__btn"
                >
                    チャレンジ中!!
                </SChallenging>
            ) : user && !isChallenge ? (
                <STryButton
                    as="button"
                    className="c-btn c-btn--challenge p-parentDetail__btn"
                    onClick={toggleChallenge}
                >
                    チャレンジ
                </STryButton>
            ) : (
                <SSignUpButton
                    to="/login"
                    className="c-btn c-btn--signup p-parentDetail__btn"
                >
                    会員登録してチャレンジする
                </SSignUpButton>
            )}
        </>
    );
});

const SAllClearBtn = styled(BaseButton)`
    background: ${colors.base.paletteDarkGray};
    color: ${colors.font.fontColorDefault};
    font-weight: initial;
    &:hover {
        cursor: initial;
        opacity: 1;
    }
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 60%;
  `};
`;

const SChallenging = styled(BaseButton)`
    background: ${colors.base.paletteDarkGray};
    color: ${colors.font.fontColorDefault};
    font-weight: initial;
    &:hover {
        cursor: initial;
        opacity: 1;
    }
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 60%;
  `};
`;

const STryButton = styled(BaseButton)`
    background: ${colors.base.paletteTrueBlue};
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 60%;
  `};
`;

const SSignUpButton = styled(SignUpButton)`
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 60%;
  `};
`;
