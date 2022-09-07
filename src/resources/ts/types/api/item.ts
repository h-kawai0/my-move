export type Item = {
    parentItem: {
        id: number;
        name: string;
        category_id: string;
        cleartime: string;
        detail: string;
        pic: string;
        user_id: number;
        child_items: {
            id: number;
            name: string;
            cleartime: string;
            detail: string;
            parent_item_id: string;
        }[];
        user: {
            id: number;
        };
    };
};
