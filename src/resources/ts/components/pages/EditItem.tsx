import React, { VFC, memo, useEffect } from "react";
import { useParams } from "react-router";
import axios from "../../libs/axios";
import { ItemForm } from "../templates/Item/ItemForm";

export const EditItem: VFC = memo(() => {
    const params: { id: string } = useParams();

    const id = params.id;

    return <ItemForm title="MyMove編集画面" method={`/items/${id}`} pId={id} />;
});
