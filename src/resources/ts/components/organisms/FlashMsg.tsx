import React, { memo, VFC } from "react";
import { useFlashMessage } from "../../hooks/useFlashMessage";

import styled from "styled-components";
import { colors } from "../../theme/setting/colors";
import { space } from "../../theme/setting/space";

export const FlashMsg: VFC = memo(() => {
    const { flashMessage } = useFlashMessage();
    console.log(flashMessage);
    return <>{flashMessage && <CFlash role="alert">{flashMessage}</CFlash>}</>;
});

const CFlash = styled.div`
    background: ${colors.base.paletteTrueBlue};
    color: ${colors.font.fontColorSub};
    padding: ${space.l};
    box-sizing: border-box;
    text-align: center;
    position: fixed;
    z-index: 4;
    width: 100%;
    opacity: 0.9;
`;
