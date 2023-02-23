import React, {
    ChangeEvent,
    FormEvent,
    memo,
    useRef,
    useState,
    VFC,
} from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
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

// ログイン画面
export const Login: VFC = memo(() => {
    // フォーム入力データ
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
        error_list: {
            email: "",
            password: "",
        },
    });

    // 「ログインしたままにする」の状態管理
    const [isChecked, setIsChecked] = useState(false);

    // ログイン用hook
    const login = useLogin();

    // ボタン送信制御用
    const processing = useRef(false);

    // フォームへ入力した内容をstateに詰める
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    // 「ログインしたままにする」にチェックを入れた場合の処理
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsChecked(checked);
    };

    // ログイン処理
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        // 画面を遷移させないよう停止
        e.preventDefault();

        // 処理中ならボタンを連打できないようにする
        if (processing.current) return;

        processing.current = true;


        // フォームへの入力データを変数に詰める
        const data = {
            email: formData.email,
            password: formData.password,
            remember: isChecked,
        };

        // ログイン処理を行う
        await axios.get("/sanctum/csrf-cookie").then(() => {
            login.mutate(data, {
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
                            "ログインに失敗しました。しばらくたってからやり直してください。",
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
                        autoFocus
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
                <LinkButton path="/login/forgot-password">
                    パスワードを忘れたかたはこちら
                </LinkButton>
                <LinkButton path="/register">
                    初めてのかた&#40;新規会員登録&#41;はこちら
                </LinkButton>
            </ContainerLink>

            <Button value="ログイン" isLoading={login.isLoading} />
        </Form>
    );
});

const SCheck = styled.input`
    display: inline-block;
    vertical-align: top;
`;
