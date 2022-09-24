import React, { memo, VFC } from "react";
import styled from "styled-components";
import * as dayjs from "dayjs";

import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { Link } from "react-router-dom";

type Props = {
    itemId: number;
    itemLength: number;
    itemPic: string;
    categoryName: string;
    itemName: string;
    userPic: string;
    userName: string;
    itemDate: string;
    itemClearTime: string;
};

export const Panel: VFC<Props> = memo((props) => {
    const {
        itemId,
        itemLength,
        itemPic,
        categoryName,
        itemName,
        userPic,
        userName,
        itemDate,
        itemClearTime,
    } = props;
    return (
        <SPanelContainer className="c-panel__container p-index__panel" to={`/items/${itemId}`}>
            <SPanelTop className="c-panel__top">
                <SPanelTotal className="c-panel__total">
                    <SPanelNumber className="c-panel__number">
                        {itemLength}
                    </SPanelNumber>
                    <SPanelMove className="c-panel__move">Move</SPanelMove>
                </SPanelTotal>

                <SPanelThumbnail className="c-panel__thumbnail">
                    <SPanelImg
                        className="c-panel__img"
                        src={`/storage/img/items/original/${itemPic}`}
                    />
                </SPanelThumbnail>

                <SPanelCategory className="c-panel__category">
                    {categoryName}
                </SPanelCategory>
                <SPanelTitle className="c-panel__title">{itemName}</SPanelTitle>

                <SPanelContent className="c-panel__content">
                    <SPanelMeta className="c-panel__meta">
                        <SPanelAuthor className="c-panel__author">
                            <SPanelAvatar className="c-panel__avatar">
                                <img
                                    src={`/storage/img/user/original/${userPic}`}
                                />
                            </SPanelAvatar>

                            <div>
                                <SPanelUserName className="c-panel__username">
                                    {userName}
                                </SPanelUserName>
                                <SPanelTimeStamp className="c-panel__timeStamp">
                                    {dayjs(itemDate).format(
                                        "YYYY[年]M[月]D[日]"
                                    )}
                                </SPanelTimeStamp>
                            </div>
                        </SPanelAuthor>
                    </SPanelMeta>
                </SPanelContent>
                <SPanelCompTime className="c-panel__compTime">
                    目安達成時間:{itemClearTime}時間
                </SPanelCompTime>
            </SPanelTop>
        </SPanelContainer>
    );
});

const SPanelContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    background: ${colors.base.paletteTrueWhite};
    width: calc(33.33% - ${space.xl});
    min-height: 300px;
    margin-right: ${space.xl};
    margin-bottom: ${space.xxl};
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    &:hover {
        opacity: 0.7;
    }
    ${breakPoint.sm`
        width: 100%;
        margin-right: initial;
    `}
    ${breakPoint.md`
        width: calc(50% - ${space.xl});
    `}
    width: calc(50% - ${space.xl});
`;

const SPanelTop = styled.div`
    position: relative;
`;

const SPanelTotal = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background: ${colors.base.paletteTrueBlue};
    width: 55px;
    height: 55px;
    box-sizing: border-box;
    border-radius: 100%;
    color: ${colors.font.fontColorSub};
    font-weight: 700;
    text-align: center;
    z-index: 1;
`;

const SPanelNumber = styled.div`
    font-size: ${fonts.size.default};
`;

const SPanelMove = styled.div`
    font-size: ${fonts.size.s};
`;

const SPanelThumbnail = styled.div`
    width: 100%;
    padding-top: 75%;
    position: relative;
`;

const SPanelImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
`;

const SPanelCategory = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${colors.base.paletteCinnabar};
    padding: ${space.m} ${space.l};
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.s};
    font-weight: 600;
    text-transform: uppercase;
`;

const SPanelTitle = styled.h2`
    padding: ${space.m};
    box-sizing: border-box;
    word-wrap: break-word;
`;

const SPanelContent = styled.div`
    padding: ${space.m};
    box-sizing: border-box;
    margin-top: auto;
    margin-bottom: ${space.xl};
`;

const SPanelMeta = styled.div`
    font-size: ${fonts.size.m};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SPanelAuthor = styled.div`
    align-items: center;
    display: flex;
`;

const SPanelAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: ${space.m};
`;

const SPanelUserName = styled.div`
    font-size: ${fonts.size.s};
    ${breakPoint.sm`
        font-size: ${fonts.size.xs};
    `}
    ${breakPoint.md`
        font-size: ${fonts.size.xs};
    `}
`;

const SPanelTimeStamp = styled.div`
    font-size: ${fonts.size.s};
`;

const SPanelCompTime = styled.span`
    font-size: ${fonts.size.s};
    display: block;
    text-align: right;
    margin-bottom: ${space.s};
    padding-left: ${space.m};
    padding-right: ${space.m};
`;
