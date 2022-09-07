import React, { VFC, memo } from "react";
import { ItemForm } from "../templates/Item/ItemForm";

export const NewItem: VFC = memo(() => {
    return <ItemForm title="MyMove新規登録" method="/items" />;
});
