import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import axios from "../../../libs/axios";

import { useLogin } from "../../../queries/AuthQuery";

import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { Label } from "../../atoms/inputForm/Label";
import { LinkButton } from "../../atoms/inputForm/LinkButton";
import { Title } from "../../atoms/inputForm/Title";
import { ContainerLink } from "../../molecules/inputForm/ContainerLink";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";

export const Login: VFC = memo(() => {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
        error_list: {
            email: "",
            password: "",
        },
    });

    const [isChecked, setIsChecked] = useState(false);

    const auth = useAuth();

    const login = useLogin();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsChecked(checked);
    };

    const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const data = {
            email: formData.email,
            password: formData.password,
            remember: isChecked,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            auth?.signin(data)
                .then((res) => {
                    // history.push("/");
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                        console.log("Login Error", err.response.data.errors);
                        setIsLoading(false);
                    } else {
                        console.log("Login Error", err.response);
                        setIsLoading(false);
                    }
                });
        });
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const {email, password} = formData;

        await axios.get("/sanctum/csrf-cookie").then(() => {

            login.mutate({ email, password });
        })

    };

    return (
        <Form onSubmit={handleLogin}>
            <Title>ログイン</Title>

            <UserComponent>
                <Label>
                    メールアドレス
                    <Input
                        type="text"
                        name="email"
                        placeholder="メールアドレス"
                        value={formData.email}
                        onChange={handleChange}
                        isValid={formData.error_list.email}
                        autoComplete="email"
                    />
                </Label>
                <Alert>{formData.error_list.email}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    パスワード
                    <Input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="パスワード"
                        value={formData.password}
                        onChange={handleChange}
                        isValid={formData.error_list.password}
                    />
                </Label>
                <Alert>{formData.error_list.password}</Alert>
            </UserComponent>

            <Label>
                <SCheck
                    type="checkbox"
                    name="remember"
                    checked={isChecked}
                    onChange={handleCheck}
                />
                ログインしたままにする
            </Label>

            <ContainerLink>
                <LinkButton path="/forgot-password">
                    パスワードを忘れたかたはこちら
                </LinkButton>
                <LinkButton path="/register">
                    初めてのかた&#40;新規会員登録&#41;はこちら
                </LinkButton>
            </ContainerLink>

            <Button value="ログイン" isLoading={isLoading} />
        </Form>
    );
});

const SCheck = styled.input`
    display: inline-block;
    vertical-align: top;
`;
