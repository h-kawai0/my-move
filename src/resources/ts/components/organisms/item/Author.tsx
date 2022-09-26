import React, { memo, VFC } from "react";
import styled from "styled-components";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

type Props = {
  pic: string;
  name: string;
  profile: string;
}


export const Author:VFC<Props> = memo((props) => {

  const { pic, name, profile } = props;
  return(
    <SAuthor>
    <STitle>このMyMoveの投稿者</STitle>

    <div>
      <SOwner>
        <img src={pic ?  `/storage/img/user/reseize/${pic}` : `/img/user/user_no_image.png`  } alt={name} srcSet={pic ? `/storage/img/user/resize/${pic} 1x,/storage/img/user/original/${pic} 2x` : `/images/user/user_no_image.png 1x /images/user/user_no_image@2X.png` } />
      </SOwner>

      <SContributor>{name}</SContributor>

      <SProfile>
        <SText>
          <p>{profile}</p>
        </SText>
      </SProfile>
    </div>
  </SAuthor>
  );
});

const SAuthor = styled.div`
  width: 60%;
  margin: 0 auto;
  background: ${colors.base.paletteTrueWhite};
  padding-top: ${space.xxl};
  padding-bottom: ${space.xxl};
  box-sizing: border-box;
  ${breakPoint.sm`
  width: 100%;
  `};
  ${breakPoint.md`
    width: 100%;
  `};
`;

const STitle = styled.h2`
text-align: center;
font-size: ${fonts.size.xl};
margin-bottom: ${space.xl};
word-wrap: break-word;
${breakPoint.sm`
  font-size: ${fonts.size.l};
`};
`;

const SOwner = styled.div`
  width: 200px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100%;
  margin-bottom: ${space.xl};
  overflow: hidden;
`;

const SContributor = styled.h2`
  text-align: center;
  display: block;
  box-sizing: border-box;
  margin-bottom: ${space.l};
  font-size: ${fonts.size.default};
  ${breakPoint.sm`
    font-size: ${fonts.size.m};
  `};
`;

const SProfile = styled.div`
  padding-left: ${space.xxl};
  padding-right: ${space.xxl};
  box-sizing: border-box;
  word-wrap: break-word;
`;

const SText = styled.div`
  background: ${colors.base.paletteBrightGray};
  box-sizing: border-box;
  padding: ${space.l};
  min-height: 100px;
  border-radius: 3px;
`;