import React, { memo, useEffect, useState, VFC } from "react";
import axios from "../../../libs/axios";
import {
    Category,
    Challenges,
    ChildItem,
    Clear,
    Paginate,
    ParentItem,
    User,
} from "../../../types/api/item";
import { MypageTitle } from "../../atoms/item/MypageTitle";
import { Empty } from "../../molecules/mypage/Empty";
import { Index } from "../mypage/Index";
import { Pagination } from "./Pagination";
import { Body } from "./panel/Body";
import { ChallengePanel } from "./panel/ChallengePanel";
import { PanelMaster } from "./panel/PanelMaster";

type IChildItem = ChildItem & {
    clears: Clear[];
};

type IParentItem = ParentItem & {
    category: Category;
    child_items: IChildItem[];
    user: Omit<User, "profile">;
    challenges: Challenges[];
};

type ChallengeItem = Paginate & {
    data: IParentItem[];
};

export const ChallengeList: VFC = memo(() => {
    const [challengeItems, setChallengeItems] = useState<ChallengeItem>({
        current_page: 1,
        data: [
            {
                category: {
                    id: 0,
                    name: "",
                },
                challenges: [
                    {
                        id: 0,
                        parent_item_id: 0,
                        user_id: 0,
                        updated_at: "",
                        deleted_at: "",
                        created_at: "",
                    },
                ],
                category_id: 0,
                child_items: [
                    {
                        id: 0,
                        name: "",
                        detail: "",
                        cleartime: "",
                        parent_item_id: 0,
                        deleted_at: "",
                        created_at: "",
                        updated_at: "",
                        clears: [
                            {
                                id: 0,
                                user_id: 0,
                                parent_item_id: 0,
                                child_item_id: 0,
                                deleted_at: "",
                                created_at: "",
                                updated_at: "",
                            },
                        ],
                    },
                ],
                cleartime: "",
                created_at: "",
                id: 0,
                name: "",
                pic: "",
                user_id: 0,
                user: {
                    id: 0,
                    name: "",
                    pic: "",
                },
            },
        ],
        first_page_url: "",
        from: 0,
        last_page: 0,
        last_page_url: "",
        links: [
            {
                active: false,
                labe: "",
                url: "",
            },
        ],
        next_page_url: "",
        path: "",
        per_page: 0,
        prev_page_url: 0,
        to: 0,
        total: 0,
    });

    // チャレンジ中のMyMoveを取得
    const getChallengeItems = (page: number = 1) => {
        axios
            .get("/mypage/challenges", {
                params: {
                    page: page,
                },
            })
            .then((res) => {
                console.log("ChallengeList_UseEffect", res);

                setChallengeItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const movePage = (page: number) => {
        getChallengeItems(page);
    };

    useEffect(() => {
        getChallengeItems();
    }, []);

    return (
        <Index>
            <MypageTitle>チャレンジ中のMyMove</MypageTitle>

            {challengeItems?.data.length === 0 ||
            challengeItems?.data[0].id === 0 ? (
                <Empty>
                    <p>チャレンジ中のMyMoveはまだありません。</p>
                </Empty>
            ) : (
                <PanelMaster>
                    <Body>
                        {challengeItems?.data.map((el, i) => (
                            <ChallengePanel
                                key={el.id}
                                itemId={el.id}
                                itemLength={el.child_items.length}
                                itemPic={el.pic}
                                categoryName={el.category.name}
                                itemName={el.name}
                                userPic={el.user.pic}
                                userName={el.user.name}
                                itemDate={el.created_at}
                                itemClearTime={el.cleartime}
                                childItems={el.child_items}
                            />
                        ))}
                    </Body>

                    <Pagination
                        prev_page_url={challengeItems?.prev_page_url}
                        next_page_url={challengeItems?.next_page_url}
                        current_page={challengeItems?.current_page}
                        last_page={challengeItems?.last_page}
                        movePage={movePage}
                    />
                </PanelMaster>
            )}
        </Index>
    );
});
