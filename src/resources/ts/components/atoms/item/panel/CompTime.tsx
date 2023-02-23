import React, { memo, VFC } from "react";
import styled from "styled-components";
import { fonts } from "../../../../theme/setting/fonts";
import { space } from "../../../../theme/setting/space";

type Props = {
  itemClearTime: string;
}

export const CompTime: VFC<Props> = memo((props) => {

  const {itemClearTime } = props;
  
  return(
    <SPanelCompTime>
    目安達成時間:{itemClearTime}時間
</SPanelCompTime>

  );
})

const SPanelCompTime = styled.span`
    font-size: ${fonts.size.s};
    display: block;
    text-align: right;
    margin-bottom: ${space.s};
    padding-left: ${space.m};
    padding-right: ${space.m};
`;
