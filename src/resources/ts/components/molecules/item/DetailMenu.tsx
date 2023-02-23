import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

import { space } from "../../../theme/setting/space";
import { breakPoint  } from "../../../theme/setting/breakPoint";


type Props = {
  children: ReactNode;
}

export const DetailMenu:VFC<Props> = memo((props) => {
  const {children} = props;
  return(
    <SDetailMenu>{children}</SDetailMenu>
  );
})

const SDetailMenu = styled.div`
  padding-left: ${space.xxxl};
  padding-right: ${space.xxxl};
  box-sizing: border-box;
  ${breakPoint.sm`
    padding-left: ${space.m};
    padding-right: ${space.m};
  `};
  ${breakPoint.md`
    padding-left: ${space.m};
    padding-right: ${space.m};
  `};
`;
