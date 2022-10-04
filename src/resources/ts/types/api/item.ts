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

export type ParentItem = {
    id: number;
    name: string;
    detail: string;
    pic: string;
    user_id: number;
    category_id: number;
    cleartime: string;
    created_at: string;
};

export type ChildItem = {
    id: number;
    name: string;
    detail: string;
    parent_item_id: number;
    cleartime?: string;
    deleted_at?: null;
    created_at?: string;
    updated_at?: string;
};

export type User = {
    id: number;
    name: string;
    pic: string;
    profile: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Challenges = {
    id: number;
    user_id: string;
    parent_item_id: string;
};

export type Clear = {
    id: number;
    user_id: number;
    parent_item_id: number;
    child_item_id: number;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
};

export type Favorite = {
    id: number;
    user_id: string;
    parent_item_id: string;
}