import React, { memo, useEffect, VFC } from "react";
import styled from "styled-components";

import { colors } from "../../../theme/setting/colors";
import { space } from "../../../theme/setting/space";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { fonts } from "../../../theme/setting/fonts";

type Props = {
    id?: number;
    title: string;
    description: string;
    imagePath: string;
};

export const TopCard: VFC<Props> = memo((props) => {

    useEffect(() => {
        
    })

    const { title, description, imagePath } = props;
    return (
        <SMeritCard>
            <div>
                <SMeritImgframe>
                    <SMeritImg src={imagePath} alt={title} />
                </SMeritImgframe>

                <SMeritTextBox>
                    <SMeritCardTitle>{title}</SMeritCardTitle>
                    <SMeritCardOverView>{description}</SMeritCardOverView>
                </SMeritTextBox>
            </div>
        </SMeritCard>
    );
});

const SMeritCard = styled.div`
    width: calc(33.3% - ${space.l});
    margin-right: ${space.l};
    margin-bottom: ${space.xxl};
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background: ${colors.base.paletteTrueWhite};
    &:last-child {
        ${breakPoint.sm`
        margin-bottom: initial;
        `}
    }
    ${breakPoint.sm`
        width: 100%;
    `}
    ${breakPoint.md`
    width: 100%;
    `}
`;

const SMeritImgframe = styled.div`
    width: 100%;
    padding-top: 65%;
    position: relative;
    box-sizing: border-box;
`;

const SMeritImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
`;

const SMeritTextBox = styled.div`
    width: 100%;
    padding: ${space.xl} ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
`;

const SMeritCardTitle = styled.h3`
    font-size: ${fonts.size.l};
    margin-bottom: ${space.l};
    font-weight: bold;
    line-height: 125%;
`;

const SMeritCardOverView = styled.p`
    font-size: ${fonts.size.s};
    line-height: 150%;
`;
