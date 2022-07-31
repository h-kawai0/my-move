import React, { memo, VFC, useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../libs/axios";

import { useFlash } from "../../../hooks/useFlash";

import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Input } from "../../atoms/inputForm/Input";
import { Button } from "../../atoms/inputForm/Button";
import { Alert } from "../../atoms/inputForm/Alert";
import { Title } from "../../atoms/inputForm/Title";
import { LinkButton } from "../../atoms/inputForm/LinkButton";
import { ContainerLink } from "../../molecules/inputForm/ContainerLink";
import { Form } from "../../organisms/inputForm/Form";
import { Label } from "../../atoms/inputForm/Label";
import { useAuth } from "../../../context/AuthContext";

export const Register: VFC = memo(() => {
    const history = useHistory();

    const auth = useAuth();

    const { handleFlashMessage} = useFlash();

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
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

        setFormData({ ...formData, [name]: value });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            auth?.register(data)
                .then(() => {
                    history.push("/items");
                    handleFlashMessage('会員登録が完了しました!');
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
        <Form onSubmit={(e) => registerSubmit(e)}>
            <Title>新規会員登録</Title>

            <UserComponent>
                <Label>
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
                </Label>
                <Alert>{formData.error_list.name}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
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
                </Label>
                <Alert>{formData.error_list.email}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
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
                </Label>
                <Alert>{formData.error_list.password}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
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
                </Label>
                <Alert>{formData.error_list.password_confirmation}</Alert>
            </UserComponent>

            <ContainerLink>
                <LinkButton path="/login">
                    ログインのかた&#40;会員登録済&#41;はこちら
                </LinkButton>
            </ContainerLink>

            <Button value="登録" isLoading={isLoading} />
        </Form>
    );
});
