import React, {
    VFC,
    memo,
    useState,
    ChangeEvent,
    FormEvent,
    useRef,
} from "react";
import { toast } from "react-toastify";
import axios from "../../libs/axios";
import { useUpdatePassword } from "../../queries/AuthQuery";
import { Alert } from "../atoms/inputForm/Alert";
import { Button } from "../atoms/inputForm/Button";
import { Input } from "../atoms/inputForm/Input";
import { Label } from "../atoms/inputForm/Label";
import { Title } from "../atoms/inputForm/Title";
import { UserComponent } from "../molecules/inputForm/UserComponent";
import { Form } from "../organisms/inputForm/Form";

// パスワード更新画面
export const EditPassword: VFC = memo(() => {
    // 入力フォームデータ管理用
    const [formData, setFormData] = useState({
        pass_old: "",
        pass_new: "",
        pass_new_confirmation: "",
        error_list: {
            pass_old: "",
            pass_new: "",
            pass_new_confirmation: "",
        },
    });

    // ボタン送信制御用
    const processing = useRef(false);

    // パスワード更新処理用
    const updatePassword = useUpdatePassword();

    // フォーム入力時処理
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    // パスワード変更処理
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 画面遷移防止
        e.preventDefault();

        // 処理中ならボタンを連打できないようにする
        if (processing.current) return;

        processing.current = true;

        // 入力データを変数に詰める
        const data = {
            pass_old: formData.pass_old,
            pass_new: formData.pass_new,
            pass_new_confirmation: formData.pass_new_confirmation,
        };

        axios.get("/sanctum/csrf-cookie").then(() => {
            updatePassword.mutate(data, {
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
            <Title>パスワード変更</Title>

            <UserComponent>
                <Label>
                    現在のパスワード
                    <Input
                        type="password"
                        name="pass_old"
                        placeholder="現在のパスワード"
                        value={formData.pass_old}
                        onChange={handleChange}
                        isValid={formData.error_list.pass_old}
                        autoComplete="current-password"
                        autoFocus
                    />
                </Label>
                <Alert>{formData.error_list.pass_old}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    新しいパスワード&#41;
                    <Input
                        type="password"
                        name="pass_new"
                        placeholder="新しいパスワード"
                        value={formData.pass_new}
                        onChange={handleChange}
                        isValid={formData.error_list.pass_new}
                        autoComplete="new-password"
                    />
                </Label>
                <Alert>{formData.error_list.pass_new}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    新しいパスワード&#40;確認用&#41;
                    <Input
                        type="password"
                        name="pass_new_confirmation"
                        placeholder="新しいパスワード&#40;確認用&#41;"
                        value={formData.pass_new_confirmation}
                        onChange={handleChange}
                        isValid={formData.error_list.pass_new_confirmation}
                        autoComplete="new-password"
                    />
                </Label>
                <Alert>{formData.error_list.pass_new_confirmation}</Alert>
            </UserComponent>

            <Button value="変更する" isLoading={updatePassword.isLoading} />
        </Form>
    );
});
