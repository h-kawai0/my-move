import React, { memo, ReactNode, VFC } from "react";
import styled from "styled-components";
import { fonts } from "../../../../theme/setting/fonts";

type Props = {
    children: ReactNode;
};

export const Meta: VFC<Props> = memo((props) => {
    const { children } = props;

    return <SPanelMeta>{children}</SPanelMeta>;
});

const SPanelMeta = styled.div`
    font-size: ${fonts.size.m};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
