import axios from "../libs/axios";

// MyMove一覧取得
const getItems = async ({
    page = 1,
    sort,
    category,
}: {
    page: number;
    sort: number;
    category: number;
}) => {
    const { data } = await axios.get(`/items/get`, {
        params: {
            page,
            sort,
            category,
        },
    });
    return data;
};

// カテゴリー一覧を取得
const getCategories = async () => {
    const { data } = await axios.get(`/items/categories`);
    return data;
};

// 親MyMove詳細取得
const detailParentItem = async (id?: string) => {
    const { data } = await axios.get(`/items/${id}/get`);
    return data;
};

// 子MyMove詳細取得
const detailChildItem = async ({
    id,
    pass,
}: {
    id?: string;
    pass?: string;
}) => {
    const { data } = await axios.get(`/items/${id}/${pass}/get`);
    return data;
};

// チャレンジ登録
const doChallenge = async ({
    userId,
    parentItemId,
}: {
    userId?: number;
    parentItemId?: number;
}) => {
    const { data } = await axios.post(`/items/challenge`, {
        userId,
        parentItemId,
    });
    return data;
};

// クリア登録
const clearChallenge = async ({
    userId,
    parentItemId,
    childItemId,
}: {
    userId?: number;
    parentItemId?: number;
    childItemId: number;
}) => {
    const { data } = await axios.post(`/items/clear`, {
        userId,
        parentItemId,
        childItemId,
    });
    return data;
};

// お気に入り登録
const addFavorite = async ({
    userId,
    parentItemId,
}: {
    userId: number;
    parentItemId: number;
}) => {
    const { data } = await axios.post(`/items/favorite`, {
        userId,
        parentItemId,
    });
    return data;
};

export {
    getItems,
    getCategories,
    detailParentItem,
    detailChildItem,
    doChallenge,
    clearChallenge,
    addFavorite,
};
