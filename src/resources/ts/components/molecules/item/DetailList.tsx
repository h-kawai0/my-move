import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
}

export const DetailList:VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <SChildList className="p-childDetail__list">{children}</SChildList>

  );
});

const SChildList = styled.ul`
    list-style: none;
`;
