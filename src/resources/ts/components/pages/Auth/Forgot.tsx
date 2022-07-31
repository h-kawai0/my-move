import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import { useFlash } from "../../../hooks/useFlash";
import axios from "../../../libs/axios";
import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { Label } from "../../atoms/inputForm/Label";
import { Text } from "../../atoms/inputForm/Text";
import { Title } from "../../atoms/inputForm/Title";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";

export const Forgot: VFC = memo(() => {
    const [formData, setFormData] = useState({
        email: "",
        error_list: {
            email: "",
        },
    });

    const [isLoading, setIsloading] = useState(false);

    const { handleFlashMessage } = useFlash();

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
                    handleFlashMessage('メールを送信しました。もしメールが届かない場合は、入力されたメールアドレスが間違っているか登録されていません。');
                    setIsloading(false);
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
