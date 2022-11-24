import axios from "../libs/axios";

// 親MyMove詳細取得
const detailParentItem = async (id?: string) => {
    const { data } = await axios.get(`/items/${id}/get`);
    return data;
};

// 子MyMove詳細取得
const detailChildItem = async ({ id, pass }: { id?: string; pass?: string }) => {
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
    detailParentItem,
    detailChildItem,
    doChallenge,
    clearChallenge,
    addFavorite,
};
