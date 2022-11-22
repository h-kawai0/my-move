import { useMutation, useQuery } from "react-query";
import * as api from "../api/ItemApi";

// 親MyMove詳細取得処理
const useDetailParentItem = (id?: string) => {
    return useQuery(["parentDetail", id], () => api.detailParentItem(id));
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

export { useDetailParentItem, useDoChallenge, useClearChallenge };
