import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import axios from "../../../libs/axios";
import { Alert } from "../../atoms/auth/Alert";
import { Button } from "../../atoms/auth/Button";
import { Input } from "../../atoms/auth/Input";
import { Label } from "../../atoms/auth/Label";
import { Text } from "../../atoms/auth/Text";
import { Title } from "../../atoms/auth/Title";
import { UserComponent } from "../../molecules/auth/UserComponent";
import { Form } from "../../organisms/Auth/Form";

export const Forgot: VFC = memo(() => {
    const [formData, setFormData] = useState({
        email: "",
        error_list: {
            email: "",
        },
    });

    const [isLoading, setIsloading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsloading(true);
        e.preventDefault();

        const data = {
            email: formData.email,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("/password/email", data)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                        console.log("Send Error", err.response.data.errors);
                        setIsloading(false);
                    } else {
                        console.log("Send Error", err.response.data.errors);
                        setIsloading(false);
                    }
                });
        });
    };

    return (
        <Form onSubmit={registerSubmit}>
            <Title>パスワードをお忘れのかた</Title>
            <UserComponent>
                <Label>
                    メールアドレス
                    <Input
                        type="text"
                        name="email"
                        placeholder="ご登録されたメールアドレス"
                        value={formData.email}
                        onChange={handleChange}
                        isValid={formData.error_list.email}
                        autoComplete="email"
                        autoFocus
                    />
                </Label>
                <Alert>{formData.error_list.email}</Alert>
            </UserComponent>
            <Text>
                ご登録されたメールアドレスへパスワード再設定のご案内を送信します。
            </Text>
            <Button value="送信する" isLoading={isLoading} />
        </Form>
    );
});
