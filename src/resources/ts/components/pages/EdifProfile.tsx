import React, {
    ChangeEvent,
    FormEvent,
    memo,
    useEffect,
    useState,
    VFC,
} from "react";
import { Oval } from "react-loader-spinner";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from "../../libs/axios";

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

export const EdifProfile: VFC = memo(() => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

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

    const [dbPic, setDbPic] = useState("");

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/api/user")
            .then((res) => {
                console.log("useEffect", res.data);
                setFormData({
                    ...formData,
                    // null合体演算子
                    name: res.data.name ?? "",
                    email: res.data.email ?? "",
                    profile: res.data.profile ?? "",
                });

                setDbPic(res.data.pic ?? "");
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        console.log(name, value);

        setFormData({ ...formData, [name]: value });
    };

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

        console.log(formData);
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsSending(true);
        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("profile", formData.profile);
        data.append("pic", formData.pic);

        console.log(formData.pic);

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("/mypage/update-profile", data)
                .then((res) => {
                    console.log(res.data);
                    history.push("/mypage");
                    toast.success("プロフィールを更新しました!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                })
                .catch((err) => {
                    console.log(err);

                    if (err.response.status === 422) {
                        const newFormData = {
                            ...formData,
                            error_list: err.response.data.errors,
                        };

                        setFormData(newFormData);

                        console.log("Send Error", err.response.data.errors);
                        setIsSending(false);
                    } else {
                        console.log("Send Error", err.response.data.errors);
                        setIsSending(false);
                        toast.error("プロフィールの更新に失敗しました。", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                        });
    
                    }
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
                <Form onSubmit={registerSubmit}>
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

                    <Button value="登録する" isLoading={isSending} />
                </Form>
            )}
        </>
    );
});
