import React, {
    VFC,
    memo,
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
} from "react";

import { Alert } from "../../atoms/inputForm/Alert";
import { Button } from "../../atoms/inputForm/Button";
import { Input } from "../../atoms/inputForm/Input";
import { InputPic } from "../../atoms/inputForm/InputPic";
import { InputTextArea } from "../../atoms/inputForm/InputTextArea";
import { Label } from "../../atoms/inputForm/Label";
import { Notes } from "../../atoms/inputForm/Notes";
import { Number } from "../../atoms/inputForm/Number";
import { Sup } from "../../atoms/inputForm/Sup";
import { Title } from "../../atoms/inputForm/Title";
import { UserComponent } from "../../molecules/inputForm/UserComponent";
import { Form } from "../../organisms/inputForm/Form";
import axios from "../../../libs/axios";
import { SelectBox } from "../../molecules/inputForm/SelectBox";
import { CategoryList } from "../../atoms/inputForm/CategoryList";
import { useHistory } from "react-router";
import { useFlash } from "../../../hooks/useFlash";
import { Item } from "../../../types/api/item";

type Form = {
    parent_name: string;
    category_id: string;
    parent_cleartime: string;
    parent_detail: string;
    pic: File | string;
    child_item: {
        index: number;
        id?: number;
        name: string;
        cleartime: string;
        detail: string;
        parent_item_id: string;
        error_list: {
            name: string;
            cleartime: string;
            detail: string;
        };
    }[];
    error_list: {
        parent_name: string;
        category_id: string;
        parent_cleartime: string;
        parent_detail: string;
        pic: string;
    };
};

type Props = {
    title: string;
    method: string;
    pId?: string;
};

