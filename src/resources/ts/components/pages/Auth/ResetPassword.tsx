import React, { VFC, memo, useState, ChangeEvent, FormEvent } from "react";
import { useHistory, useParams } from "react-router";
import axios from "../../../libs/axios";

import { useFlash } from '../../../hooks/useFlash';

import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { Label } from "../../atoms/inputForm/Label";
import { Title } from "../../atoms/inputForm/Title";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";

export const ResetPassword: VFC = memo(() => {
    const { code } = useParams<{ code: string }>();

    // console.log(code);

    const history = useHistory();

    const { handleFlashMessage } = useFlash();

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        error_list: {
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
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
            code: code,
        };

        console.log(data);

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("/password/reset", data)
                .then((res) => {
                    console.log(res.data);
                    history.push('/');
                    handleFlashMessage('パスワードを変更しました!');


                })
                .catch((err) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                        console.log("Send Error", err.response.data.errors);
                        setIsLoading(false);
                    } else {
                        console.log("Send Error", err.response.data);
                        setIsLoading(false);
                    }
                });
        });
    };

    return (
        <Form onSubmit={registerSubmit}>
            <Title>新しいパスワードの入力</Title>

            <UserComponent>
                <Label>
                    メールアドレス
                    <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        placeholder="ご登録されたメールアドレス"
                        autoFocus
                        autoComplete="email"
                        isValid={formData.error_list.email}
                        onChange={handleChange}
                    />
                    <Alert>{formData.error_list.email}</Alert>
                </Label>
            </UserComponent>

            <UserComponent>
                <Label>
                    新しいパスワード
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="8文字以上の半角英数字"
                        autoComplete="new-password"
                        isValid={formData.error_list.password}
                        onChange={handleChange}
                    />
                    <Alert>{formData.error_list.password}</Alert>
                </Label>
            </UserComponent>

            <UserComponent>
                <Label>
                    パスワード&#40;確認用&#41;
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        placeholder="新しいパスワードを再入力"
                        autoComplete="new-password"
                        isValid={formData.error_list.password_confirmation}
                        onChange={handleChange}
                    />
                    <Alert>{formData.error_list.password_confirmation}</Alert>
                </Label>
            </UserComponent>

            <Button value="新しいパスワードを保存" isLoading={isLoading} />
        </Form>
    );
});
