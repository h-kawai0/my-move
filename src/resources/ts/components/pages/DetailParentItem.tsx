import React, { VFC, memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
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

export const DetailParentItem: VFC = memo(() => {
    const params: { id: string } = useParams();

    const { id } = params;

    const [isLoading, setIsLoading] = useState(false);

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

    const [isChallenge, setIsChallenge] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [isFavorite, setIsFavorite] = useState(false);

    const getItem = useCallback(() => {
        setIsLoading(true);
        axios
            .get<ItemData>(`/items/${id}/get`)
            .then((res) => {
                console.log(res.data);

                const result = res.data;

                const challengeFlg = res.data.challengeItem?.id ? true : false;

                console.log(result, itemData);

                setItemData(result);

                challengeFlg ? setIsChallenge(true) : setIsChallenge(false);

                let sum: number[] = [];

                // 取得したMyMoveの配列を展開する
                res.data.parentItem.child_items.map((child, i) => {
                    res.data.parentItem.child_items[i].clears.map((clear) => {
                        sum.push(
                            res.data.parentItem.child_items[i].clears.length
                        );
                    });
                });

                console.log(sum.length, res.data.parentItem.child_items.length);

                sum.length === res.data.parentItem.child_items.length
                    ? setIsSuccess(true)
                    : setIsSuccess(false);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [isSuccess]);

    useEffect(() => {
        getItem();
    }, []);

    const toggleChallenge = () => {
        axios
            .post("/items/challenge", {
                userId: itemData.user,
                parentItemId: itemData.parentItem.id,
            })
            .then((res) => {
                console.log(res);
                setIsChallenge(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggleClear = (e: number) => {
        console.log(e);

        axios
            .post("/items/clear", {
                userId: itemData.user,
                parentItemId: itemData.parentItem.id,
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

    const postFavorite = () => {
        console.log("おきにいり");

        axios
            .post("/items/favorite", {
                userId: itemData.user,
                parentItemId: itemData.parentItem.id,
            })
            .then((res) => {
                console.log(res);

                setIsFavorite((prev) => !prev);
            })
            .catch((err) => {
                console.log(err);
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
                <SParentDetail className="p-parentDetail">
                    <SParentDetailContainer className="p-parentDetail__container">
                        <SParentDetailWrapper className="p-parentDetail__info--wrapper">
                            <SParentDetailInfo className="p-parentDetail__info">
                                <SParentDetailImg className="p-parentDetail__img">
                                    <img
                                        src={
                                            itemData.parentItem.pic
                                                ? `/storage/img/items/original/${itemData.parentItem.pic}`
                                                : `/images/item/item_no_image.png`
                                        }
                                        alt={itemData.parentItem.name}
                                    />
                                </SParentDetailImg>

                                <SParentDetailTitle className="p-parentDetail__title">
                                    {itemData.parentItem.name}
                                </SParentDetailTitle>
                                <SParentDetailMeta className="p-parentDetail__meta">
                                    <SParentDetailCategory className="p-parentDetail__category">
                                        {itemData.parentItem.category.name}
                                    </SParentDetailCategory>
                                    <TwitterShare
                                        name={`${itemData.parentItem.name}%7C${process.env.MIX_APP_ENV}`}
                                    />
                                </SParentDetailMeta>

                                <SParentDetailFooterContainer className="p-parentDetail__footerContainer">
                                    <SParentDetailAuthor className="p-parentDetail__author">
                                        <SParentDetailAvatar className="p-parentDetail__avatar">
                                            <img
                                                src={`/storage/img/user/original/${itemData.parentItem.user.pic}`}
                                            />
                                        </SParentDetailAvatar>

                                        <div>
                                            <SParentDetailUsername className="p-parentDetail__username">
                                                {itemData.parentItem.user.name}
                                            </SParentDetailUsername>
                                            <SParentDetailDate className="p-parentDetail__date">
                                                {dayjs(
                                                    itemData.parentItem
                                                        .created_at
                                                ).format("YYYY[年]M[月]D[日]")}
                                            </SParentDetailDate>
                                        </div>
                                    </SParentDetailAuthor>

                                    <div>
                                        <SParentDetailCompTime className="p-parentDetail__compTime">
                                            目安達成時間:{" "}
                                            {itemData.parentItem.cleartime}時間
                                        </SParentDetailCompTime>
                                    </div>
                                </SParentDetailFooterContainer>

                                <FavoriteItem
                                    userId={itemData.user}
                                    postFavorite={postFavorite}
                                    isFavorite={isFavorite}
                                />
                            </SParentDetailInfo>
                        </SParentDetailWrapper>

                        <SParentDetailDetail className="p-parentDetail__detail">
                            <SParentDetailComment className="p-parentDetail__comment">
                                <p>{itemData.parentItem.detail}</p>
                            </SParentDetailComment>
                        </SParentDetailDetail>

                        <SParentDetailMenu className="p-parentDetail__menu">
                            <SParentDetailTitle className="p-parentDetail__title">
                                このMyMoveのメニュー
                            </SParentDetailTitle>

                            <SParentDetailList className="p-parentDetail__list">
                                {itemData.parentItem.child_items.map(
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
                                        />
                                    )
                                )}
                            </SParentDetailList>

                            <ChallengeItem
                                toggleChallenge={toggleChallenge}
                                isChallenge={isChallenge}
                                isSuccess={isSuccess}
                                user={itemData.user}
                            />
                        </SParentDetailMenu>
                    </SParentDetailContainer>

                    <Author
                        pic={itemData.parentItem.user.pic}
                        name={itemData.parentItem.user.name}
                        profile={itemData.parentItem.user.profile}
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
