import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { colors } from "../../../../theme/setting/colors";
import { fonts } from "../../../../theme/setting/fonts";

type Props = {
  children: ReactNode;
};

export const Total:VFC<Props> = memo((props) => {
   const { children } = props;
  return(
    <SPanelTotal className="c-panel__total">
    <SPanelNumber className="c-panel__number">
        {children}
    </SPanelNumber>
    <SPanelMove className="c-panel__move">Move</SPanelMove>
</SPanelTotal>

  );
})

const SPanelTotal = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background: ${colors.base.paletteTrueBlue};
    width: 55px;
    height: 55px;
    box-sizing: border-box;
    border-radius: 100%;
    color: ${colors.font.fontColorSub};
    font-weight: 700;
    text-align: center;
    z-index: 1;
`;

const SPanelNumber = styled.div`
    font-size: ${fonts.size.default};
`;

const SPanelMove = styled.div`
    font-size: ${fonts.size.s};
`;
