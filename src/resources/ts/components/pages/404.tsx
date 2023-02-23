import React, { memo, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../theme/setting/colors";
import { space } from "../../theme/setting/space";

export const Page404:VFC = memo(() => {
  return(
    <SPage404>ページが存在しません。</SPage404>
  );
});

const SPage404 = styled.div`
    margin-top: ${space.xxxl};
    padding: ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
    width: 100%;
    border-radius: 3px;
    text-align: center;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;

`;