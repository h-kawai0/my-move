import React, {
    VFC,
    memo,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import axios from "../../libs/axios";
import * as dayjs from "dayjs";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { ChildItemList } from "../organisms/parentDetail/ChildItemList";
import { ChallengeItem } from "../organisms/parentDetail/ChallengeItem";
import { TwitterShare } from "../molecules/twitter/TwitterShare";
import { FavoriteItem } from "../molecules/item/FavoriteItem";
import { Author } from "../organisms/item/Author";
import { Category, Clear, ParentItem, User } from "../../types/api/item";
import { Spinner } from "../atoms/spinner/Spinner";
import { Oval } from "react-loader-spinner";
import {
    useAddFavorite,
    useClearChallenge,
    useDetailParentItem,
    useDoChallenge,
} from "../../queries/ItemsQuery";

// 型指定
type ItemData = {
    parentItem: ParentItem & {
        category: Category;
        child_items: {
            id: number;
            name: string;
            detail: string;
            parent_item_id: number;
            clears: Clear[];
        }[];
        user: User;
    };
    user: number;
    challengeItem: {
        id: number;
    };
};

// 親MyMove詳細画面
export const DetailParentItem: VFC = memo(() => {
    // GETパラメータから親MyMoveIdを取得
    const params: { id?: string } = useParams();

    const { id } = params;

    // 親MyMoveを取得
    const { data, isLoading, isError, refetch } = useDetailParentItem(id);

    // チャレンジ処理
    const doChallenge = useDoChallenge();

    // チャレンジクリア処理
    const clearChallenge = useClearChallenge();

    // お気に入り登録処理
    const addFavorite = useAddFavorite();

    // 画面遷移用
    const navigate = useNavigate();

    // MyMoveデータ管理用state
    const [itemData, setItemData] = useState<ItemData>({
        parentItem: {
            category: {
                id: 0,
                name: "",
            },
            category_id: 0,
            child_items: [
                {
                    detail: "",
                    id: 0,
                    name: "",
                    parent_item_id: 0,
                    clears: [
                        {
                            child_item_id: 0,
                            created_at: "",
                            deleted_at: null,
                            id: 0,
                            parent_item_id: 0,
                            updated_at: "",
                            user_id: 0,
                        },
                    ],
                },
            ],
            cleartime: "",
            created_at: "",
            detail: "",
            id: 0,
            name: "",
            pic: "",
            user: {
                id: 0,
                name: "",
                pic: "",
                profile: "",
            },
            user_id: 0,
        },
        user: 0,
        challengeItem: {
            id: 0,
        },
    });

    // チャレンジ中管理state
    const [isChallenge, setIsChallenge] = useState(false);

    // チャレンジ完了state
    const [isSuccess, setIsSuccess] = useState(false);

    // お気に入りstate
    const [isFavorite, setIsFavorite] = useState(false);

    // MyMoveデータ取得
    const getParentItem = useCallback(() => {
        // MyMoveが取得できた場合
        if (data) {
            // stateにMyMoveデータを詰める
            setItemData(data);

            // チャレンジ中か判定
            data.challengeItem?.id
                ? setIsChallenge(true)
                : setIsChallenge(false);
            let sum: number[] = [];

            // 取得したMyMoveの配列を展開する
            data.parentItem.child_items.map((child: any, i: string) => {
                data.parentItem.child_items[i].clears.map(() => {
                    sum.push(data.parentItem.child_items[i].clears.length);
                });
            });

            // 取得したクリア数と子MyMoveの数が一致した場合は全てクリアにする
            sum.length === data.parentItem.child_items.length
                ? setIsSuccess(true)
                : setIsSuccess(false);

            // お気に入り登録があるか判定
            data.isFavorite?.id ? setIsFavorite(true) : setIsFavorite(false);
        }
    }, [data, isSuccess]);

    // 最初に実行
    useEffect(() => {
        // 親MyMoveが取得できない場合
        if (isError) {
            // MyMove一覧へ遷移
            navigate("/index", { replace: true });
        }

        getParentItem();
    }, [isError, navigate, data]);

    // チャレンジボタン押下処理
    const toggleChallenge = async () => {
        // チャレンジ処理
        await axios.get("/sanctum/csrf-cookie").then(() => {
            doChallenge.mutate(
                {
                    userId: itemData.user,
                    parentItemId: itemData.parentItem.id,
                },
                {
                    onSuccess: () => {
                        setIsChallenge(true);
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                }
            );
        });
    };

    // クリアボタン処理
    const toggleClear = async (e: number) => {
        console.log(e);

        await axios.get("/sanctum/csrf-cookie").then(() => {
            clearChallenge.mutate(
                {
                    userId: itemData.user,
                    parentItemId: itemData.parentItem.id,
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

    const processing = useRef(false);

    // お気に入り処理
    const postFavorite = async () => {
        if (processing.current) return;

        processing.current = true;

        console.log("おきにいり");
        await axios.get("/sanctum/csrf-cookie").then(() => {
            addFavorite.mutate(
                {
                    userId: itemData.user,
                    parentItemId: itemData.parentItem.id,
                },
                {
                    onSuccess: () => {
                        setIsFavorite((prev) => !prev);
                        processing.current = false;
                    },
                }
            );
        });
    };

    // MyMoveを全て達成しているか判定
    const totalChallenge = () => {
        let sum: number[] = [];

        // 取得したMyMoveの配列を展開する
        itemData.parentItem.child_items.map((child, i) => {
            itemData.parentItem.child_items[i].clears.map((clear) => {
                sum.push(itemData.parentItem.child_items[i].clears.length);
            });
        });

        return sum.length === itemData.parentItem.child_items.length
            ? setIsSuccess(true)
            : setIsSuccess(false);
    };

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
                <SParentDetail>
                    <SParentDetailContainer>
                        <SParentDetailWrapper>
                            <SParentDetailInfo>
                                <SParentDetailImg>
                                    <img
                                        src={
                                            itemData?.parentItem.pic
                                                ? `/storage/img/items/resize/${itemData?.parentItem.pic}`
                                                : `/images/item/item_no_image.png`
                                        }
                                        srcSet={
                                            itemData?.parentItem.pic
                                                ? `/storage/img/items/resize/${itemData?.parentItem.pic} 1x,/storage/img/items/original/${itemData?.parentItem.pic} 2x`
                                                : `/images/item/item_no_image.png 1x,/images/item/item_no_image@2x.png 2x`
                                        }
                                        alt={itemData?.parentItem.name}
                                    />
                                </SParentDetailImg>

                                <SParentDetailTitle>
                                    {itemData?.parentItem.name}
                                </SParentDetailTitle>
                                <SParentDetailMeta>
                                    <SParentDetailCategory>
                                        {itemData?.parentItem.category.name}
                                    </SParentDetailCategory>
                                    <TwitterShare
                                        name={`${itemData?.parentItem.name}%7C${process.env.MIX_APP_ENV}`}
                                    />
                                </SParentDetailMeta>

                                <SParentDetailFooterContainer>
                                    <SParentDetailAuthor>
                                        <SParentDetailAvatar>
                                            <img
                                                src={
                                                    itemData?.parentItem.user
                                                        .pic
                                                        ? `/storage/img/user/resize/${itemData?.parentItem.user.pic}`
                                                        : `/images/user/user_no_image.png`
                                                }
                                                srcSet={
                                                    itemData?.parentItem.user
                                                        .pic
                                                        ? `/storage/img/user/resize/${itemData?.parentItem.user.pic} 1x, /storage/img/user/original/${itemData?.parentItem.user.pic} 2x`
                                                        : `/images/user/user_no_image.png 1x, /images/user/user_no_image@2x.png 2x`
                                                }
                                                alt={
                                                    itemData.parentItem.user
                                                        .name
                                                }
                                            />
                                        </SParentDetailAvatar>

                                        <div>
                                            <SParentDetailUsername>
                                                {itemData?.parentItem.user.name}
                                            </SParentDetailUsername>
                                            <SParentDetailDate>
                                                {dayjs(
                                                    itemData?.parentItem
                                                        .created_at
                                                ).format("YYYY[年]M[月]D[日]")}
                                            </SParentDetailDate>
                                        </div>
                                    </SParentDetailAuthor>

                                    <div>
                                        <SParentDetailCompTime>
                                            目安達成時間:{" "}
                                            {itemData?.parentItem.cleartime}時間
                                        </SParentDetailCompTime>
                                    </div>
                                </SParentDetailFooterContainer>

                                <FavoriteItem
                                    userId={itemData?.user}
                                    postFavorite={postFavorite}
                                    isFavorite={isFavorite}
                                />
                            </SParentDetailInfo>
                        </SParentDetailWrapper>

                        <SParentDetailDetail>
                            <SParentDetailComment>
                                <p>{itemData?.parentItem.detail}</p>
                            </SParentDetailComment>
                        </SParentDetailDetail>

                        <SParentDetailMenu>
                            <SParentDetailTitle>
                                このMyMoveのメニュー
                            </SParentDetailTitle>

                            <SParentDetailList>
                                {itemData?.parentItem.child_items.map(
                                    (item, index) => (
                                        <ChildItemList
                                            key={item.id}
                                            name={item.name}
                                            index={index}
                                            user={itemData.user}
                                            childId={item.id}
                                            childItems={
                                                itemData.parentItem.child_items
                                            }
                                            isChallenge={isChallenge}
                                            toggleClear={toggleClear}
                                            clearItem={item.clears}
                                            parentId={itemData.parentItem.id}
                                            isLoading={clearChallenge.isLoading}
                                        />
                                    )
                                )}
                            </SParentDetailList>

                            <ChallengeItem
                                toggleChallenge={toggleChallenge}
                                isChallenge={isChallenge}
                                isSuccess={isSuccess}
                                user={itemData?.user}
                                isLoading={doChallenge.isLoading}
                            />
                        </SParentDetailMenu>
                    </SParentDetailContainer>

                    <Author
                        pic={itemData?.parentItem.user.pic}
                        name={itemData?.parentItem.user.name}
                        profile={itemData?.parentItem.user.profile}
                    />
                </SParentDetail>
            )}
        </>
    );
});

const SParentDetail = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
`;

const SParentDetailContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    background: ${colors.base.paletteTrueWhite};
    padding-top: ${space.xxl};
    padding-bottom: ${space.xxl};
    box-sizing: border-box;
    margin-bottom: ${space.xxxl};
    ${breakPoint.sm`
    width: 100%;
  `};
    ${breakPoint.md`
    width: 100%;
  `}
`;

const SParentDetailWrapper = styled.div`
    border-bottom: 2px solid ${colors.base.paletteBrightGray};
    margin-bottom: ${space.xl};
`;

const SParentDetailInfo = styled.div`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding: ${space.m};
    box-sizing: border-box;
    ${breakPoint.sm`
    width: 100%;
  `}
`;

const SParentDetailImg = styled.div`
    margin-bottom: ${space.xl};
    margin-right: auto;
    width: 100%;
    ${breakPoint.sm`
    width: 100%;
  `};
`;

const SParentDetailTitle = styled.h2`
    text-align: center;
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.xl};
    word-wrap: break-word;
    ${breakPoint.sm`
    fonts-size: ${fonts.size.l};
  `}
`;

const SParentDetailMeta = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${space.xl};
    align-items: center;
`;

const SParentDetailCategory = styled.div`
    background: ${colors.base.paletteCinnabar};
    padding: ${space.m} ${space.l};
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.s};
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 3px;
`;

const SParentDetailFooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${space.xl};
    ${breakPoint.sm`
    align-items: flex-start;
    flex-direction: column;
  `}
`;

const SParentDetailAuthor = styled.div`
    display: flex;
    align-items: center;
    ${breakPoint.sm`
    margin-bottom: ${space.xl};
  `}
`;

const SParentDetailAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: ${space.m};
`;

const SParentDetailUsername = styled.div`
    font-size: ${fonts.size.s};
`;

const SParentDetailDate = styled.div`
    font-size: ${fonts.size.s};
`;

const SParentDetailCompTime = styled.span`
    font-size: ${fonts.size.m};
`;

const SParentDetailDetail = styled.div`
    padding-left: ${space.xxxl};
    padding-right: ${space.xxxl};
    box-sizing: border-box;
    border-bottom: 2px solid ${colors.base.paletteBrightGray};
    margin-bottom: ${space.xl};
    ${breakPoint.sm`
    padding-right: ${space.l};
    padding-left: ${space.l};
  `};
`;

const SParentDetailComment = styled.div`
    margin-bottom: ${space.xl};
    word-wrap: break-word;
    ${breakPoint.sm`
    padding: ${space.m};
  `};
`;

const SParentDetailMenu = styled.div`
    padding-left: ${space.xxxl};
    padding-right: ${space.xxxl};
    box-sizing: border-box;
    ${breakPoint.sm`
    padding-left: ${space.m};
    padding-right: ${space.m};
  `};
`;

const SParentDetailList = styled.ul`
    list-style-type: none;
    margin-bottom: ${space.xxl};
`;
