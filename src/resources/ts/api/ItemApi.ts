import axios from "../libs/axios";

// 親MyMove詳細取得
const detailParentItem = async (id?: string) => {
    const { data } = await axios.get(`/items/${id}/get`);
    return data;
};

// チャレンジ登録
const doChallenge = async ({
    userId,
    parentItemId,
}: {
    userId: number;
    parentItemId: number;
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
    userId: number;
    parentItemId: number;
    childItemId: number;
}) => {
    const { data } = await axios.post(`/items/clear`, {
        userId,
        parentItemId,
        childItemId,
    });
    return data;
};

export { detailParentItem, doChallenge, clearChallenge };
