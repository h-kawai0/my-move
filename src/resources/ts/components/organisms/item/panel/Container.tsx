import React, { memo, ReactNode, VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../../theme/setting/colors";
import { space } from "../../../../theme/setting/space";
import { breakPoint } from "../../../../theme/setting/breakPoint";

type Props = {
    itemId: number;
    children: ReactNode;
};

export const Container: VFC<Props> = memo((props) => {
    const { itemId, children } = props;

    return (
        <SPanelContainer
            className="c-panel__container p-index__panel"
            to={`${itemId}`}
        >
            {children}
        </SPanelContainer>
    );
});

const SPanelContainer = styled(Link)`
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
        opacity: 0.7;
    }
    ${breakPoint.sm`
        width: 100%;
        margin-right: initial;
    `}
    ${breakPoint.md`
        width: calc(50% - ${space.xl});
    `}
`;
