import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
  children: ReactNode;
}

export const MypageTitle:VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <STitle className="p-mypage__title">{children}</STitle>

  );
})

const STitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.xl};
`;
