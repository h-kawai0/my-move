import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { Oval } from "react-loader-spinner";
import axios from "../../../libs/axios";
import { useGetChallengeItems } from "../../../queries/ItemsQuery";
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
import { Spinner } from "../../atoms/spinner/Spinner";
import { Empty } from "../../molecules/mypage/Empty";
import { Index } from "../mypage/Index";
import { Pagination } from "./Pagination";
import { Body } from "./panel/Body";
import { ChallengePanel } from "./panel/ChallengePanel";
import { PanelMaster } from "./panel/PanelMaster";

// 型定義
type IChildItem = ChildItem & {
    clears: Clear[];
};

// 型定義
type IParentItem = ParentItem & {
    category: Category;
    child_items: IChildItem[];
    user: Omit<User, "profile">;
    challenges: Challenges[];
};

// 型定義
type ChallengeItem = Paginate & {
    data: IParentItem[];
};

// チャレンジリスト
export const ChallengeList: VFC = memo(() => {
    // チャレンジリスト管理state
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

    // 現在のページ管理
    const [currentPage, setCurrentPage] = useState(1);

    // チャレンジ中のMyMove一覧を取得
    const { data, isLoading } = useGetChallengeItems(currentPage);

    // 登録済みのMyMoveがあればstateに詰める
    const getChallengeItems = useCallback(() => {
        if (data) {
            setChallengeItems(data);
        }
    }, [data]);

    // 現在のページとクリックしたページボタンの数字が同じでない場合、親コンポーネントにリクエストしたページ番号を渡す
    const movePage = (page: number) => {
        setCurrentPage(page);
    };

    // 最初にチャレンジ中のMyMoveを取得
    useEffect(() => {
        if (data) {
            getChallengeItems();
        }
    }, [data]);

    return (
        <Index>
            <MypageTitle>チャレンジ中のMyMove</MypageTitle>

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
            ) : challengeItems?.data.length === 0 ||
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
