import React, { VFC, memo } from "react";
import { ItemForm } from "../templates/Item/ItemForm";

// MyMove新規登録画面
export const NewItem: VFC = memo(() => {

    // 新規登録用ルートを渡す
    return <ItemForm title="MyMove新規登録" method="/items" />;
});
