import React, { VFC, memo } from "react";
import { useParams } from "react-router";
import { ItemForm } from "../templates/Item/ItemForm";

export const EditItem: VFC = memo(() => {
    const params: { id: string } = useParams();

    const id = params.id;

    return <ItemForm title="MyMove編集画面" method={`/items/${id}`} pId={id} />;
});
