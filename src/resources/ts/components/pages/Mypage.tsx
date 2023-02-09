import React, { memo, MouseEvent, useMemo, useState, VFC } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "../../libs/axios";
import { useUser } from "../../queries/AuthQuery";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { Spinner } from "../atoms/spinner/Spinner";
import { ChallengeList } from "../organisms/item/ChallengeList";
import { FavoriteList } from "../organisms/item/FavoriteList";
import { RegistList } from "../organisms/item/RegistList";

// マイページ画面
export const Mypage: VFC = memo(() => {
    // ユーザー情報管理用state
    const [user, setUser] = useState({
        id: 0,
        name: "",
        profile: "",
        pic: "",
    });

    // ユーザー情報取得処理
    const { data: useUserData, isLoading: useUserLoading } = useUser();

    const navigate = useNavigate();

    // ログイン情報を取得
    const getUser = useMemo(() => {
        if (useUserData) {
            setUser(useUserData);
        }
    }, [useUserData]);

    // 退会処理
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
                    console.log(res.data);
                    navigate("/");
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("退会に失敗しました。", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                });

            console.log("true");
            return true;
        }
    };

    return (
        <>
            {useUserLoading ? (
                <Spinner>
                    <Oval
                        height={80}
                        width={80}
                        color="#555"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#555"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </Spinner>
            ) : (
                <SMyPage>
                    <SMypageTitle>マイページ</SMypageTitle>

                    <SMyPageContainer>
                        <SMypageAuthor>
                            <SMypageAvatar>
                                <img
                                    src={
                                        user?.pic
                                            ? `/storage/img/user/resize/${user?.pic}`
                                            : `/images/user/user_no_image.png`
                                    }
                                    alt={user?.name}
                                    srcSet={
                                        user?.pic
                                            ? `/storage/img/user/resize/${user?.pic} 1x,/storage/img/user/original/${user?.pic} 2x`
                                            : `/images/user/user_no_image.png 1x, /images/user/user_no_image@2x.png 2x`
                                    }
                                />
                            </SMypageAvatar>
                            <SMypageUserName>{user?.name}</SMypageUserName>
                        </SMypageAuthor>

                        <SMypageProfile>
                            <p>{user?.profile}</p>
                        </SMypageProfile>

                        <SMypageList>
                            <SMypageItem>
                                <SMypageProfEdit
                                    to="/mypage/edit-profile"
                                    className="p-mypage__link p-mypage__profedit"
                                >
                                    プロフィールを編集・登録する
                                </SMypageProfEdit>
                            </SMypageItem>
                            <SMypageItem>
                                <SMypageMyMoveEdit to="/mypage/new-item">
                                    MyMoveを登録する
                                </SMypageMyMoveEdit>
                            </SMypageItem>
                            <SMypageItem>
                                <SMypagePassEdit to="/mypage/edit-password">
                                    パスワードを変更する
                                </SMypagePassEdit>
                            </SMypageItem>
                            <SMypageItem>
                                <SMypageWithDraw as="button" onClick={withDraw}>
                                    退会する
                                </SMypageWithDraw>
                            </SMypageItem>
                        </SMypageList>

                        <RegistList />

                        <ChallengeList />

                        <FavoriteList />
                    </SMyPageContainer>
                </SMyPage>
            )}
        </>
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
