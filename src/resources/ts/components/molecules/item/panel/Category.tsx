import React, { memo, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../../theme/setting/colors";
import { fonts } from "../../../../theme/setting/fonts";
import { space } from "../../../../theme/setting/space";

type Props = {
  categoryName: string;
};

export const Category: VFC<Props> = memo((props) => {

  const { categoryName } = props;
  return(
    <SPanelCategory>
    {categoryName}
</SPanelCategory>

  );
});

const SPanelCategory = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${colors.base.paletteCinnabar};
    padding: ${space.m} ${space.l};
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.s};
    font-weight: 600;
    text-transform: uppercase;
`;
