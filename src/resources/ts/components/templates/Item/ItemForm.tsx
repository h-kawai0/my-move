import React, {
    VFC,
    memo,
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    useMemo,
    useRef,
} from "react";
import { Oval } from "react-loader-spinner";

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
import { Spinner } from "../../atoms/spinner/Spinner";
import {
    useGetCategories,
    useGetEditItem,
    useUpdateItem,
} from "../../../queries/ItemsQuery";

// 型定義
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

// 型定義
type Props = {
    title: string;
    method: string;
    pId?: string;
};

// MyMove登録・変更共通画面
export const ItemForm: VFC<Props> = memo((props) => {
    // 新規登録か更新を識別するためのプロップス
    const { title, method, pId } = props;

    // カテゴリーデータ取得処理
    const { data: getCategoriesData } = useGetCategories();

    // MyMove更新用データを取得
    const { data: getEditItemData, isLoading: getEditItemIsLoading } =
        useGetEditItem(pId);

    // MyMove更新処理
    const updateItem = useUpdateItem();

    // ボタン送信制御用
    const processing = useRef(false);

    // 入力データ
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

    //  DB保存済み管理フラグstate
    const [dbPic, setDbPic] = useState("");

    // カテゴリーリスト管理state
    const [categoryList, setCategoryList] = useState([
        {
            id: 0,
            name: "",
            created_at: "",
            updated_at: "",
        },
    ]);

    useEffect(() => {
        // 新規登録なら子MyMoveの入力フォームを5個にする
        if (!pId) {
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
    }, []);

    // MyMove更新用データを取得
    const resultItem = useMemo(() => {
        // 更新用データが存在する場合
        if (pId && getEditItemData) {
            // 取得データを変数に入れる
            let result = getEditItemData.parentItem;

            // 登録した子MyMoveが5未満なら不足分のフォームを生成
            if (result.child_items.length < 5) {
                [...Array(5 - result.child_items.length)].map((val, i) => {
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

                    result = {
                        ...result,
                        child_items: [...result.child_items, nextData],
                    };
                });
            }

            setFormData((prevState) => ({
                ...prevState,

                parent_name: result.name ?? "",
                category_id: result.category_id ?? "",
                parent_cleartime: result.cleartime ?? "",
                parent_detail: result.detail ?? "",
                child_item: result.child_items.map((el: any, i: number) => ({
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
        }
    }, [getEditItemData]);

    // カテゴリー一覧を取得
    const resultCategories = useMemo(() => {
        if (getCategoriesData) {
            setCategoryList(getCategoriesData.categories);
        }
    }, [getCategoriesData]);

    // フォーム入力内容をstateに詰める
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        // フォーム入力内容を変数に代入
        const { name, value } = e.target;

        // 入力項目が子MyMoveの場合
        if (index !== undefined) {
            // 入力項目を変数に詰める
            let data = formData.child_item.map((val) => {
                if (val.index === index) {
                    return Object.assign({}, val, {
                        [name]: value,
                    });
                }
                return val;
            });

            // 子MyMoveの内容をstateに詰める
            setFormData((prevstate) => ({
                ...prevstate,
                child_item: data,
            }));
        } else {
            // 子MyMove以外の項目
            setFormData({ ...formData, [name]: value });
        }
    };

    // 画像データ入力処理
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

    // カテゴリー内容選択処理
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            category_id: e.target.value,
        });
    };

    // 新規登録・編集処理
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 画面遷移防止
        e.preventDefault();

                // 処理中ならボタンを連打できないようにする
                if (processing.current) return;

                processing.current = true;
        
        

        // 入力内容を変数に詰める
        const data = {
            parent_name: formData.parent_name,
            category_id: formData.category_id,
            parent_cleartime: formData.parent_cleartime,
            parent_detail: formData.parent_detail,
            pic: formData.pic,
            method: method,
            child_item: formData.child_item,
        };

        axios.get("/sanctum/csrf-cookie").then(() => {
            updateItem.mutate(data, {
                onError: (err: any) => {
                    // 入力内容に不備がある場合
                    if (err.response.status === 422) {
                        // エラー内容を変数に詰める
                        let errData = err.response.data.errors;

                        // エラー箇所のプロパティを配列にする
                        let keyArray = Object.keys(err.response.data.errors);

                        const errorList = {
                            name: "",
                            cleartime: "",
                            detail: "",
                        };

                        // エラー箇所を展開
                        keyArray.map((val) => {
                            // エラー箇所のオブジェクト名を取り出す
                            let key = parseInt(val.substring(11, 12));

                            // プロパティ名を取り出す
                            let str = val.substring(13);

                            // 該当する子MyMoveのエラー箇所をstateに詰める
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

                        console.log("Send Error", err.response.data.errors);
                        processing.current = false;

                    } else {
                        console.log("Send Error", err.response.data.errors);
                        processing.current = false;

                    }
                },
            });
        });
    };

    return (
        <>
            {getEditItemIsLoading ? (
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
                        <Sup>
                            &#8251;3桁まで&#40;小数点第一位まで&#41;入力可能。
                        </Sup>
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
                                        onChange={(e) =>
                                            handleChange(e, val.index)
                                        }
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
                                        onChange={(e) =>
                                            handleChange(e, val.index)
                                        }
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
                                        onChange={(e) =>
                                            handleChange(e, val.index)
                                        }
                                    />
                                </Label>
                                <Alert>{val.error_list.detail}</Alert>
                            </UserComponent>
                        </div>
                    ))}
                    <Button value="登録する" isLoading={updateItem.isLoading} />
                </Form>
            )}
        </>
    );
});
