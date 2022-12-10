import React, { memo, useEffect, useState, VFC } from "react";
import axios from "../../../libs/axios";
import {
    Category,
    ChildItem,
    Favorite,
    Paginate,
    ParentItem,
    User,
} from "../../../types/api/item";
import { MypageTitle } from "../../atoms/item/MypageTitle";
import { FavoriteItem } from "../../molecules/item/FavoriteItem";
import { Empty } from "../../molecules/mypage/Empty";
import { Index } from "../mypage/Index";
import { Pagination } from "./Pagination";
import { Panel } from "./Panel";
import { Body } from "./panel/Body";
import { PanelMaster } from "./panel/PanelMaster";

type IParentItem = ParentItem & {
    category: Category;
    favorite: Favorite;
    child_items: ChildItem[];
    user: Omit<User, "profile">;
};

type FavoriteItem = Paginate & {
    data: IParentItem[];
};

export const FavoriteList: VFC = memo(() => {
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

    const getFavoriteItems = (page: number = 1) => {
        axios
            .get("/mypage/favorites", {
                params: {
                    page,
                },
            })
            .then((res) => {
                console.log("favoriteItems", res);
                setFavoriteItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const movePage = (page: number) => {
        getFavoriteItems(page);
    };

    useEffect(() => {
        getFavoriteItems();
    }, []);
    return (
        <Index>
            <MypageTitle>お気に入りのMyMove</MypageTitle>

            {favoriteItems?.data.length === 0 ||
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
