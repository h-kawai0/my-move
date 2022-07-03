import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { space } from "../../../theme/setting/space";

export const BaseButton = styled.button`
    color: ${colors.font.fontColorSub};
    text-align: center;
    padding: ${space.m};
    box-sizing: border-box;
    border-radius: 3px;
    font-weight: bold;
    border: none;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

export const SignUpButton = styled(BaseButton)`
    background: ${colors.base.paletteCyanBlue};
`;
