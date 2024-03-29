import React, { memo, ReactNode, VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../../theme/setting/colors";
import { space } from "../../../../theme/setting/space";
import { breakPoint } from "../../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
};

export const RegistContainer: VFC<Props> = memo((props) => {
    const { children } = props;

    return (
        <SPanelContainer            
        >
            {children}
        </SPanelContainer>
    );
});

const SPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: ${colors.base.paletteTrueWhite};
    width: calc(33.33% - ${space.xl});
    min-height: 300px;
    margin-right: ${space.xl};
    margin-bottom: ${space.xxl};
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    &:hover {
        opacity: 1;
    }
    ${breakPoint.sm`
        width: 100%;
        margin-right: initial;
    `}
    ${breakPoint.md`
        width: calc(50% - ${space.xl});
    `}
`;
