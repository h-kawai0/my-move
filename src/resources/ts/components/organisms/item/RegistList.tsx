import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { Oval } from "react-loader-spinner";
import axios from "../../../libs/axios";
import { useGetRegistItems } from "../../../queries/ItemsQuery";
import {
    Category,
    ChildItem,
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
import { PanelMaster } from "./panel/PanelMaster";
import { RegistPanel } from "./panel/RegistPanel";

// 型定義
type IParentItem = ParentItem & {
    category: Category;
    child_items: ChildItem[];
    user: Omit<User, "profile">;
};

// 型定義
type RegistItem = Paginate & {
    data: IParentItem[];
};

// 登録済みMyMove一覧
export const RegistList: VFC = memo(() => {
    // 登録MyMove一覧管理用
    const [RegistItems, setRegistItems] = useState<RegistItem>({
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
    const { data, isLoading } = useGetRegistItems(currentPage);

    // 登録済みのMyMoveがあればstateに詰める
    const getRegistItems = useCallback(() => {
        if (data) {
            setRegistItems(data);
        }
    }, [data]);

    // 削除ボタンをクリックした時に警告文を表示
    const deleteItem = (id: number) => {
        console.log(id);

        if (
            !window.confirm(
                "一度実行するとこの操作は取り消せません。本当に削除しますか?"
            )
        ) {
            console.log("いいえ");
            return false;
        } else {
            console.log("はい");

            axios
                .post(`/items/${id}/delete`)
                .then((res) => {
                    console.log(res);
                    getRegistItems();
                })
                .catch((err) => {
                    console.log(err);
                });
            return true;
        }
    };

    // 現在のページとクリックしたページボタンの数字が同じでない場合、親コンポーネントにリクエストしたページ番号を渡す
    const movePage = (page: number) => {
        setCurrentPage(page);
    };

    // 最初にMyMoveを取得
    useEffect(() => {
        if (data) {
            getRegistItems();
        }
    }, [data]);
    return (
        <Index>
            <MypageTitle>登録したMyMove</MypageTitle>

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
            ) : RegistItems?.data.length === 0 ||
              RegistItems?.data[0].id === 0 ? (
                <Empty>
                    <p>登録したMyMoveはまだありません。</p>
                </Empty>
            ) : (
                <PanelMaster>
                    <Body>
                        {RegistItems?.data.map((el, i) => (
                            <RegistPanel
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
                                deleteItem={deleteItem}
                            />
                        ))}
                    </Body>

                    <Pagination
                        prev_page_url={RegistItems.prev_page_url}
                        next_page_url={RegistItems.next_page_url}
                        current_page={RegistItems.current_page}
                        last_page={RegistItems.last_page}
                        movePage={movePage}
                    />
                </PanelMaster>
            )}
        </Index>
    );
});
