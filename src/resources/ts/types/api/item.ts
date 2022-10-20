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
    detail?: string;
    pic: string;
    user_id?: number;
    category_id?: number;
    cleartime: string;
    created_at: string;
};

export type ChildItem = {
    id: number;
    name: string;
    detail?: string;
    parent_item_id: number;
    cleartime?: string;
    deleted_at?: null | string;
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
    user_id: number;
    parent_item_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
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
    user_id: number;
    parent_item_id: number;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
};

export type Paginate = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        active: boolean;
        labe: string;
        url: null | string;
    }[];
    next_page_url: string;
    path: string;
    per_page: null | number;
    prev_page_url: null | number;
    to: number;
    total: number;
};
