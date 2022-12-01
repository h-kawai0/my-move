import React, { ChangeEvent, memo, useState, VFC } from "react";
import styled from "styled-components";
import { space } from "../../../theme/setting/space";

// 型定義
type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    dbPic: string;
    role: string;
};

// 画像データ入力フォーム
export const InputPic: VFC<Props> = memo((props) => {
    // プロップス
    const { onChange, dbPic, role } = props;

    // 画像データ
    const [imageData, setImageData] = useState("");

    // 画像データ入力時処理
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
            return;
        }
        const file = e.target.files[0];
        if (file === null) {
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            const result: string = reader.result as string;
            setImageData(result);
        };

        onChange(e);
    };

    return (
        <>
            <SPic>
                {!imageData && dbPic && (
                    <img
                        src={`/storage/img/${role}/original/${dbPic}`}
                        alt={dbPic}
                    />
                )}
                {imageData && <img src={imageData} id="preview" />}
            </SPic>

            <input
                type="file"
                accept="image/png, image/jpeg"
                name="pic"
                onChange={onFileChange}
            />
        </>
    );
});

const SPic = styled.div`
    width: 200px;
    margin-bottom: ${space.l};
    margin-top: ${space.l};
`;
