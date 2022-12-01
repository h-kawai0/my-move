import React, {
    ChangeEvent,
    FormEvent,
    memo,
    useEffect,
    useState,
    VFC,
} from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "../../libs/axios";
import { useUpdateProfile, useUser } from "../../queries/AuthQuery";

import { Alert } from "../atoms/inputForm/Alert";
import { Button } from "../atoms/inputForm/Button";
import { Input } from "../atoms/inputForm/Input";
import { InputPic } from "../atoms/inputForm/InputPic";
import { InputTextArea } from "../atoms/inputForm/InputTextArea";
import { Label } from "../atoms/inputForm/Label";
import { Notes } from "../atoms/inputForm/Notes";
import { Title } from "../atoms/inputForm/Title";
import { Spinner } from "../atoms/spinner/Spinner";
import { UserComponent } from "../molecules/inputForm/UserComponent";
import { Form } from "../organisms/inputForm/Form";

// 型定義
type Form = {
    name: string;
    email: string;
    profile: string;
    pic: File | string;
    error_list: {
        name: string;
        email: string;
        profile: string;
        pic: string;
    };
};

// プロフィール編集画面
export const EdifProfile: VFC = memo(() => {
    // 入力フォーム管理用
    const [formData, setFormData] = useState<Form>({
        name: "",
        email: "",
        profile: "",
        pic: "",
        error_list: {
            name: "",
            email: "",
            profile: "",
            pic: "",
        },
    });

    // DB画像管理用
    const [dbPic, setDbPic] = useState("");

    // ログインユーザー情報取得
    const { data, isLoading } = useUser();

    // プロフィール情報更新用
    const updateProfile = useUpdateProfile();

    // 最初にプロフィール情報を取得
    useEffect(() => {
        if (data) {
            setFormData({
                ...formData,
                // null合体演算子
                name: data.name ?? "",
                email: data.email ?? "",
                profile: data.profile ?? "",
            });

            setDbPic(data.pic ?? "");
        }
    }, [data]);

    // 入力内容処理
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    // 画像データ選択処理
    const handlePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
            return;
        }
        const file = e.target.files[0];
        if (file === null) {
            return;
        }

        setFormData({
            ...formData,
            pic: e.target.files[0],
        });
    };

    // プロフィール情報更新処理
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 画面を遷移させないよう停止
        e.preventDefault();

        // フォームへの入力データを変数に詰める
        const data = {
            name: formData.name,
            email: formData.email,
            profile: formData.profile,
            pic: formData.pic,
        };

        // APIへアクセス
        axios.get("/sanctum/csrf-cookie").then((res) => {
            updateProfile.mutate(data, {
                onError: (err: any) => {
                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);
                    } else {
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
        <>
            {isLoading ? (
                <Spinner>
                    <Oval
                        height={80}
                        width={80}
                        color="#555"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#555"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </Spinner>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Title>プロフィール登録・編集</Title>

                    <UserComponent>
                        <Label>
                            ユーザーネーム
                            <Notes>&#8251;必須</Notes>
                            <Input
                                type="text"
                                name="name"
                                placeholder="ユーザーネーム"
                                value={formData.name}
                                onChange={handleChange}
                                isValid={formData.error_list.name}
                                autoFocus
                                autoComplete="username"
                            />
                        </Label>
                        <Alert>{formData.error_list.name}</Alert>
                    </UserComponent>

                    <UserComponent>
                        <Label>
                            メールアドレス
                            <Notes>&#8251;必須</Notes>
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
                            自己紹介文
                            <Notes>&#8251;任意</Notes>
                            <InputTextArea
                                value={formData.profile}
                                name="profile"
                                isValid={formData.error_list.profile}
                                onChange={handleChange}
                            />
                        </Label>
                        <Alert>{formData.error_list.profile}</Alert>
                    </UserComponent>

                    <UserComponent>
                        <Label>
                            アイコン画像
                            <Notes>&#8251;任意</Notes>
                            <InputPic
                                onChange={handlePicChange}
                                dbPic={dbPic}
                                role="user"
                            />
                        </Label>
                        <Alert>{formData.error_list.pic}</Alert>
                    </UserComponent>

                    <Button
                        value="登録する"
                        isLoading={updateProfile.isLoading}
                    />
                </Form>
            )}
        </>
    );
});
