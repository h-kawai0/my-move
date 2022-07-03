import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";
import { colors } from "./setting/colors";
import { fonts } from "./setting/fonts";

export const GlobalStyle = createGlobalStyle`
${reset}
html,body{
  line-height: 1.6;
  width: 100%;
  color: ${colors.font.fontColorDefault};
  font-family: ${fonts.family.main},
  Lato, "Noto Sans JP", "游ゴシック Medium",
        "游ゴシック体", "Yu Gothic Medium", YuGothic, "ヒラギノ角ゴ ProN",
        "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "ＭＳ Ｐゴシック",
        "MS PGothic", sans-serif;
  text-size-adjust: 100%;
  letter-spacing: 0.1em;
  width: 100%;
  background: ${colors.base.paletteBrightGray};

  p,a{
    -webkit-font-smoothing: antialiased;
  }
  a{
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s;
    color: ${colors.font.fontColorDefault};
  }
  a:hover{
    transition: 0.3s;
  }
  img{
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    object-fit: cover;
    font-family: 'object-fit: cover';
    word-wrap: break-word;
  }        
}
`;
