import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
  children: ReactNode;
};

export const Empty:VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <SEmpty className="p-mypage__empty">
      {children}
</SEmpty>

  );
})

const SEmpty = styled.div`
    padding: ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteBrightGray};
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    border-radius: 3px;
    margin-bottom: ${space.l};
    ${breakPoint.sm`
    width: 80%;
  `};
    ${breakPoint.md`
  width: 70%;
  `};
`;
