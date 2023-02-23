import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
}

export const DetailList:VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <SChildList>{children}</SChildList>

  );
});

const SChildList = styled.ul`
    list-style: none;
`;
