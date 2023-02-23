import React, { memo, MouseEvent, useMemo, VFC } from "react";
import styled, { css } from "styled-components";

import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { BaseButton } from "../../atoms/button/BaseButton";
import { Clear } from "../../../types/api/item";

// 型定義
type Props = {
    toggleChallenge: (e: MouseEvent<HTMLButtonElement>) => void;
    toggleClear: (e: number) => void;
    isSuccess: boolean;
    isChallenge: boolean;
    user: number | undefined;
    childId: number | undefined;
    childItems:
        | {
              id: number;
              name: string;
              detail: string;
              parent_item_id: number;
              clears: Clear[];
          }[]
        | undefined;
    getPass?: string;
    isChallengeRequest: boolean;
    isClearRequest: boolean;
    childCurrentNum: number;
};

// 子MyMove詳細画面
export const DetailItems: VFC<Props> = memo((props) => {
    const {
        toggleChallenge,
        isChallenge,
        isSuccess,
        user,
        toggleClear,
        childId,
        childItems,
        getPass,
        isChallengeRequest,
        isClearRequest,
        childCurrentNum,
    } = props;

    const clearId = childId ? childId : 0;

    // 前のMyMoveをクリアしていなければボタンをロック中にする
    const current = useMemo(() => {
        // GETパラメータの子MyMoveのIDを数値に変換
        const childItemNum = getPass ? parseInt(getPass) : "";

        const clearItems = childItems?.map((el, i) => {
            // 数値に変換した子MyMoveの値と展開中の子MyMoveの値が一致するか確認
            if (childItemNum === el.id) {
                // console.log(childItemNum, childItems[i].id);

                // 最初の子MyMoveの場合ならクリアボタンを表示
                if (i === 0) {
                    return true;

                    // 前のMyMoveをクリアしていなければクリアボタンを非表示にする
                } else if (childItems[i - 1].clears.length !== 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });

        return clearItems ? clearItems[childCurrentNum - 1] : false;
    }, [childItems]);

    return (
        <>
            {user && isChallenge && isSuccess && current ? (
                <SChildComplete
                    as="span"
                >
                    クリア済み
                </SChildComplete>
            ) : user && isChallenge && !isSuccess && current ? (
                <SChildClear
                    as="button"
                    onClick={() => toggleClear(clearId)}
                    $isClearRequest={isClearRequest}
                >
                    {isClearRequest ? "処理中です..." : "クリア"}
                </SChildClear>
            ) : user && isChallenge && !isSuccess && !current ? (
                <SChildComplete
                    as="span"
                >
                    ロック中
                </SChildComplete>
            ) : user && !isChallenge ? (
                <SChildChallenge
                    as="button"
                    onClick={toggleChallenge}
                    $isChallengeRequest={isChallengeRequest}
                >
                    {isChallengeRequest ? "処理中です..." : "チャレンジ"}
                </SChildChallenge>
            ) : (
                <SChildRegister
                    to="/login"
                >
                    会員登録してチャレンジする
                </SChildRegister>
            )}
        </>
    );
});

const SChildBtn = styled(BaseButton)`
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
`;

const SChildComplete = styled(SChildBtn)`
    background: ${colors.base.paletteDarkGray};
    color: ${colors.font.fontColorDefault};
    font-weight: initial;
    &:hover {
        cursor: initial;
        opacity: 1;
    }
`;

const SChildClear = styled(SChildBtn)<{ $isClearRequest: boolean }>`
    background: ${colors.base.paletteDarkBlue};
    ${({ $isClearRequest }) =>
        $isClearRequest &&
        css`
            background: ${colors.base.paletteDarkGray};
            color: ${colors.font.fontColorDefault};
            font-weight: initial;
            cursor: not-allowed;
        `}
`;

const SChildChallenge = styled(SChildBtn)<{ $isChallengeRequest: boolean }>`
    background: ${colors.base.paletteTrueBlue};
    ${({ $isChallengeRequest }) =>
        $isChallengeRequest &&
        css`
            background: ${colors.base.paletteDarkGray};
            color: ${colors.font.fontColorDefault};
            font-weight: initial;
            cursor: not-allowed;
        `}
`;

const SChildRegister = styled(SChildBtn)`
    background: ${colors.base.paletteCyanBlue};
`;
