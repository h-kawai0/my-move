/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    ChangeEvent,
    memo,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
    VFC,
} from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { Panel } from "../organisms/item/Panel";
import { Link } from "react-router-dom";

type Item = {
    category: {
        id: number;
        name: string;
    };
    category_id: number;
    child_items: {
        id: number;
        name: string;
        parent_item_id: number;
    }[];
    cleartime: string;
    created_at: string;
    id: number;
    name: string;
    pic: string;
    user_id: number;
    user: {
        id: number;
        name: string;
        pic: string;
    };
};

type Data = {
    current_page: number;
    data: Item[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        active: boolean;
        labe: string;
        url: null | string;
    }[];
    next_page_url: string;
    path: string;
    per_page: null | number;
    prev_page_url: null | number;
    to: number;
    total: number;
};


export const Items: VFC = memo(() => {
    const [items, setItems] = useState<Data>({
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

    const [categoryList, setCategoryList] = useState([
        {
            id: 0,
            name: "",
            created_at: "",
            updated_at: ""
        }
    ]);

    const [pages, setPages] = useState<number | number[]>([]);

    const[ formData, setFormData] = useState({
        sort: 0,
        category: 0
    });

    const hasPrev = items.prev_page_url !== null;

    const hasNext = items.next_page_url !== null;

    const hasPages = useMemo(() => {

    let start =  _.max([items.current_page - 2, 1]);

    let end = start ? _.min([start + 5, items.last_page + 1 ]) : 0;

    start = end ?  _.max([end - 5 , 1]) : 0;

    let page = start && end ? _.range(start, end) : 0;

    
    setPages(page);
    
    }, [items.current_page, items.last_page]);

    const getItems = useCallback((page:number = 1) => {

        console.log(formData);

        axios
            .get<Data>("/items/get", {
                params: {
                    page: page,
                    sort: formData.sort,
                    category: formData.category
                }
            })
            .then((res) => {
                console.log(res.data);

                let result = res.data;

                setItems(result);
            })
            .catch((err) => {
                console.log(err);
            });

    },[formData.category, formData.sort]);

    const move = useCallback((e: number) => {

        console.log(items.current_page, e);
        if(!isCurrentPage(e)){
            getItems(e);
            
        }


    },[items.current_page]);

    const isCurrentPage = useCallback((page:number) => items.current_page === page, [items.current_page]);

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {

        const { name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const searchItem = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('search');
        getItems();
    }


    useEffect(() => {

        axios.get('/items/categories')
        .then((res) => {
            setCategoryList(res.data.categories);
        }).catch((err) => {
            console.log(err.response.data.errors);
        });

            getItems();
    }, []);


    return (
        <SIndex className="p-index">
            <SContainer className="p-index__container">
                <SSearch className="c-search p-index__search">
                    <form>

                    <STitle className="c-search__title">表示順</STitle>

                    <SSelectBox className="c-search__selectBox c-search__sl">
                        <SSelect name="sort" className="c-search__select" value={formData.sort} onChange={handleChange}>
                            <option selected value={0}>
                                選択してください
                            </option>
                            <option value={1}>投稿日が新しい順</option>
                            <option value={2}>投稿日が古い順</option>
                        </SSelect>
                    </SSelectBox>

                    <>
                        <STitle className="c-search__title">カテゴリー</STitle>

                        <SSelectBox className="c-search__selectBox c-search__sl">
                            <SSelect name="category" className="c-search__select" value={formData.category} onChange={handleChange}>
                                <option selected value={0}>
                                    選択してください
                                </option>
                                {categoryList.map((val) => (
                                    <option key={val.id} value={val.id}>{val.name}</option>
                                ))}
                            </SSelect>
                        </SSelectBox>

                        <SSearchBtn className="c-search__btn p-index__btn" onClick={searchItem}>
                            検索
                        </SSearchBtn>
                    </>

                    </form>

                </SSearch>

                <SIndexList className="p-index__list">
                    <SIndexTitle className="p-index__title">
                        MyMove一覧
                    </SIndexTitle>

                    {( items.data.length === 0 || items.data[0].id === 0) ? (
                        <SIndexEmpty className="p-index__empty">
                            <p>MyMoveはまだありません。</p>
                        </SIndexEmpty>
                    ) : (
                        <SPanel className="c-panel">
                            <SPanelBody className="c-panel__body">
                                {items?.data.map((el) => (
                                    <Panel
                                        itemLength={el.child_items.length}
                                        itemPic={el.pic}
                                        categoryName={el.category.name}
                                        itemName={el.name}
                                        userPic={el.user.pic}
                                        userName={el.user.name}
                                        itemDate={el.created_at}
                                        itemClearTime={el.cleartime}
                                        itemId={el.id}
                                        key={el.id}
                                    />
                                ))}
                            </SPanelBody>

                            <SPagination className="c-pagination">
                                <SPaginationWrap
                                    className="c-pagination--wrap"
                                    role="navigation"
                                >
                                    {hasPrev && (
                                        <SPaginationItem className="c-pagination__item">
                                            <SPaginationLink
                                                to="#"
                                                className="c-pagination__link"
                                                onClick={() => move(items.current_page - 1)}
                                            >
                                                &lt;
                                            </SPaginationLink>
                                        </SPaginationItem>
                                    )}

                                        {(pages instanceof Array) &&

                                        pages.map((el,) => (

                                            <SPaginationItem className="c-pagination__item" key={el}
                                            page={el}
                                            currentPage={items.current_page}
                                            isActive={true}
                                            >
                                        <SPaginationLink
                                            to="#"
                                            className="c-pagination__link"
                                            onClick={() => move(el)}
                                            >
                                            {el}
                                        </SPaginationLink>
                                    </SPaginationItem>
                                        ))
                                        }

                                        {hasNext && (

                                    <SPaginationItem className="c-pagination__item">
                                        <SPaginationLink
                                            to="#"
                                            className="c-pagination__link"
                                            onClick={() => move(items.current_page + 1)}
                                        >
                                            &gt;
                                        </SPaginationLink>
                                    </SPaginationItem>
                                        )}


                                </SPaginationWrap>
                            </SPagination>
                        </SPanel>
                    )}
                </SIndexList>
            </SContainer>
        </SIndex>
    );
});

const SIndex = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
    min-height: 850px;
`;

const SContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    ${breakPoint.sm`
    width: 100%;
    `}
    ${breakPoint.md`
    width: 100%;
    `}
`;

const SSearch = styled.div`
    padding-left: ${space.l};
    padding-right: ${space.l};
    box-sizing: border-box;
    width: 25%;
    ${breakPoint.sm`
        margin-bottom: ${space.l};
        width: 100%;
    `}
    ${breakPoint.md`
    margin-bottom: ${space.l}
    width: 100%;
    `};
`;

const STitle = styled.h1`
    font-size: ${fonts.size.default};
`;

const SSelectBox = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: ${space.xl};
    position: relative;
    border: 1px solid ${colors.base.paletteSilverGray};
    border-radius: 2px;
    background: ${colors.base.paletteTrueWhite};
    &::before {
        position: absolute;
        top: 45%;
        right: 0.9em;
        width: 0;
        height: 0;
        padding: 0;
        content: "";
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid ${colors.base.paletteDimGray};
        pointer-events: none;
    }
    &::after {
        position: absolute;
        top: 0;
        right: 2.5em;
        bottom: 0;
        width: 1px;
        content: "";
        border-left: 1px solid ${colors.base.paletteSilverGray};
    }
`;

const SSelect = styled.select`
    width: 100%;
    padding: ${space.m} ${space.xxxl} ${space.m} ${space.m};
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    appearance: none;
    ${breakPoint.sm`
        font-size: ${fonts.size.default};
    `}
    ${breakPoint.md`
        font-size: ${fonts.size.default};
    `}
    &::-ms-expand {
        display: none;
    }
`;

const SIndexList = styled.div`
    width: 75%;
    ${breakPoint.sm`
        width: 100%;
    `}
    ${breakPoint.md`
        width: 100%;
    `}
`;

const SIndexTitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.l};
`;

const SIndexEmpty = styled.div`
    padding: ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
    width: 100%;
    border-radius: 3px;
    text-align: center;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SSearchBtn = styled.button`
    width: 100%;
    padding: ${space.m} ${space.l};
    border: none;
    background: ${colors.base.paletteVeryDarkBlack};
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.default};
    ${breakPoint.sm`
        font-size: ${fonts.size.l};
    `}
    ${breakPoint.md`
    font-size: ${fonts.size.l};
    `}
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const SPanel = styled.div`
    padding-left: ${space.xl};
    padding-right: ${space.xl};
    box-sizing: border-box;
`;

const SPanelBody = styled.div`
    margin-right: -${space.xl};
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    ${breakPoint.sm`
    margin-right: initial;
    `}
`;

const SPagination = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

const SPaginationWrap = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
`;

const SPaginationItem = styled.li<{page?: number, currentPage?: number, isActive?: boolean}>`
    margin-right: ${space.s};
    padding: ${space.m};
    font-size: ${fonts.size.m};
    background: ${(props) => props.isActive === true && props.page === props.currentPage ? colors.base.paletteVeryDarkBlack : colors.base.paletteDarkBlue  };
    border-radius: 3px;
    transition: 1s;
    &:last-child {
        margin-right: 0;
    }
    &:hover {
        background: ${colors.base.paletteVeryDarkBlack};
        color: ${colors.font.fontColorSub};
        transition: 1s;
    }
`;

const SPaginationLink = styled(Link)`
    color: ${colors.font.fontColorSub};
`;
