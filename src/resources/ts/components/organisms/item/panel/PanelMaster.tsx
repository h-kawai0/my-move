import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const PanelMaster: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SPanel className="c-panel">{children}</SPanel>;
});

const SPanel = styled.div`
    padding-left: ${space.xl};
    padding-right: ${space.xl};
    box-sizing: border-box;
`;
