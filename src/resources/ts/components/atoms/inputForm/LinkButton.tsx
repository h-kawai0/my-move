import React, { VFC, memo, ReactNode } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
    path: string;
};

export const LinkButton: VFC<Props> = memo((props) => {
    const { children, path } = props;
    return <SAuthLink to={path}>{children}</SAuthLink>;
});

const SAuthLink = styled(Link)`
    display: block;
    margin-bottom: ${space.m};
    margin-top: ${space.m};
    text-decoration: underline;
    ${breakPoint.sm`
    font-size: ${fonts.size.m};
  `}
    &:hover {
        text-decoration: none;
    }
`;
