import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";
import { breakPoint } from "../../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
};

export const Body: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SBody className="c-panel__body">{children}</SBody>;
});

const SBody = styled.div`
    margin-right: ${space.xl};
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    ${breakPoint.sm`
    margin-right: initial;
  `};
`;
