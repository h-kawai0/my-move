import React, { memo, MouseEvent, useState, VFC } from "react";
import styled from "styled-components";

import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { BaseButton } from "../../atoms/button/BaseButton";
import { Clear } from "../../../types/api/item";

type Props = {
    toggleChallenge: (e: MouseEvent<HTMLButtonElement>) => void;
    toggleClear: (e: number) => void;
    isSuccess: boolean;
    isChallenge: boolean;
    user: number | undefined;
    childId: number | undefined;
    childItems: {
      id: number;
      name: string;
      detail: string;
      parent_item_id: number;
      clears: Clear[];
    }[] | undefined;
    getPass?: string;
};

export const DetailItems: VFC<Props> = memo((props) => {
    const { toggleChallenge, isChallenge, isSuccess, user, toggleClear, childId, childItems, getPass } =
        props;

    const clearId = childId ? childId : 0;

    // 前のMyMoveをクリアしていなければボタンをロック中にする
    const current =  childItems?.map((el, i) => {

        // GETパラメータの子MyMoveのIDを数値に変換
        const childItemNum = getPass ? parseInt(getPass) : '';

        
        // 数値に変換した子MyMoveの値と展開中の子MyMoveの値が一致するか確認
        if(childItemNum === childItems[i].id){

          console.log(childItemNum, childItems[i].id);

          // 最初の子MyMoveの場合ならクリアボタンを表示
          if(i === 0){
          console.log(i);
            return true;

            // 前のMyMoveをクリアしていなければクリアボタンを非表示にする
          } else if(childItems[i - 1].clears.length !== 0) {
            console.log()
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })

    return (
        <>
            {user && isChallenge && isSuccess && current ? (
                <SChildComplete
                    as="span"
                    className="c-btn c-btn--comped c-btn--notAllowed p-childDetail__btn"
                >
                    クリア済み
                </SChildComplete>
            ) : user && isChallenge && !isSuccess && current ? (
                <SChildClear
                    as="button"
                    className="c-btn c-btn--clear p-childDetail__btn"
                    onClick={() => toggleClear(clearId)}
                >
                    クリア
                </SChildClear>
            ) : user && isChallenge && !isSuccess && !current ? (
                <SChildComplete
                    as="span"
                    className="c-btn c-btn--comped c-btn--notAllowed p-childDetail__btn"
                >
                    ロック中
                </SChildComplete>
            ) : user && !isChallenge ? (
                <SChildChallenge
                    as="button"
                    className="c-btn c-btn--challenge p-childDetail__btn"
                    onClick={toggleChallenge}
                >
                    チャレンジ
                </SChildChallenge>
            ) : (
                <SChildRegister
                    to="/login"
                    className="c-btn c-btn--signup p-childDetail__btn"
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

const SChildClear = styled(SChildBtn)`
    background: ${colors.base.paletteDarkBlue};
`;

const SChildChallenge = styled(SChildBtn)`
    background: ${colors.base.paletteTrueBlue};
`;

const SChildRegister = styled(SChildBtn)`
    background: ${colors.base.paletteCyanBlue};
`;
