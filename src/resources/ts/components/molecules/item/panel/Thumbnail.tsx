import React, { memo, VFC } from "react";
import styled from "styled-components";

type Props = {
    itemPic: string;
};

export const Thumbnail: VFC<Props> = memo((props) => {
    const { itemPic } = props;
    return (
        <SPanelThumbnail>
            <SPanelImg
                src={
                    itemPic
                        ? `/storage/img/items/original/${itemPic}`
                        : `/images/item/item_no_image.png`
                }
            />
        </SPanelThumbnail>
    );
});

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
