import React, { memo, VFC } from "react";

import { Total } from "../../../molecules/item/panel/Total";
import { Thumbnail } from "../../../molecules/item/panel/Thumbnail";
import { Category } from "../../../molecules/item/panel/Category";
import { Title } from "../../../atoms/item/panel/Title";
import { Avatar } from "../../../atoms/item/panel/Avatar";
import { UserName } from "../../../atoms/item/panel/UserName";
import { TimeStamp } from "../../../atoms/item/panel/TimeStamp";
import { CompTime } from "../../../atoms/item/panel/CompTime";
import { Author } from "../../../molecules/item/panel/Author";
import { Meta } from "../../../molecules/item/panel/Meta";
import { Content } from "../../../molecules/item/panel/Content";
import { Top } from "./Top";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";
import { fonts } from "../../../../theme/setting/fonts";
import { colors } from "../../../../theme/setting/colors";
import { RegistContainer } from "./RegistContainer";
import { Action } from "./Action";

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
    deleteItem: (e:number) => void;
};

export const RegistPanel: VFC<Props> = memo((props) => {
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
        deleteItem
    } = props;
    return (
        <RegistContainer>
            <Action itemId={itemId}>
                <Top>
                    <Total>{itemLength}</Total>

                    <Thumbnail itemPic={itemPic} />

                    <Category categoryName={categoryName} />
                </Top>

                <Title itemName={itemName} />
            </Action>

            <Content>
                <Meta>
                    <Author>
                        <Avatar userPic={userPic} userName={userName} />

                        <div>
                            <UserName userName={userName} />

                            <TimeStamp itemDate={itemDate} />
                        </div>
                    </Author>
                </Meta>

                <CompTime itemClearTime={itemClearTime} />

                <SPanelList className="c-panel__list">
                    <SPanelItem className="c-panel__item">
                        <SPanelEdit
                            to={`edit-item/${itemId}`}
                            className="c-panel__link c-panel__link--edit"
                        >
                            編集
                        </SPanelEdit>
                    </SPanelItem>
                    <SPanelItem className="c-panel__item">
                        <SPanelDelete
                            as='span'
                            className="c-panel__link c-panel__link--delete"
                            onClick={() => deleteItem(itemId)}
                        >
                            削除
                        </SPanelDelete>
                    </SPanelItem>
                </SPanelList>
            </Content>
        </RegistContainer>
    );
});

const SPanelList = styled.ul`
    display: flex;
    list-style: none;
    justify-content: flex-end;
    padding: ${space.m};
    box-sizing: border-box;
`;

const SPanelItem = styled.li`
    margin-right: ${space.m};
    &:last-child {
        margin-right: initial;
    }
`;

const SPanelLink = styled(Link)`
    padding: ${space.m};
    box-sizing: border-box;
    font-size: ${fonts.size.m};
    font-weight: bold;
    border-radius: 3px;
    color: ${colors.font.fontColorSub};
    &:hover {
        opacity: 0.9;
    }
`;

const SPanelEdit = styled(SPanelLink)`
    background: ${colors.base.paletteTrueBlue};
`;

const SPanelDelete = styled(SPanelLink)`
    background: ${colors.base.paletteTrueRed};
    cursor: pointer;
`;
