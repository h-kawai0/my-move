import React, { VFC, memo } from "react";
import { Alert } from "../../atoms/inputForm/Alert";
import { Input } from "../../atoms/inputForm/Input";
import { InputTextArea } from "../../atoms/inputForm/InputTextArea";
import { Label } from "../../atoms/inputForm/Label";
import { Notes } from "../../atoms/inputForm/Notes";
import { Number } from "../../atoms/inputForm/Number";
import { Sup } from "../../atoms/inputForm/Sup";
import { UserComponent } from "../../molecules/inputForm/UserComponent";

export const ChildItems = memo((props) => {
  const {children} = props;
    return (
        <>
            <UserComponent>
                <Label>
                    MyMoveのタイトル
                    <Notes>
                        &#8251;
                        {/* {i === 0 ? "必須" : "任意"} */}
                    </Notes>
                    <Input
                        type="text"
                        name={`child_item`}
                        placeholder={`MyMoveのタイトル`}
                        value=""
                        onChange={() => alert()}
                        isValid=""
                    />
                </Label>
                <Alert>hoge</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    MyMoveの目安達成時間
                    <Notes>
                        &#8251;
                        {/* {i === 0 ? "必須" : "任意"} */}
                    </Notes>
                    <Number
                        name={`child_itemcleartime`}
                        value=''
                        isValid="hoge"
                        onChange={() => alert()}
                    />
                </Label>
                <Sup>&#8251;3桁まで&#40;小数点第一位まで&#41;入力可能。</Sup>
                <Alert>hoge</Alert>
            </UserComponent>

            <UserComponent>
                <Label>
                    MyMoveの説明
                    <Notes>
                        &#8251;
                        {/* {i === 0 ? "必須" : "任意"} */}
                    </Notes>
                    <InputTextArea
                        value=""
                        name={`child_itemdetail`}
                        isValid=""
                        onChange={() => alert()}
                    />
                </Label>
                <Alert>hoge</Alert>
            </UserComponent>
        </>
    );
});
