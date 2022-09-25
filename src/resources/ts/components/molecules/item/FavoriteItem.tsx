import React, { memo, MouseEvent, VFC } from "react";
import styled from "styled-components";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { BaseButton } from "../../atoms/button/BaseButton";

type Props = {
  userId: number;
  isFavorite: boolean;
  postFavorite: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const FavoriteItem:VFC<Props> = memo((props) => {

  const { userId, isFavorite, postFavorite} = props;

  return(
    <>
    <SFavorite className="p-parentDetail__favorite">

    {(userId && isFavorite ? 
      <SRemoveFavorite as="button" className="c-btn c-btn--comped p-parentDetail_submit" onClick={postFavorite} >お気に入り解除</SRemoveFavorite>
      
      :
      (userId && !isFavorite ?
        <SAddFavorite as="button" className="c-btn c-btn--favorite p-parentDetail__submit" onClick={postFavorite} >このMyMoveが気になる!</SAddFavorite>
        
        : null )
       )}


    </SFavorite>
    </>
  );
})

const SFavorite = styled.div`
  float: right;
  margin-bottom: ${space.xl};
  ${breakPoint.sm`
    float: initial;
  `};
`;

const SRemoveFavorite = styled(BaseButton)`
  background: ${colors.base.paletteDarkGray};
  color: ${colors.font.fontColorDefault};
  font-weight: initial;
  ${breakPoint.sm`
    width: 100%;
    font-size: ${fonts.size.default};
  `};
`;

const SAddFavorite = styled(BaseButton)`
  background: ${colors.base.paletteGambogeOrange};
  ${breakPoint.sm`
    width: 100%;
    font-size: ${fonts.size.default};
  `};
`;