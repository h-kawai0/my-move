import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
  children: ReactNode;
}

export const DetailTitle:VFC<Props> = memo((props) => {

  const { children } = props;
  return(
    <SDetailTitle className="p-childDetail__title">{children}</SDetailTitle>

  );
});

const SDetailTitle = styled.h2`
  text-align: center;
  font-size: ${fonts.size.xl};
  margin-bottom: ${space.xl};
  padding-left: ${space.l};
  padding-right: ${space.l};
  box-sizing: border-box;
  word-wrap: break-word;
  ${breakPoint.sm`
    font-size: ${fonts.size.l};
  `};
`;
