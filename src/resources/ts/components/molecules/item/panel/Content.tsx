import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";

type Props = {
    children: ReactNode;
};

export const Content: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <SPanelContent className="c-panel__content">{children}</SPanelContent>
    );
});

const SPanelContent = styled.div`
    padding: ${space.m};
    box-sizing: border-box;
    margin-top: auto;
    margin-bottom: ${space.xl};
`;
