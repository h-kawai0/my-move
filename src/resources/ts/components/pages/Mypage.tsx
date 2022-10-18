import React, { memo, MouseEvent, useEffect, useState, VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../../libs/axios";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { User } from "../../types/api/user";
import { RegistList } from "../organisms/item/RegistList";

export const Mypage: VFC = memo(() => {
    const [user, setUser] = useState<User>();

    const getUser = () => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res);
                const result = res.data;
                setUser(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const withDraw = (e: MouseEvent) => {
        e.preventDefault();

        if (
            !window.confirm(
                "一度実行するとこの操作は取り消せません。本当に退会しますか?"
            )
        ) {
            console.log("false");
            return false;
        } else {
            axios
                .post("/withdraw", {
                    id: user?.id,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });

            console.log("true");
            return true;
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SMyPage className="p-mypage">
            <SMypageTitle className="p-mypage__title">マイページ</SMypageTitle>

            <SMyPageContainer className="p-mypage__container">
                <SMypageAuthor className="p-mypage__author">
                    <SMypageAvatar className="p-mypage__avatar">
                        <img
                            src={`/storage/img/user/original/${user?.pic}`}
                            alt={user?.name}
                        />
                    </SMypageAvatar>
                    <SMypageUserName className="p-mypage__username">
                        {user?.name}
                    </SMypageUserName>
                </SMypageAuthor>

                <SMypageProfile className="p-mypage__profile">
                    <p>{user?.profile}</p>
                </SMypageProfile>

                <SMypageList className="p-mypage__list">
                    <SMypageItem className="p-mypage__item">
                        <SMypageProfEdit
                            to="/mypage/edit-profile"
                            className="p-mypage__link p-mypage__profedit"
                        >
                            プロフィールを編集・登録する
                        </SMypageProfEdit>
                    </SMypageItem>
                    <SMypageItem className="p-mypage__item">
                        <SMypageMyMoveEdit
                            to="/items/new"
                            className="p-mypage__link p-mypage__stepedit"
                        >
                            MyMoveを登録する
                        </SMypageMyMoveEdit>
                    </SMypageItem>
                    <SMypageItem className="p-mypage__item">
                        <SMypagePassEdit
                            to="/mypage/edit-password"
                            className="p-mypage__link p-mypage__passedit"
                        >
                            パスワードを変更する
                        </SMypagePassEdit>
                    </SMypageItem>
                    <SMypageItem className="p-mypage__item">
                        <SMypageWithDraw as="button" onClick={withDraw}>
                            退会する
                        </SMypageWithDraw>
                    </SMypageItem>
                </SMypageList>

                <RegistList />
            </SMyPageContainer>
        </SMyPage>
    );
});

const SMyPage = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
`;

const SMypageTitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.xl};
`;

const SMyPageContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    background: ${colors.base.paletteTrueWhite};
    padding-top: ${space.xxl};
    padding-bottom: ${space.xxl};
    box-sizing: border-box;
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 100%;
  `};
`;

const SMypageAuthor = styled.div`
    width: 100%;
`;

const SMypageAvatar = styled.div`
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 100%;
    margin-bottom: ${space.xl};
    overflow: hidden;
`;

const SMypageUserName = styled.span`
    text-align: center;
    display: block;
    box-sizing: border-box;
    margin-bottom: ${space.xl};
`;

const SMypageProfile = styled.div`
    padding: ${space.xxxl};
    box-sizing: border-box;
    border-top: 2px solid ${colors.base.paletteBrightGray};
    border-bottom: 2px solid ${colors.base.paletteBrightGray};
    margin-bottom: ${space.xxl};
    word-wrap: break-word;
`;

const SMypageList = styled.ul`
    list-style: none;
    text-align: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${space.xxl};
    ${breakPoint.sm`
    width: 80%;
  `};
    ${breakPoint.md`
    width: 70%;
  `};
`;

const SMypageItem = styled.li`
    margin-bottom: ${space.xl};
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
`;

const SMypageLink = styled(Link)`
    padding: ${space.m} ${space.xxl};
    border-radius: 3px;
    display: block;
    color: ${colors.font.fontColorSub};
    font-weight: bold;
    font-size: ${fonts.size.default};
    width: 100%;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const SMypageProfEdit = styled(SMypageLink)`
    background: ${colors.base.paletteTrueBlue};
`;

const SMypageMyMoveEdit = styled(SMypageLink)`
    background: ${colors.base.paletteCyanBlue};
`;
const SMypagePassEdit = styled(SMypageLink)`
    background: ${colors.base.paletteGambogeOrange};
`;

const SMypageWithDraw = styled(SMypageLink)`
    background: ${colors.base.paletteTrueRed};
    border: none;
`;
