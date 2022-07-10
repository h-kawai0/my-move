import React, { memo, VFC, useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "../../libs/axios";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";

import { UserComponent } from "../molecules/auth/UserComponent";
import { Input } from "../atoms/auth/Input";

export const Register: VFC = memo(() => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        error_list: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setformData({ ...formData, [name]: value });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("/api/register", data)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_name", res.data.username);
                        history.push("/");
                    }
                    console.log(res);
                })
                .catch((err) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setformData(newFormData);
                        console.log("Login Error", err.response.data.errors);
                        setLoading(false);
                    } else {
                        console.log("Login Error", err.response);
                        setLoading(false);
                    }
                });
        });
    };

    return (
        <SAuth>
            <SAuthForm onSubmit={(e) => registerSubmit(e)}>
                <SAuthTitle>新規会員登録</SAuthTitle>

                <UserComponent>
                    ユーザーネーム
                    <Input
                        type="text"
                        name="name"
                        placeholder="ユーザーネーム"
                        autoFocus
                        autoComplete="username"
                        value={formData.name}
                        onChange={handleChange}
                        isValid={formData.error_list.name}
                    />
                    <SAuthAlert>{formData.error_list.name}</SAuthAlert>
                </UserComponent>

                <UserComponent>
                    メールアドレス
                    <Input
                        type="text"
                        name="email"
                        placeholder="メールアドレス"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        isValid={formData.error_list.email}
                    />
                    <SAuthAlert>{formData.error_list.email}</SAuthAlert>
                </UserComponent>

                <UserComponent>
                    パスワード
                    <Input
                        type="password"
                        name="password"
                        placeholder="8文字以上の半角英数字"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        isValid={formData.error_list.password}
                    />
                    <SAuthAlert>{formData.error_list.password}</SAuthAlert>
                </UserComponent>

                <UserComponent>
                    パスワード&#40;確認用&#41;
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        autoComplete="new-password"
                        placeholder="パスワードを再入力"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        isValid={formData.error_list.password_confirmation}
                    />
                    <SAuthAlert>
                        {formData.error_list.password_confirmation}
                    </SAuthAlert>
                </UserComponent>

                <SAuthContainerLink>
                    <SAuthLink href="">
                        ログインのかた&#40;会員登録済&#41;はこちら
                    </SAuthLink>
                </SAuthContainerLink>

                <SAuthBtn type="submit" disabled={loading} loading={loading}>
                    登録
                </SAuthBtn>
            </SAuthForm>
        </SAuth>
    );
});

const SAuth = styled.section`
    padding-top: ${space.xxxl};
    padding-bottom: 80px;
    box-sizing: border-box;
`;

const SAuthForm = styled.form`
    margin: 0 auto;
    width: 50%;
    padding: ${space.xxl};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
    ${breakPoint.sm`
    width: 100%;
  `}
    ${breakPoint.md`
  width: 80%;
  `}
`;

const SAuthTitle = styled.h1`
    margin-bottom: ${space.xxxl};
    text-align: center;
    font-size: ${fonts.size.xxl};
    ${breakPoint.sm`
  font-size: ${fonts.size.l};
  `}
`;

const SAuthBtn = styled.button<{ loading: boolean }>`
    background: ${colors.base.paletteTrueRed};
    width: 100%;
    border: none;
    padding: ${space.l} ${space.xxl};
    display: block;
    color: ${colors.font.fontColorSub};
    font-size: ${fonts.size.l};
    border-radius: 3px;
    transition: 0.3s;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    &:hover {
        cursor: pointer;
        opacity: 0.9;
        ${({ loading }) =>
            loading &&
            css`
                cursor: not-allowed;
            `}
    }
`;

const SAuthContainerLink = styled.div`
    margin-bottom: ${space.xl};
`;

const SAuthLink = styled.a`
    display: block;
    margin-bottom: ${space.m};
    margin-top: ${space.m};
    text-decoration: underline;
    ${breakPoint.sm`
    font-size: ${fonts.size.m};
  `}
    &:hover {
        text-decoration: none;
    }
`;

const SAuthAlert = styled.span`
    display: block;
    color: ${colors.valid.validColorInputText};
    margin-top: ${space.s};
`;
