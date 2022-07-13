import React, { VFC, memo, ReactNode } from "react";
import styled from "styled-components";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";

type Props = {
    children: ReactNode;
};

export const Link: VFC<Props> = memo((props) => {
    const { children } = props;
    return <SAuthLink href="">{children}</SAuthLink>;
});

const SAuthLink = styled.a`
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
