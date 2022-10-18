import React, { memo, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../../theme/setting/space";

type Props = {
    userPic: string;
};

export const Avatar: VFC<Props> = memo((props) => {
    const { userPic } = props;
    return (
        <SPanelAvatar className="c-panel__avatar">
            <img src={`/storage/img/user/original/${userPic}`} />
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
