import React, { memo, useEffect, useState, VFC } from "react";
import styled from "styled-components";
import axios from "../../../libs/axios";
import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import {
    Category,
    ChildItem,
    Paginate,
    ParentItem,
    User,
} from "../../../types/api/item";
import { Pagination } from "./Pagination";
import { RegistPanel } from "./panel/RegistPanel";

type IParentItem = ParentItem & {
    category: Category;
    child_items: ChildItem[];
    user: Omit<User, 'profile'>;
};

type RegistItem = Paginate & {
    data: IParentItem[];
};

export const RegistList: VFC = memo(() => {
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

    const getRegistItems = (page: number = 1) => {
        axios
            .get("/mypage/regists", {
                params: {
                    page: page
                }
            })
            .then((res) => {
                console.log(res);

                setRegistItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 削除ボタンをクリックした時に警告文を表示
    const deleteItem = (id: number) => {
        console.log(id);

        if(!window.confirm('一度実行するとこの操作は取り消せません。本当に削除しますか?')) {

            console.log('いいえ');
            return false;
        } else {

            console.log('はい');

            axios.post(`/items/${id}/delete`).then((res) => {
                console.log(res);
                getRegistItems();
            }).catch((err) => {
                console.log(err);
            });
            return true;
        }

    };

    const movePage = (page: number) => {
        getRegistItems(page);
    };

    useEffect(() => {
        getRegistItems();
    }, []);
    return (
        <SIndex className="p-mypage__indexMymove">
            <STitle className="p-mypage__title">登録したMyMove</STitle>

            {RegistItems?.data.length === 0 || RegistItems?.data[0].id === 0 ? (
                <SEmpty className="p-mypage__empty">
                    <p>登録したMyMoveはまだありません。</p>
                </SEmpty>
            ) : (
                <SPanel className="c-panel">
                    <SBody className="c-panel__body">
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
                    </SBody>

                            <Pagination prev_page_url={RegistItems.prev_page_url} next_page_url={RegistItems.next_page_url} current_page={RegistItems.current_page} last_page={RegistItems.last_page} movePage={movePage} />

                </SPanel>
            )}
        </SIndex>
    );
});

const SIndex = styled.div`
    margin-bottom: ${space.xl};
`;

const STitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.xl};
`;

const SEmpty = styled.div`
    padding: ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteBrightGray};
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    border-radius: 3px;
    margin-bottom: ${space.l};
    ${breakPoint.sm`
    width: 80%;
  `};
    ${breakPoint.md`
  width: 70%;
  `};
`;

const SPanel = styled.div`
    padding-left: ${space.xl};
    padding-right: ${space.xl};
    box-sizing: border-box;
`;

const SBody = styled.div`
    margin-right: ${space.xl};
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    ${breakPoint.sm`
    margin-right: initial;
  `};
`;
