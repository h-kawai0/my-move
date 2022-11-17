import React from "react";
import axios from "../libs/axios";
import { User } from "../types/api/user";

type GetUser = Pick<User, "id" | "name" | "email">;

const getUser = async () => {
    const { data } = await axios.get<GetUser>(`/api/user`);
    return data;
};

const register = async ({
    name,
    email,
    password,
    password_confirmation
}: {
    name: string,
    email: string;
    password: string;
    password_confirmation: string
}) => {
    const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
        password_confirmation
    });
    return data;
}

const login = async ({
    email,
    password,
    remember
}: {
    email: string;
    password: string;
    remember: boolean;
}) => {
    const { data } = await axios.post(`/login`, {
        email,
        password,
        remember
    });
    return data;
};

const logout = async () => {
    const { data } = await axios.post<GetUser>(`/api/logout`);
    return data
};

export { getUser, register, login, logout };
