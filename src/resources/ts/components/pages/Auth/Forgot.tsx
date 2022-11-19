import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import { toast } from "react-toastify";
import { useFlash } from "../../../hooks/useFlash";
import axios from "../../../libs/axios";
import { useForgotPassword } from "../../../queries/AuthQuery";
import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { Label } from "../../atoms/inputForm/Label";
import { Text } from "../../atoms/inputForm/Text";
import { Title } from "../../atoms/inputForm/Title";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";

// リセットパスワードリクエスト用ページ
export const Forgot: VFC = memo(() => {

    // パスワードリセットリクエスト用hook
    const forgotPassword = useForgotPassword();

    // 入力データの管理
    const [formData, setFormData] = useState({
        email: "",
        error_list: {
            email: "",
        },
    });

    // ボタン連打防止用state
    const [isLoading, setIsLoading] = useState(false);

    const { handleFlashMessage } = useFlash();

    // フォーム入力情報をstateに詰める
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
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
                    setIsLoading(false);
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
                        console.log("Send Error", err.response.data.errors);
                        setIsLoading(false);
                    }
                });
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        // 画面遷移防止
        e.preventDefault();

        // ボタン連打防止
        setIsLoading(true);

        // 入力情報を変数に詰める
        const data = {
            email: formData.email,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
           forgotPassword.mutate(data, {
            onError: (err: any) => {
                if (err.response.status === 422) {
                    const newFormData = {
                        ...formData,
                        error_list: err.response.data.errors,
                    };

                    setFormData(newFormData);
                    setIsLoading(false);
                } else {
                    toast.error("エラーが発生しました。しばらくたってからやり直してください。", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                    setIsLoading(false);
                }

            },

           }); 
        });


    }

    return (
        <Form onSubmit={handleSubmit}>
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
