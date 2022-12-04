import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as api from "../api/ItemApi";

// MyMove一覧取得
const useGetItems = ({
    page,
    sort,
    category,
}: {
    page: number;
    sort: number;
    category: number;
}) => {
    return useQuery(["getItems", { page, sort, category }], () =>
        api.getItems({ page, sort, category })
    );
};

// カテゴリー一覧を取得
const useGetCategories = () => {
    return useQuery("getCategories", api.getCategories);
};

// 親MyMove詳細取得処理
const useDetailParentItem = (id?: string) => {
    return useQuery(["parentDetail", id], () => api.detailParentItem(id));
};

// 子MyMove詳細取得処理
const useChildDetailItem = ({ id, pass }: { id?: string; pass?: string }) => {
    return useQuery(["childDetail", { id, pass }], () =>
        api.detailChildItem({ id, pass })
    );
};

// チャレンジ送信処理
const useDoChallenge = () => {
    return useMutation(api.doChallenge);
};

// チャレンジクリア送信処理
const useClearChallenge = () => {
    return useMutation(api.clearChallenge, {
        onError: (err) => {
            console.log(err);
        },
    });
};

// お気に入り登録送信処理
const useAddFavorite = () => {
    return useMutation(api.addFavorite, {
        onError: (err) => {
            console.log(err);
        },
    });
};

// MyMove更新用データ取得処理
const useGetEditItem = (id?: string) => {
    return useQuery(["getEditItem", id], () => api.getEditItem(id));
};

// MyMove更新・作成処理
const useUpdateItem = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(api.updateItem, {
        onSuccess: (data) => {

          // キャッシュを更新
          queryClient.invalidateQueries('getEditItem');

            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            navigate(`/mypage`);
        },
    });
};

export {
    useGetItems,
    useGetCategories,
    useDetailParentItem,
    useChildDetailItem,
    useDoChallenge,
    useClearChallenge,
    useAddFavorite,
    useGetEditItem,
    useUpdateItem,
};
