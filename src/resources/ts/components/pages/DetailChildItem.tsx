import React, { memo, useEffect, useState, VFC } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../libs/axios";

import {
    Challenges,
    ChildItem,
    Clear,
    ParentItem,
    User,
} from "../../types/api/item";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { BaseButton } from "../atoms/button/BaseButton";
import { TwitterShare } from "../molecules/twitter/TwitterShare";
import { DetailMenu } from "../molecules/item/DetailMenu";
import { DetailTitle } from "../atoms/item/DetailTitle";
import { DetailList } from "../molecules/item/DetailList";
import { ChildItemList } from "../organisms/parentDetail/ChildItemList";
import { DetailItems } from "../molecules/item/DetailItems";
import { Author } from "../organisms/item/Author";
import { Spinner } from "../atoms/spinner/Spinner";
import { Oval } from "react-loader-spinner";

type ItemData = {
    childCurrentNum: number;
    childItem: ChildItem & {
        clears: Clear[];
    };
    parentItem: ParentItem & {
        challenges: Challenges[];
        user: User;
        child_items: {
            id: number;
            name: string;
            detail: string;
            parent_item_id: number;
            clears: Clear[];
        }[];
    };
    pass: string;
    user: number;
    challengeItem: {
        id: number;
    };
};

// 子MyMove詳細画面
export const DetailChildItem: VFC = memo(() => {
    // GETパラメータを取得
    const params: { id?: string; pass?: string } = useParams();

    // GETパラメータを変数に詰める
    const { id, pass } = params;

    // state
    const [itemData, setItemData] = useState<ItemData>();

    const [isChallenge, setIsChallenge] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    // 子MyMove取得
    const getItem = () => {
        setIsLoading(true);
        axios
            .get<ItemData>(`/items/${id}/${pass}/get`)
            .then((res) => {
                console.log(res);

                const result = res.data;

                const challengeFlg = result.challengeItem?.id ? true : false;

                setItemData(result);

                // チャレンジ中か判定
                challengeFlg ? setIsChallenge(true) : setIsChallenge(false);

                const clearFlg =
                    result.childItem.clears.length === 1 ? true : false;

                // クリア済みか判定
                clearFlg ? setIsSuccess(true) : setIsSuccess(false);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    // ボタンを押すとクリアの状態にする
    const toggleClear = (e: number) => {
        console.log(e);

        axios
            .post("/items/clear", {
                userId: itemData?.user,
                parentItemId: itemData?.parentItem.id,
                childItemId: e,
            })
            .then((res) => {
                console.log(res);

                getItem();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // ボタンを押すとチャレンジ中にする
    const toggleChallenge = () => {
        axios
            .post("/items/challenge", {
                userId: itemData?.user,
                parentItemId: itemData?.parentItem.id,
            })
            .then((res) => {
                console.log(res);
                setIsChallenge(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 最初に子MyMoveを取得
    useEffect(() => {
        getItem();
    }, [id, pass]);

    return (
        <>
            {isLoading ? (
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
                <SChildDetail className="p-childDetail">
                    <SChildContainer className="p-childDetail__container">
                        <SChildHead className="p-childDetail__head">
                            <DetailTitle>
                                MyMove{itemData?.childCurrentNum}
                            </DetailTitle>
                            <DetailTitle>
                                「{itemData?.childItem.name}」
                            </DetailTitle>
                        </SChildHead>

                        <SChildBody className="p-childDetail__body">
                            <SChildComment className="p-childDetail__comment">
                                <p>{itemData?.childItem.detail}</p>
                            </SChildComment>

                            <SChildMeta className="p-childDetail__meta">
                                <SChildCompTime className="p-childDetail__compTime">
                                    目安達成時間:{itemData?.childItem.cleartime}
                                    時間
                                </SChildCompTime>

                                <TwitterShare
                                    name={`${itemData?.childItem.name} %7C ${process.env.MIX_APP_ENV}`}
                                />
                            </SChildMeta>

                            <DetailItems
                                isChallenge={isChallenge}
                                isSuccess={isSuccess}
                                user={itemData?.user}
                                toggleChallenge={toggleChallenge}
                                toggleClear={toggleClear}
                                childId={itemData?.childItem.id}
                                childItems={itemData?.parentItem.child_items}
                                getPass={pass}
                            />
                        </SChildBody>

                        <DetailMenu>
                            <DetailTitle>このMyMoveのメニュー</DetailTitle>

                            <DetailList>
                                {itemData?.parentItem.child_items.map(
                                    (item, index) => (
                                        <ChildItemList
                                            key={item.id}
                                            name={item.name}
                                            index={index}
                                            user={itemData.user}
                                            isChallenge={isChallenge}
                                            childId={item.id}
                                            parentId={itemData.parentItem.id}
                                            childItems={
                                                itemData.parentItem.child_items
                                            }
                                            clearItem={item.clears}
                                            toggleClear={toggleClear}
                                        />
                                    )
                                )}
                            </DetailList>
                        </DetailMenu>
                    </SChildContainer>

                    {itemData && (
                        <Author
                            pic={itemData.parentItem.user.pic}
                            name={itemData.parentItem.user.name}
                            profile={itemData.parentItem.user.profile}
                        />
                    )}
                </SChildDetail>
            )}
        </>
    );
});

const SChildDetail = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
`;

const SChildContainer = styled.div`
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${space.xxxl};
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

const SChildHead = styled.div`
    border-bottom: 2px solid ${colors.base.paletteBrightGray};
    margin-bottom: ${space.xxl};
`;

const SChildBody = styled.div`
    padding-left: ${space.xxxl};
    padding-right: ${space.xxxl};
    box-sizing: border-box;
    margin-bottom: ${space.xxl};
    ${breakPoint.sm`
    padding-left: ${space.m};
    padding-right: ${space.m};
  `};
    ${breakPoint.md`
    padding-left: ${space.m};
    padding-right: ${space.m};
  `};
`;

const SChildComment = styled.div`
    box-sizing: border-box;
    padding: ${space.l};
    margin-bottom: ${space.xl};
    background: ${colors.base.paletteBrightGray};
    word-wrap: break-word;
    min-height: 200px;
`;

const SChildMeta = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${space.xxl};
`;

const SChildCompTime = styled.div`
    font-size: ${fonts.size.m};
`;

const SChildBtn = styled(BaseButton)`
    display: block;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: ${space.l} ${space.xl};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
    width: 100%;
  `};
`;

const SChildComplete = styled(SChildBtn)`
    background: ${colors.base.paletteDarkGray};
    color: ${colors.font.fontColorDefault};
    font-weight: initial;
    &:hover {
        cursor: initial;
        opacity: 1;
    }
`;

const SChildClear = styled(SChildBtn)`
    background: ${colors.base.paletteDarkBlue};
`;

const SChildChallenge = styled(SChildBtn)`
    background: ${colors.base.paletteTrueBlue};
`;

const SChildRegister = styled(SChildBtn)`
    background: ${colors.base.paletteCyanBlue};
`;
