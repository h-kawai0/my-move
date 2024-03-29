import React, {
    ChangeEvent,
    FormEvent,
    memo,
    useRef,
    useState,
    VFC,
} from "react";
import { toast } from "react-toastify";
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

    // ボタン送信制御用
    const processing = useRef(false);

    // フォーム入力情報をstateに詰める
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 画面遷移防止
        e.preventDefault();

        // 処理中ならボタンを連打できないようにする
        if (processing.current) return;

        processing.current = true;

        // 入力情報を変数に詰める
        const data = {
            email: formData.email,
        };

        // 認証処理
        axios.get("/sanctum/csrf-cookie").then((res) => {
            forgotPassword.mutate(data, {
                // 成功時処理
                onSuccess: () => {},
                // エラー時処理
                onError: (err: any) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                        processing.current = false;
                    } else {
                        processing.current = false;

                        toast.error(
                            "エラーが発生しました。しばらくたってからやり直してください。",
                            {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 3000,
                            }
                        );
                    }
                },
            });
        });
    };

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
            <Button value="送信する" isLoading={forgotPassword.isLoading} />
        </Form>
    );
});
