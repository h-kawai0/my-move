import React, { memo, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";

type Props = {
    userPic: string;
    userName: string;
};

export const Avatar: VFC<Props> = memo((props) => {
    const { userPic, userName } = props;
    return (
        <SPanelAvatar>
            <img src={
                            userPic
                            ? `/storage/img/user/resize/${userPic}`
                            : `/images/user/user_no_image.png`
            }
            srcSet={
                userPic
                ? `/storage/img/user/resize/${userPic} 1x,/storage/img/user/original/${userPic} 2x`
                : `/images/user/user_no_image.png 1x, /images/user/user_no_image@2x.png 2x`

            }
            alt={userName}
            />
        </SPanelAvatar>
    );
});

const SPanelAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: ${space.m};
`;
