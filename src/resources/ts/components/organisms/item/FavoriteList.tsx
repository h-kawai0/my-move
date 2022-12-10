import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { Oval } from "react-loader-spinner";
import { useGetFavoriteItems } from "../../../queries/ItemsQuery";
import {
    Category,
    ChildItem,
    Favorite,
    Paginate,
    ParentItem,
    User,
} from "../../../types/api/item";
import { MypageTitle } from "../../atoms/item/MypageTitle";
import { Spinner } from "../../atoms/spinner/Spinner";
import { FavoriteItem } from "../../molecules/item/FavoriteItem";
import { Empty } from "../../molecules/mypage/Empty";
import { Index } from "../mypage/Index";
import { Pagination } from "./Pagination";
import { Panel } from "./Panel";
import { Body } from "./panel/Body";
import { PanelMaster } from "./panel/PanelMaster";

// 型定義
type IParentItem = ParentItem & {
    category: Category;
    favorite: Favorite;
    child_items: ChildItem[];
    user: Omit<User, "profile">;
};

// 型定義
type FavoriteItem = Paginate & {
    data: IParentItem[];
};

// マイページお気に入り取得
export const FavoriteList: VFC = memo(() => {
    // 登録済みのお気に入りMyMove一覧
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem>({
        current_page: 1,
        data: [
            {
                category: {
                    id: 0,
                    name: "",
                },
                category_id: 0,
                child_items: [
                    {
                        id: 0,
                        name: "",
                        parent_item_id: 0,
                    },
                ],
                favorite: {
                    id: 0,
                    user_id: 0,
                    parent_item_id: 0,
                    deleted_at: "",
                    created_at: "",
                    updated_at: "",
                },
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

    // 登録済みのMyMove一覧を取得
    const { data, isLoading } = useGetFavoriteItems(currentPage);

    // お気に入り登録済みのMyMove一覧を取得
    const getFavoriteItems = useCallback(() => {
        if (data) {
            setFavoriteItems(data);
        }
    }, [data]);

    // 現在のページとクリックしたページボタンの数字が同じでない場合、親コンポーネントにリクエストしたページ番号を渡す
    const movePage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (data) {
            getFavoriteItems();
        }
    }, [data]);
    return (
        <Index>
            <MypageTitle>お気に入りのMyMove</MypageTitle>

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
            ) : favoriteItems?.data.length === 0 ||
              favoriteItems?.data[0].id === 0 ? (
                <Empty>
                    <p>チャレンジ中のMyMoveはまだありません</p>
                </Empty>
            ) : (
                <PanelMaster>
                    <Body>
                        {favoriteItems?.data.map((el) => (
                            <Panel
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
                            />
                        ))}
                    </Body>

                    <Pagination
                        prev_page_url={favoriteItems?.prev_page_url}
                        next_page_url={favoriteItems?.next_page_url}
                        current_page={favoriteItems?.current_page}
                        last_page={favoriteItems?.last_page}
                        movePage={movePage}
                    />
                </PanelMaster>
            )}
        </Index>
    );
});
