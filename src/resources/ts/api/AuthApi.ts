import React from "react";
import axios from "../libs/axios";
import { User } from "../types/api/user";

type GetUser = Pick<User, "id" | "name" | "email">;

const getUser = async () => {
    const { data } = await axios.get<GetUser>(`/api/user`);
    return data;
};

const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const { data } = await axios.post<GetUser>(`/api/login`, {
        email,
        password,
    });
    return data;
};

const logout = async () => {
    const { data } = await axios.post<GetUser>(`/api/logout`);
    return data
};

export { getUser, login, logout };
