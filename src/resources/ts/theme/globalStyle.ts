import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";
import { colors } from "./setting/colors";
import { fonts } from "./setting/fonts";

export const GlobalStyle = createGlobalStyle`
${reset}

// -------------------------------
// oswald
// -------------------------------
@import url('https://fonts.googleapis.com/css2?family=Oswald&family=Quicksand&display=swap');
// -------------------------------
// QuickSand
// -------------------------------
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
// -------------------------------
// さわらびゴシック
// -------------------------------
@import url('https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap');

html,body{
  line-height: 1.6;
  width: 100%;
  color: ${colors.font.fontColorDefault};
  font-family: ${fonts.family.main},
  Lato, "Noto Sans JP", "游ゴシック Medium",
        "游ゴシック体", "Yu Gothic Medium", YuGothic, "ヒラギノ角ゴ ProN",
        "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "ＭＳ Ｐゴシック",
        "MS PGothic";
  text-size-adjust: 100%;
  letter-spacing: 0.1em;
  width: 100%;
  background: ${colors.base.paletteBrightGray};
}

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
  input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"],
input[type="submit"],
textarea,
select {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family: Quicksand, Lato, "Noto Sans JP", "游ゴシック Medium",
        "游ゴシック体", "Yu Gothic Medium", YuGothic, "ヒラギノ角ゴ ProN",
        "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "ＭＳ Ｐゴシック",
        "MS PGothic", sans-serif;
}
        
`;
