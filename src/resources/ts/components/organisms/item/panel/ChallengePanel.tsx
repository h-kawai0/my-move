import React, { memo, useMemo, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../../theme/setting/colors";
import { fonts } from "../../../../theme/setting/fonts";
import { space } from "../../../../theme/setting/space";
import { ChildItem, Clear } from "../../../../types/api/item";
import { Avatar } from "../../../atoms/item/panel/Avatar";
import { CompTime } from "../../../atoms/item/panel/CompTime";
import { TimeStamp } from "../../../atoms/item/panel/TimeStamp";
import { Title } from "../../../atoms/item/panel/Title";
import { UserName } from "../../../atoms/item/panel/UserName";
import { Author } from "../../../molecules/item/panel/Author";
import { Category } from "../../../molecules/item/panel/Category";
import { Content } from "../../../molecules/item/panel/Content";
import { Meta } from "../../../molecules/item/panel/Meta";
import { Thumbnail } from "../../../molecules/item/panel/Thumbnail";
import { Total } from "../../../molecules/item/panel/Total";
import { Container } from "./Container";
import { Top } from "./Top";

type IChildItems = ChildItem & {
    clears: Clear[];
};

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
    childItems: IChildItems[];
};

export const ChallengePanel: VFC<Props> = memo((props) => {
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
        childItems,
    } = props;

    // チャレンジしているMyMoveのクリア状況を取得
    const totalChallenge = useMemo(() => {
        let sum = [];

        // 子MyMoveの配列を展開
        childItems.map((el, i) => {
            childItems[i].clears.map((clear) => {
                sum.push(clear);
            });
        });

        return sum.length;
    }, []);

    return (
        <Container itemId={itemId}>
            <Top>
                <Total>{itemLength}</Total>

                <SStatus className="c-panel__status">
                    <SCompInfo className="c-panel__compInfo">
                        進捗状況
                        <br />
                        { totalChallenge}/{childItems.length}
                    </SCompInfo>
                </SStatus>

                <Thumbnail itemPic={itemPic} />
                <Category categoryName={categoryName} />

                <Title itemName={itemName} />

                <Content>
                    <Meta>
                        <Author>
                            <Avatar userPic={userPic} />

                            <div>
                                <UserName userName={userName} />

                                <TimeStamp itemDate={itemDate} />
                            </div>
                        </Author>
                    </Meta>

                    <CompTime itemClearTime={itemClearTime} />
                </Content>
            </Top>
        </Container>
    );
});

const SStatus = styled.div`
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    padding: ${space.m};
    box-sizing: border-box;
    background: ${colors.base.paletteGambogeOrange};
    color: ${colors.font.fontColorSub};
    font-weight: bold;
`;

const SCompInfo = styled.p`
    font-size: ${fonts.size.m};
    text-align: center;
`;
