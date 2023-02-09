import React, { memo, VFC } from "react";

import { Total } from "../../molecules/item/panel/Total";
import { Thumbnail } from "../../molecules/item/panel/Thumbnail";
import { Category } from "../../molecules/item/panel/Category";
import { Title } from "../../atoms/item/panel/Title";
import { Avatar } from "../../atoms/item/panel/Avatar";
import { UserName } from "../../atoms/item/panel/UserName";
import { TimeStamp } from "../../atoms/item/panel/TimeStamp";
import { CompTime } from "../../atoms/item/panel/CompTime";
import { Author } from "../../molecules/item/panel/Author";
import { Meta } from "../../molecules/item/panel/Meta";
import { Content } from "../../molecules/item/panel/Content";
import { Top } from "./panel/Top";
import { Container } from "./panel/Container";

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
        <Container
            itemId={itemId}
        >
            <Top>
                <Total>{itemLength}</Total>

                <Thumbnail itemPic={itemPic} />

                <Category categoryName={categoryName} />

                <Title itemName={itemName} />

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
                </Content>

            </Top>
        </Container>
    );
});
