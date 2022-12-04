import React, { VFC, memo } from "react";
import { useParams } from "react-router";
import { ItemForm } from "../templates/Item/ItemForm";

// MyMove編集画面
export const EditItem: VFC = memo(() => {

    // GETパラメータを取得
    const params: { id?: string } = useParams();

    const id = params.id;

    // 更新用のルートとMyMoveのidを渡す
    return <ItemForm title="MyMove編集画面" method={`/items/${id}`} pId={id} />;
});
