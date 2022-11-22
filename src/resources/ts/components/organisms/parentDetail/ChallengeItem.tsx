import React, { memo, MouseEvent, VFC } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { BaseButton, SignUpButton } from "../../atoms/button/BaseButton";
import { breakPoint } from "../../../theme/setting/breakPoint";

// 型定義
type Props = {
    toggleChallenge: (e: MouseEvent<HTMLButtonElement>) => void;
    isSuccess: boolean;
    isChallenge: boolean;
    user: number;
    isLoading: boolean;
};

// チャレンジボタンコンポーネント
export const ChallengeItem: VFC<Props> = memo((props) => {
    const { toggleChallenge, isChallenge, isSuccess, user, isLoading } = props;

    return (
        <>
            {user && isChallenge && isSuccess ? (
                <SAllClearBtn as="span">全てクリア!!</SAllClearBtn>
            ) : user && isChallenge ? (
                <SChallenging as="span">チャレンジ中!!</SChallenging>
            ) : user && !isChallenge ? (
                <STryButton
                    as="button"
                    onClick={toggleChallenge}
                    disabled={isLoading}
                    $sending={isLoading}
                >
                    {isLoading ? "処理中です..." : "チャレンジ"}
                </STryButton>
            ) : (
                <SSignUpButton to="/register">
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

const STryButton = styled(BaseButton)<{ $sending: boolean }>`
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
    ${({ $sending }) =>
        $sending &&
        css`
            background: ${colors.base.paletteDarkGray};
            color: ${colors.font.fontColorDefault};
            font-weight: initial;
            cursor: not-allowed;
        `}
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
