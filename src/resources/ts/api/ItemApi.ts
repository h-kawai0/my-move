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

// MyMove更新用データ取得
const getEditItem = async (id?: string) => {
    const { data } = await axios.get(`/items/${id}/edit`);
    return data;
};

// MyMove新規登録・編集
const updateItem = async ({
    parent_name,
    category_id,
    parent_cleartime,
    parent_detail,
    pic,
    method,
    child_item,
}: {
    parent_name: string;
    category_id: string;
    parent_cleartime: string;
    parent_detail: string;
    pic: string | File;
    child_item: {
        index: number;
        id?: number;
        name: string;
        cleartime: string;
        detail: string;
        parent_item_id: string;
        error_list: {
            name: string;
            cleartime: string;
            detail: string;
        };
    }[];
    method: string;
}) => {
    // 画像情報を送るためフォームデータオブジェクトを作成
    const body = new FormData();

    body.append("parent_name", parent_name);
    body.append("category_id", category_id);
    body.append("parent_cleartime", parent_cleartime);
    body.append("parent_detail", parent_detail);
    body.append("pic", pic);

    child_item.forEach((item) => {
        body.append("child_item[]", JSON.stringify(item));
    });

    const { data } = await axios.post(method, body);
    return data;
};

// MyPage登録MyMove取得
const getRegistsItems = async (page?: number) => {
    const { data } = await axios.get(`mypage/regists`, {
        params: {
            page: page,
        },
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
    getEditItem,
    updateItem,
    getRegistsItems,
};
