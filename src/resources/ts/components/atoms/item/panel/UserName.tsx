import React, { memo, VFC } from "react";
import styled from "styled-components";

import { fonts } from "../../../../theme/setting/fonts";
import { breakPoint } from "../../../../theme/setting/breakPoint";

type Props = {
    userName: string;
};

export const UserName: VFC<Props> = memo((props) => {
    const { userName } = props;

    return (
        <SPanelUserName>
            {userName}
        </SPanelUserName>
    );
});

const SPanelUserName = styled.div`
    font-size: ${fonts.size.s};
    ${breakPoint.sm`
        font-size: ${fonts.size.xs};
    `}
    ${breakPoint.md`
        font-size: ${fonts.size.xs};
    `}
`;
