import React, { memo, MouseEvent, VFC } from "react";
import styled from "styled-components";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { BaseButton } from "../../atoms/button/BaseButton";

// 型定義
type Props = {
    userId: number;
    isFavorite: boolean;
    postFavorite: (e: MouseEvent<HTMLButtonElement>) => void;
};

// お気に入り登録処理
export const FavoriteItem: VFC<Props> = memo((props) => {
    const { userId, isFavorite, postFavorite } = props;

    return (
        <>
            <SFavorite>
                {userId && isFavorite ? (
                    <SRemoveFavorite as="button" onClick={postFavorite}>
                        お気に入り解除
                    </SRemoveFavorite>
                ) : userId && !isFavorite ? (
                    <SAddFavorite as="button" onClick={postFavorite}>
                        このMyMoveが気になる!
                    </SAddFavorite>
                ) : null}
            </SFavorite>
        </>
    );
});

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
