import React, { memo, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";

type Props = {
  itemName: string;
};

export const Title: VFC<Props> = memo((props) => {

  const { itemName } = props;
  return(
    <SPanelTitle>{itemName}</SPanelTitle>

  );
})

const SPanelTitle = styled.h2`
    padding: ${space.m};
    box-sizing: border-box;
    word-wrap: break-word;
`;
