import React from "react";
import axios from "../libs/axios";
import { User } from "../types/api/user";

type GetUser = Pick<User, "id" | "name" | "email" | "profile" | "pic">;

// ログイン情報
const getUser = async () => {
    const { data } = await axios.get<GetUser>(`/api/user`);
    return data;
};

// 会員登録
const register = async ({
    name,
    email,
    password,
    password_confirmation,
}: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
        password_confirmation,
    });
    return data;
};

// ログイン
const login = async ({
    email,
    password,
    remember,
}: {
    email: string;
    password: string;
    remember: boolean;
}) => {
    const { data } = await axios.post(`/login`, {
        email,
        password,
        remember,
    });
    return data;
};

// ログアウト
const logout = async () => {
    const { data } = await axios.post(`/api/logout`);
    return data;
};

// パスワードリセット用リクエスト
const forgotPassword = async ({ email }: { email: string }) => {
    const { data } = await axios.post(`/password/email`, { email });

    return data;
};

// パスワードリセット
const resetPassword = async ({
    password,
    password_confirmation,
    code,
}: {
    password: string;
    password_confirmation: string;
    code?: string;
}) => {
    const { data } = await axios.post(`/password/reset`, {
        password,
        password_confirmation,
        code,
    });
    return data;
};

// プロフィール情報更新
const updateProfile = async ({
    name,
    email,
    profile,
    pic,
}: {
    name: string;
    email: string;
    profile: string;
    pic: string | File;
}) => {
    // 画像情報を送るためフォームデータオブジェクトを作成
    const body = new FormData();

    body.append("name", name);
    body.append("email", email);
    body.append("profile", profile);
    body.append("pic", pic);

    const { data } = await axios.post(`/mypage/update-profile`, body);
    return data;
};

// パスワード更新
const updatePassword = async ({
    pass_old,
    pass_new,
    pass_new_confirmation,
}: {
    pass_old: string;
    pass_new: string;
    pass_new_confirmation: string;
}) => {
    const { data } = await axios.post(`/mypage/update-password`, {
        pass_old,
        pass_new,
        pass_new_confirmation,
    });
    return data;
};

export {
    getUser,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    updatePassword,
};
