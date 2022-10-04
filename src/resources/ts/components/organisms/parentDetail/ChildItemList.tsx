import React, { memo, MouseEvent, useCallback, useMemo, VFC } from 'react';
import styled from 'styled-components';

import { colors } from '../../../theme/setting/colors';
import { fonts } from '../../../theme/setting/fonts';
import { space } from '../../../theme/setting/space';
import { breakPoint } from "../../../theme/setting/breakPoint";
import { BaseButton } from '../../atoms/button/BaseButton';
import { Link } from 'react-router-dom';
import { Clear } from '../../../types/api/item';

type Props = {
  name: string;
  index: number;
  user: number;
  isChallenge: boolean;
  childId: number;
  parentId: number;
  toggleClear: (e:number) => void;
  childItems:{
    id: number;
    name:string;
    detail: string;
    parent_item_id: number;
    clears:Clear[]; 
    
  }[];
  clearItem:Clear[];
}

export const ChildItemList:VFC<Props> = memo((props) => {

  const { name, index, user, isChallenge, childItems, toggleClear, childId, clearItem, parentId } = props;
  

  // MyMoveを順番にクリアさせるため、クリアボタンの表示を制御する
  const currentClear = useMemo(() => {

    // 最初の配列はクリアボタンを表示する
    if(index === 0){
      return true;

      // 配列が最初よりも後の場合のクリアボタン制御
    }else if( index > 0){

      // 前のMyMoveをクリアしているならクリアボタンを表示
      if(childItems[index - 1].clears.length !== 0){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },[clearItem]);

  // DBから取得した　clearレコードが存在するか確認
  const isClear = useMemo(() => {
    return clearItem.length !== 0 ? true : false;
  },[clearItem]);


  return(
    <SParentDetailItem className="p-parentDetail__item">
    <SParentDetailLink to={`/items/${parentId}/${childId}`} className="p-parentDetail__link">
      <p>MyMove{index + 1}「{name}」</p>
    </SParentDetailLink>

    {(isChallenge && user && 

    <SParentDetailStatus className="p-parentDetail__status">

      {(isChallenge && user && currentClear && isClear) ? 
      
      <SParentDetailComplete as="span" className="c-btn c-btn--comped c-btn--notAllowed p-parentDetail__clear">クリア済み</SParentDetailComplete>
      : (isChallenge && user && currentClear ?
        
        <SParentDetailClear as="button" className="c-btn c-btn--clear p-parentDetail__clear" onClick={() => toggleClear(childId)}>クリア</SParentDetailClear>
        : ( isChallenge && user && !currentClear) ? 
        
        <SParentDetailComplete as="span" className="c-btn c-btn--comped c-btn--notAllowed p-parentDetail__clear">ロック中</SParentDetailComplete>
        : null ) 
      }

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
  &:hover{
    opacity: .8;
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
  &:hover{
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

const SParentDetailClear = styled(BaseButton)`
  background: ${colors.base.paletteDarkBlue};
  padding: ${space.m} ${space.xl};
  display: block;
  font-size: ${fonts.size.m};
  ${breakPoint.sm`
    width: 100%;
  `};
`;
