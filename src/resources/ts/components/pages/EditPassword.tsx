import React, { VFC, memo, useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router";
import { useFlash } from "../../hooks/useFlash";
import axios from "../../libs/axios";
import { Alert } from "../atoms/inputForm/Alert";
import { Button } from "../atoms/inputForm/Button";
import { Input } from "../atoms/inputForm/Input";
import { Label } from "../atoms/inputForm/Label";
import { Title } from "../atoms/inputForm/Title";
import { UserComponent } from "../molecules/inputForm/UserComponent";
import { Form } from "../organisms/inputForm/Form";

export const EditPassword: VFC = memo(() => {
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const { handleFlashMessage } = useFlash();

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const data = {
            pass_old: formData.pass_old,
            pass_new: formData.pass_new,
            pass_new_confirmation: formData.pass_new_confirmation,
        };

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("/mypage/update-password", data)
                .then((res) => {
                    console.log(res.data);
                    history.push("/");
                    handleFlashMessage(res.data.message);
                })
                .catch((err) => {
                    console.log(err);

                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);

                        console.log("SendError", err.response.data.errors);
                        setIsLoading(false);
                    } else {
                        console.log("Send Error", err.response.data.errors);
                        setIsLoading(false);
                    }
                });
        });
    };

    return (
        <Form onSubmit={registerSubmit}>
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

            <Button value="変更する" isLoading={isLoading} />
        </Form>
    );
});
