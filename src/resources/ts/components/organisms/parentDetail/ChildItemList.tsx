import React, { memo, useMemo, VFC } from "react";
import styled, { css } from "styled-components";

import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { BaseButton } from "../../atoms/button/BaseButton";
import { Link } from "react-router-dom";
import { Clear } from "../../../types/api/item";

// 型定義
type Props = {
    name: string;
    index: number;
    user: number;
    isChallenge: boolean;
    childId: number;
    parentId: number;
    toggleClear: (e: number) => void;
    childItems: {
        id: number;
        name: string;
        detail: string;
        parent_item_id: number;
        clears: Clear[];
    }[];
    clearItem: Clear[];
    isLoading: boolean;
};

// 子MyMoveチャレンジリスト
export const ChildItemList: VFC<Props> = memo((props) => {
    const {
        name,
        index,
        user,
        isChallenge,
        childItems,
        toggleClear,
        childId,
        clearItem,
        parentId,
        isLoading,
    } = props;

    // MyMoveを順番にクリアさせるため、クリアボタンの表示を制御する
    const currentClear = useMemo(() => {
        // 最初の配列はクリアボタンを表示する
        if (index === 0) {
            return true;

            // 配列が最初よりも後の場合のクリアボタン制御
        } else if (index > 0) {
            // 前のMyMoveをクリアしているならクリアボタンを表示
            if (childItems[index - 1].clears.length !== 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, [clearItem, childItems]);

    // DBから取得した　clearレコードが存在するか確認
    const isClear = useMemo(() => {
        return clearItem.length !== 0 ? true : false;
    }, [clearItem]);

    return (
        <SParentDetailItem>
            <SParentDetailLink to={`/items/${parentId}/${childId}`}>
                <p>
                    MyMove{index + 1}「{name}」
                </p>
            </SParentDetailLink>

            {isChallenge && user && (
                <SParentDetailStatus>
                    {isChallenge && user && currentClear && isClear ? (
                        <SParentDetailComplete as="span">
                            クリア済み
                        </SParentDetailComplete>
                    ) : isChallenge && user && currentClear && !isClear ? (
                        <SParentDetailClear
                            as="button"
                            onClick={() => toggleClear(childId)}
                            disabled={isLoading}
                            $clearSending={isLoading}
                        >
                            {isLoading ? "処理中です..." : "クリア"}
                        </SParentDetailClear>
                    ) : isChallenge && user && !currentClear && !isClear ? (
                        <SParentDetailComplete as="span">
                            ロック中
                        </SParentDetailComplete>
                    ) : null}
                </SParentDetailStatus>
            )}
        </SParentDetailItem>
    );
});

const SParentDetailItem = styled.li`
    background: ${colors.base.paletteBrightGray};
    margin-bottom: ${space.l};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${space.m};
    border-radius: 3px;
    flex-wrap: wrap;
    ${breakPoint.sm`
    display: block;
  `};
`;

const SParentDetailLink = styled(Link)`
    padding: ${space.l};
    box-sizing: border-box;
    font-weight: bold;
    word-break: break-all;
    display: block;
    width: 80%;
    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
    ${breakPoint.sm`
    padding: ${space.m};
    width: 100%;
    font-size: ${fonts.size.m};
  `}
`;

const SParentDetailStatus = styled.div`
    ${breakPoint.sm`
    margin-top: ${space.xl};
  `}
`;

const SParentDetailComplete = styled(BaseButton)`
    background: ${colors.base.paletteDarkGray};
    color: ${colors.font.fontColorDefault};
    font-weight: initial;
    &:hover {
        cursor: initial;
        opacity: 1;
    }
    padding: ${space.m} ${space.xl};
    display: block;
    font-size: ${fonts.size.m};
    ${breakPoint.sm`
    width: 100%;
  `};
`;

const SParentDetailClear = styled(BaseButton)<{ $clearSending: boolean }>`
    background: ${colors.base.paletteDarkBlue};
    padding: ${space.m} ${space.xl};
    display: block;
    font-size: ${fonts.size.m};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${({ $clearSending }) =>
        $clearSending &&
        css`
            background: ${colors.base.paletteDarkGray};
            color: ${colors.font.fontColorDefault};
            font-weight: initial;
            cursor: not-allowed;
        `}
`;
