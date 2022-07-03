import React, { memo, VFC } from "react";

import styled from "styled-components";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { space } from "../../../theme/setting/space";

export const Footer: VFC = memo(() => {
    return (
        <SFooter>
            CopyRight &copy; {new Date().getFullYear()} My Move All Rights
            Reserved.
        </SFooter>
    );
});

const SFooter = styled.footer`
    width: 100%;
    background: #2b546a;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
    margin-top: auto;
    ${breakPoint.sm`
    font-size: ${space.s};
`}
`;
