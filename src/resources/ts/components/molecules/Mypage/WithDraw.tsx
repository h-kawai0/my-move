import React, { memo, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

export const WithDraw:VFC = memo(() => {
  return(
    <SWithDraw>
      退会する
    </SWithDraw>
  );
});

const SWithDraw = styled.button`
    padding: ${space.m} ${space.xxl};
  border-radius: 3px;
  background: ${colors.base.paletteTrueRed};
  display: block;
  color: ${colors.font.fontColorSub};
  font-weight: bold;
  font-size: ${fonts.size.default};
  width: 100%;
  box-sizing: border-box;
  border: none;
  &:hover{
    cursor: pointer;
    opacity: .9;
  }

`;