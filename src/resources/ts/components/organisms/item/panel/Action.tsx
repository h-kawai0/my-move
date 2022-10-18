import React, { memo, ReactNode, VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  itemId: number;
  children: ReactNode;
}

export const Action: VFC<Props> = memo((props) => {
    const { itemId, children } = props;
    return (
        <SAction to={`/items/${itemId}`} className="p-mypage__action">
            {children}
        </SAction>
    );
});

const SAction = styled(Link)`
    &:hover {
        opacity: 0.7;
        text-decoration: underline;
    }
`;
