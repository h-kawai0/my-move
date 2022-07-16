import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import axios from "../../libs/axios";
import { Alert } from "../atoms/auth/Alert";
import { Button } from "../atoms/auth/Button";
import { Input } from "../atoms/auth/Input";
import { Label } from "../atoms/auth/Label";
import { LinkButton } from "../atoms/auth/LinkButton";
import { Title } from "../atoms/auth/Title";
import { ContainerLink } from "../molecules/auth/ContainerLink";
import { UserComponent } from "../molecules/auth/UserComponent";
import { Form } from "../organisms/Auth/Form";

export const Login: VFC = memo(() => {
    const history = useHistory();

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
                .then(() => {
                    history.push("/");
                })
                .catch((err) => {
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

    return (
        <Form onSubmit={(e) => loginSubmit(e)}>
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
                <LinkButton path="">パスワードを忘れたかたはこちら</LinkButton>
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
