import React, { memo, VFC, ReactNode } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
};

export const CatchContainer: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <section>
            <SCatch>{children}</SCatch>
        </section>
    );
});

const SCatch = styled.div`
    width: 100%;
    padding: ${space.m} ${space.xxl};
    box-sizing: border-box;
    margin-top: ${space.xxl};
    margin-bottom: ${space.xxl};
    text-align: center;
    ${breakPoint.sm`
        padding: ${space.m};
    `}
    ${breakPoint.md`
        padding: ${space.m};
    `}
`;
