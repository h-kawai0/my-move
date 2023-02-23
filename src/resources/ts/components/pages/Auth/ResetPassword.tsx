import React, {
    VFC,
    memo,
    useState,
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
} from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../../libs/axios";
import { useResetPassword } from "../../../queries/AuthQuery";

import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { Label } from "../../atoms/inputForm/Label";
import { Title } from "../../atoms/inputForm/Title";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";
import { toast } from "react-toastify";

// パスワードリセット画面
export const ResetPassword: VFC = memo(() => {
    // GETパラメータからリセット用コードを取得
    const { code } = useParams<{ code: string }>();

    const resetPassword = useResetPassword();

    const navigate = useNavigate();

    // ボタン送信制御用
    const processing = useRef(false);

    // フォーム入力用データ
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

    // フォーム内容取得処理
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    // パスワードリセット送信処理
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 画面遷移防止
        e.preventDefault();

        // 処理中ならボタンを連打できないようにする
        if (processing.current) return;

        processing.current = true;

        // 入力情報を変数に詰める
        const data = {
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
            code: code,
        };

        // 認証処理
        axios.get("/sanctum/csrf-cookie").then((res) => {
            resetPassword.mutate(data, {
                // エラー時処理
                onError: (err: any) => {
                    console.log(err.response, err.response.status);

                    switch (err.response.status) {
                        // 有効期限切れの場合
                        case 401:
                            console.log("401です");
                            toast.error(err.response.data.message, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 3000,
                            });
                            navigate("/login/forgot-password");
                            break;

                        // バリデーションエラー
                        case 422:
                            const newFormData = {
                                ...formData,
                                error_list: err.response.data.errors,
                            };

                            // パスワードコードがDBに存在しない場合
                            if ("code" in err.response.data.errors) {
                                toast.error(err.response.data.errors.code[0], {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 3000,
                                });
                                navigate("/login/forgot-password");
                            }

                            setFormData(newFormData);
                            processing.current = false;

                            break;

                        default:
                            processing.current = false;

                            toast.error(
                                "エラーが発生しました。しばらくたってからやり直してください。",
                                {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 3000,
                                }
                            );
                            break;
                    }
                },
            });
        });
    };

    useEffect(() => {
        // GETパラメータが空の場合はTOPへ戻す
        if (!code) {
            navigate("/");
        }
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
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

            <Button
                value="新しいパスワードを保存"
                isLoading={resetPassword.isLoading}
            />
        </Form>
    );
});
