import React, { memo, VFC } from "react";
import styled from "styled-components";

type Props = {
  itemPic: string;
};

export const Thumbnail:VFC<Props> = memo((props) => {

  const { itemPic } = props;
  return(
    <SPanelThumbnail className="c-panel__thumbnail">
    <SPanelImg
        className="c-panel__img"
        src={`/storage/img/items/original/${itemPic}`}
    />
</SPanelThumbnail>


  );
})

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
