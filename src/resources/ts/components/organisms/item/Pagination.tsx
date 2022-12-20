import React, { memo, useCallback, useMemo, useState, VFC } from "react";
import _ from "lodash";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";

// 型定義
type Props = {
    prev_page_url: null | number;
    next_page_url: string;
    current_page: number;
    last_page: number;
    movePage: (e: number) => void;
};

// ページング用コンポーネント
export const Pagination: VFC<Props> = memo((props) => {
    // props
    const { prev_page_url, next_page_url, current_page, last_page, movePage } =
        props;

    // ページ管理用state
    const [pages, setPages] = useState<number | number[]>([]);

    // 前のページがある場合
    const hasPrev = prev_page_url !== null;

    // 次のページがある場合
    const hasNext = next_page_url !== null;

    // ページ数生成
    const hasPages = useMemo(() => {
        let start = _.max([current_page - 2, 1]);

        let end = start ? _.min([start + 5, last_page + 1]) : 0;

        start = end ? _.max([end - 5, 1]) : 0;

        let page = start && end ? _.range(start, end) : 0;

        setPages(page);
    }, [current_page, last_page]);

    // ページ番号を押した場合移動
    const move = useCallback(
        (e: number) => {
            if (!isCurrentPage(e)) {
                movePage(e);
            }
        },
        [current_page]
    );

    // 現在のページかチェック
    const isCurrentPage = useCallback(
        (page: number) => current_page === page,
        [current_page]
    );

    return (
        <SPagination>
            <SPaginationWrap>
                {hasPrev && (
                    <SPaginationItem>
                        <SPaginationLink
                            to="#"
                            onClick={() => move(current_page - 1)}
                        >
                            &lt;
                        </SPaginationLink>
                    </SPaginationItem>
                )}

                {pages instanceof Array &&
                    pages.map((el) => (
                        <SPaginationItem
                            key={el}
                            page={el}
                            currentPage={current_page}
                            isActive={true}
                        >
                            <SPaginationLink to="#" onClick={() => move(el)}>
                                {el}
                            </SPaginationLink>
                        </SPaginationItem>
                    ))}

                {hasNext && (
                    <SPaginationItem>
                        <SPaginationLink
                            to="#"
                            onClick={() => move(current_page + 1)}
                        >
                            &gt;
                        </SPaginationLink>
                    </SPaginationItem>
                )}
            </SPaginationWrap>
        </SPagination>
    );
});

const SPagination = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

const SPaginationWrap = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
`;

const SPaginationItem = styled.li<{
    page?: number;
    currentPage?: number;
    isActive?: boolean;
}>`
    margin-right: ${space.s};
    padding: ${space.m};
    font-size: ${fonts.size.m};
    background: ${(props) =>
        props.isActive === true && props.page === props.currentPage
            ? colors.base.paletteVeryDarkBlack
            : colors.base.paletteDarkBlue};
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
