import React, { memo, VFC } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { BaseButton } from "../../atoms/button/BaseButton";

type Props = {
  name: string;
}

export const TwitterShare:VFC<Props> = memo((props) => {
  const {name} = props;

  const currentLocation = useLocation();

  const twitterShare = () => {
    const shareURL = `https://twitter.com/intent/tweet?text=${name}%0a&url=${window.location.href}`;

    window.open(shareURL, '_blank');
  }
  return(
    <STwitterBtn as="button" onClick={twitterShare}>ツイート</STwitterBtn>
  );
});

const STwitterBtn = styled(BaseButton)`
  background: ${colors.base.paletteTrueBlue};
`;