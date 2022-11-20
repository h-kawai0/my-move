import React from "react";
import axios from "../libs/axios";
import { User } from "../types/api/user";

type GetUser = Pick<User, "id" | "name" | "email">;

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
    const { data } = await axios.post<GetUser>(`/api/logout`);
    return data;
};

// パスワードリセット用リクエスト
const forgotPassword = async ({ email }: { email: string }) => {
    const { data } = await axios.post(`/password/email`, { email });

    return data;
};

// パスワードリセット
const resetPassword = async ({
    email,
    password,
    password_confirmation,
    code,
}: {
    email: string;
    password: string;
    password_confirmation: string;
    code?: string;
}) => {
    const { data } = await axios.post(`/password/reset`, {
        email,
        password,
        password_confirmation,
        code,
    });
    return data;
};

export { getUser, register, login, logout, forgotPassword, resetPassword };
