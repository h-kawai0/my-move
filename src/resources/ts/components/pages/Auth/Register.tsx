import React, { memo, VFC, useState, ChangeEvent, FormEvent } from "react";
import axios from "../../../libs/axios";

import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Input } from "../../atoms/inputForm/Input";
import { Button } from "../../atoms/inputForm/Button";
import { Alert } from "../../atoms/inputForm/Alert";
import { Title } from "../../atoms/inputForm/Title";
import { LinkButton } from "../../atoms/inputForm/LinkButton";
import { ContainerLink } from "../../molecules/inputForm/ContainerLink";
import { Form } from "../../organisms/inputForm/Form";
import { Label } from "../../atoms/inputForm/Label";
import { useRegister } from "../../../queries/AuthQuery";
import { toast } from "react-toastify";

// 新規会員登録ページ
export const Register: VFC = memo(() => {
    // 会員登録用hook
    const register = useRegister();

    // ボタン送信時に連打がされないよう状態を管理
    const [isLoading, setIsLoading] = useState(false);

    // フォーム入力データの状態管理
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

    // フォームへデータが入力された時にstateへ詰める
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    // 会員登録処理
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        console.log("ろぐいん");
        // 画面を遷移させないよう停止
        e.preventDefault();

        // フォームへの入力データを変数に詰める
        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
        };
        // ボタン連打防止のためtrue
        setIsLoading(true);

        await axios.get("/sanctum/csrf-cookie").then(() => {
            register.mutate(data, {
                onError: (err: any) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }

                    toast.error("会員登録に失敗しました。", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                },
            });
        });
    };

    return (
        <Form onSubmit={handleRegister}>
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