export const ItemForm: VFC<Props> = memo((props) => {
    const { title, method, pId } = props;

    const history = useHistory();

    const { handleFlashMessage } = useFlash();

    const [formData, setFormData] = useState<Form>({
        parent_name: "",
        category_id: "",
        parent_cleartime: "",
        parent_detail: "",
        pic: "",
        child_item: [
            {
                index: 0,
                id: 0,
                name: "",
                cleartime: "",
                detail: "",
                parent_item_id: "",
                error_list: {
                    name: "",
                    cleartime: "",
                    detail: "",
                },
            },
        ],
        error_list: {
            parent_name: "",
            category_id: "",
            parent_cleartime: "",
            parent_detail: "",
            pic: "",
        },
    });

    const [dbPic, setDbPic] = useState("");

    const [categoryList, setCategoryList] = useState([
        {
            id: 0,
            name: "",
            created_at: "",
            updated_at: "",
        },
    ]);

    useEffect(() => {
        if (pId) {
            axios
                .get<Item>(`${method}/edit`)
                .then((res) => {
                    console.log(res.data.parentItem);

                    let result = res.data.parentItem;

                    if (result.child_items.length < 5) {
                        [...Array(5 - result.child_items.length)].map(
                            (val, i) => {
                                let nextData = {
                                    index: i,
                                    id: i,
                                    name: "",
                                    cleartime: "",
                                    detail: "",
                                    parent_item_id: "",
                                    error_list: {
                                        name: "",
                                        cleartime: "",
                                        detail: "",
                                    },
                                };

                                console.log(nextData);

                                result = {
                                    ...result,
                                    child_items: [
                                        ...result.child_items,
                                        nextData,
                                    ],
                                };
                            }
                        );
                    }

                    setFormData((prevState) => ({
                        ...prevState,

                        parent_name: result.name ?? "",
                        category_id: result.category_id ?? "",
                        parent_cleartime: result.cleartime ?? "",
                        parent_detail: result.detail ?? "",
                        child_item: result.child_items.map((el, i) => ({
                            index: i,
                            id: el.id,
                            name: el.name,
                            cleartime: el.cleartime,
                            detail: el.detail,
                            parent_item_id: el.parent_item_id,
                            error_list: {
                                name: "",
                                cleartime: "",
                                detail: "",
                            },
                        })),
                    }));
                    setDbPic(result.pic ?? "");
                })
                .catch((err) => {
                    console.log(err.response.data.errors);
                });
        } else {
            [...Array(4)].map((val, i) => {
                let nextData = {
                    index: i + 1,
                    name: "",
                    cleartime: "",
                    detail: "",
                    parent_item_id: "",
                    error_list: {
                        name: "",
                        cleartime: "",
                        detail: "",
                    },
                };

                setFormData((prevstate) => ({
                    ...prevstate,
                    child_item: [...prevstate.child_item, nextData],
                }));
            });
        }

        axios
            .get("/items/categories")
            .then((res) => {
                console.log(res.data);

                setCategoryList(res.data.categories);
            })
            .catch((err) => {
                console.log(err.response.data.errors);
            });
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const { name, value } = e.target;

        if (index !== undefined) {
            let data = formData.child_item.map((val) => {
                if (val.index === index) {
                    return Object.assign({}, val, {
                        [name]: value,
                    });
                }
                return val;
            });

            setFormData((prevstate) => ({
                ...prevstate,
                child_item: data,
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            category_id: e.target.value,
        });
    };

    const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        const data = new FormData();

        data.append("parent_name", formData.parent_name);
        data.append("category_id", formData.category_id);
        data.append("parent_cleartime", formData.parent_cleartime);
        data.append("parent_detail", formData.parent_detail);
        data.append("pic", formData.pic);

        formData.child_item.forEach((item) => {
            data.append("child_item[]", JSON.stringify(item));
        });

        console.log(data.getAll("child_item[]"));

        pId ? pId : "";

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post(method, data)
                .then((res) => {
                    console.log(res.data);
                    history.push("/");
                    handleFlashMessage(res.data.message);
                })
                .catch((err) => {
                    console.log(err);

                    if (err.response.status === 422) {
                        let errData = err.response.data.errors;
                        let keyArray = Object.keys(err.response.data.errors);

                        const errorList = {
                            name: "",
                            cleartime: "",
                            detail: "",
                        };

                        keyArray.map((val) => {
                            let key = parseInt(val.substring(11, 12));
                            let str = val.substring(13);

                            if (val.includes("child_item")) {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    child_item: prevState.child_item.map((el) =>
                                        el.index === key
                                            ? {
                                                  ...el,
                                                  error_list: {
                                                      ...el.error_list,
                                                      [str]: errData[val],
                                                  },
                                              }
                                            : el
                                    ),
                                }));
                            } else {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    child_item: prevState.child_item.map(
                                        (el, i) =>
                                            el.id === i
                                                ? {
                                                      ...el,
                                                      error_list: errorList,
                                                  }
                                                : el
                                    ),
                                }));
                            }
                        });

                        setFormData((prevState) => ({
                            ...prevState,
                            error_list: err.response.data.errors,
                        }));

                        console.log(formData);

                        console.log("Send Error", err.response.data.errors);
                    } else {
                        console.log("Send Error", err.response.data.errors);
                    }
                });
        });
    };

    return (
        <Form onSubmit={registerSubmit}>
            <Title>{title}</Title>

            <UserComponent>
                <Label>
                    タイトル
                    <Notes>&#8251;必須</Notes>
                    <Input
                        type="text"
                        name="parent_name"
                        placeholder="タイトル"
                        value={formData.parent_name}
                        onChange={handleChange}
                        isValid={formData.error_list.parent_name}
                        autoFocus
                    />
                </Label>
                <Alert>{formData.error_list.parent_name}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    カテゴリー
                    <Notes>&#8251;必須</Notes>
                    <SelectBox>
                        <CategoryList
                            name="category_id"
                            category_id={formData.category_id}
                            onChange={handleSelect}
                            categoryList={categoryList}
                            isValid={formData.error_list.category_id}
                        />
                    </SelectBox>
                </Label>
                <Alert>{formData.error_list.category_id}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    目安達成時間
                    <Notes>&#8251;必須</Notes>
                    <Number
                        name="parent_cleartime"
                        value={formData.parent_cleartime}
                        isValid={formData.error_list.parent_cleartime}
                        onChange={handleChange}
                    />
                </Label>
                <Sup>&#8251;3桁まで&#40;小数点第一位まで&#41;入力可能。</Sup>
                <Alert>{formData.error_list.parent_cleartime}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    タイトルの説明
                    <Notes>&#8251;必須</Notes>
                    <InputTextArea
                        value={formData.parent_detail}
                        name="parent_detail"
                        isValid={formData.error_list.parent_detail}
                        onChange={handleChange}
                    />
                </Label>
                <Alert>{formData.error_list.parent_detail}</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    画像
                    <Notes>&#8251;任意</Notes>
                    <InputPic
                        onChange={handlePicChange}
                        dbPic={dbPic}
                        role="items"
                    />
                </Label>
                <Alert>{formData.error_list.pic}</Alert>
            </UserComponent>

            {/*  mapで生成 */}
            {formData.child_item.map((val, i) => (
                <div key={val.index}>
                    <UserComponent>
                        <Label>
                            MyMove{i + 1}のタイトル
                            <Notes>
                                &#8251;
                                {i === 0 ? "必須" : "任意"}
                            </Notes>
                            <Input
                                type="text"
                                name={`name`}
                                placeholder={`MyMove${i + 1}のタイトル`}
                                value={val.name}
                                onChange={(e) => handleChange(e, val.index)}
                                isValid={val.error_list.name}
                            />
                        </Label>
                        <Alert>{val.error_list.name}</Alert>
                    </UserComponent>

                    <UserComponent>
                        <Label>
                            MyMove{i + 1}の目安達成時間
                            <Notes>
                                &#8251;
                                {i === 0 ? "必須" : "任意"}
                            </Notes>
                            <Number
                                name={`cleartime`}
                                value={val.cleartime}
                                isValid={val.error_list.cleartime}
                                onChange={(e) => handleChange(e, val.index)}
                            />
                        </Label>
                        <Sup>
                            &#8251;3桁まで&#40;小数点第一位まで&#41;入力可能。
                        </Sup>
                        <Alert>{val.error_list.cleartime}</Alert>
                    </UserComponent>

                    <UserComponent>
                        <Label>
                            MyMove{i + 1}の説明
                            <Notes>
                                &#8251;
                                {i === 0 ? "必須" : "任意"}
                            </Notes>
                            <InputTextArea
                                value={val.detail}
                                name={`detail`}
                                isValid={val.error_list.detail}
                                onChange={(e) => handleChange(e, val.index)}
                            />
                        </Label>
                        <Alert>{val.error_list.detail}</Alert>
                    </UserComponent>
                </div>
            ))}
            <Button value="登録する" isLoading={false} />
        </Form>
    );
});
