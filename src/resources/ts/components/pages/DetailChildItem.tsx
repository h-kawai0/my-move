import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
    VFC,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
    useChildDetailItem,
    useClearChallenge,
    useDoChallenge,
} from "../../queries/ItemsQuery";

// 型定義
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

    // 画面遷移用
    const navigate = useNavigate();

    // ボタン受付制御
    const processing = useRef(false);

    // 子MyMoveを取得
    const { data, isLoading, isError, refetch } = useChildDetailItem({
        id,
        pass,
    });

    // チャレンジリクエスト送信
    const doChallenge = useDoChallenge();

    // チャレンジクリアリクエスト送信
    const clearChallenge = useClearChallenge();

    // 子MyMoveのstate
    const [itemData, setItemData] = useState<ItemData>();

    // チャレンジフラグ管理
    const [isChallenge, setIsChallenge] = useState(false);

    // クリア済みフラグ管理
    const [isSuccess, setIsSuccess] = useState(false);

    // 現在の子MyMove番号
    const [childCurrentNum, setChildCurrentNum] = useState(0);

    // ボタンを押すとクリアの状態にする
    const toggleClear = async (e: number) => {
        // 送信中はボタンを非活性にする
        if (processing.current) return;

        processing.current = true;

        await axios.get("/sanctum/csrf-cookie").then(() => {
            clearChallenge.mutate(
                {
                    userId: itemData?.user,
                    parentItemId: itemData?.parentItem.id,
                    childItemId: e,
                },
                {
                    onSuccess: () => {
                        refetch();
                    },
                }
            );
        });
    };

    // ボタンを押すとチャレンジ中にする
    const toggleChallenge = async () => {
        // 送信処理中はボタンを押せないようにする
        if (processing.current) return;

        processing.current = true;

        await axios.get("/sanctum/csrf-cookie").then(() => {
            doChallenge.mutate(
                {
                    userId: itemData?.user,
                    parentItemId: itemData?.parentItem.id,
                },
                {
                    onSuccess: () => {
                        setIsChallenge(true);
                        processing.current = false;
                    },
                    onError: (err) => {
                        console.log(err);
                        processing.current = false;
                    },
                }
            );
        });
    };

    // 子MyMove取得
    const getChildItem = useCallback(() => {
        if (data) {
            // チャレンジ中か判定
            data.challengeItem?.id
                ? setIsChallenge(true)
                : setIsChallenge(false);

            // クリア済み判定
            data.childItem?.clears?.length === 1
                ? setIsSuccess(true)
                : setIsSuccess(false);

            // 現在の子MyMoveを入れる
            setChildCurrentNum(data?.childCurrentNum);

            setItemData(data);
        }
    }, [data]);

    // 最初に子MyMoveを取得
    useEffect(() => {
        // 子MyMoveが取得できない場合
        if (isError) {
            // MyMove一覧へ遷移する
            navigate("/index", { replace: true });
        }

        getChildItem();
    }, [data, navigate, isError]);

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
                <SChildDetail>
                    <SChildContainer>
                        <SChildHead>
                            <DetailTitle>
                                MyMove{itemData?.childCurrentNum}
                            </DetailTitle>
                            <DetailTitle>
                                「{itemData?.childItem?.name}」
                            </DetailTitle>
                        </SChildHead>

                        <SChildBody>
                            <SChildComment>
                                <p>{itemData?.childItem?.detail}</p>
                            </SChildComment>

                            <SChildMeta>
                                <SChildCompTime>
                                    目安達成時間:
                                    {itemData?.childItem?.cleartime}
                                    時間
                                </SChildCompTime>

                                <TwitterShare
                                    name={`${itemData?.childItem?.name} %7C ${process.env.MIX_APP_ENV}`}
                                />
                            </SChildMeta>

                            <DetailItems
                                isChallenge={isChallenge}
                                isSuccess={isSuccess}
                                user={itemData?.user}
                                toggleChallenge={toggleChallenge}
                                toggleClear={toggleClear}
                                childId={itemData?.childItem?.id}
                                childItems={itemData?.parentItem?.child_items}
                                getPass={pass}
                                isChallengeRequest={doChallenge.isLoading}
                                isClearRequest={clearChallenge.isLoading}
                                childCurrentNum={childCurrentNum}
                            />
                        </SChildBody>

                        <DetailMenu>
                            <DetailTitle>このMyMoveのメニュー</DetailTitle>

                            <DetailList>
                                {itemData?.parentItem?.child_items?.map(
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
                                            isLoading={clearChallenge.isLoading}
                                        />
                                    )
                                )}
                            </DetailList>
                        </DetailMenu>
                    </SChildContainer>

                    {itemData && (
                        <Author
                            pic={itemData.parentItem?.user.pic}
                            name={itemData.parentItem?.user.name}
                            profile={itemData.parentItem?.user.profile}
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
