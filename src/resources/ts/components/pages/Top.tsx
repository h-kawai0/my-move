import React, { memo, VFC } from "react";
import styled from "styled-components";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";

import topimg1 from "../../img/top/top-image1.jpg";
import topimg2 from "../../img/top/top-image2.jpg";

import topDatas from "../../data/top/data.json";
import { TopCard } from "../organisms/top/TopCard";
import { CatchContainer } from "../molecules/top/CatchContainer";

export const Top: VFC = memo(() => {
    return (
        <div>
            <SHero>
                <SContainer>
                    <SHeroCatch>
                        「人生の
                        <SHeroLine />
                        MyMove
                        <SHeroLine />
                        を共有しよう」
                    </SHeroCatch>
                </SContainer>
            </SHero>

            <CatchContainer
                title="「この順番でこんなことを学ぶ」"
                button="今すぐ始める"
            />

            <SAbout>
                <SAboutContainer>
                    <SAboutTitle>ABOUT</SAboutTitle>
                    <SAboutTitle>
                        MyMoveは「効率の良い学習順序」をみんなで共有するサービスです。
                    </SAboutTitle>

                    <p>
                        プログラミングや料理を学ぼうと思っても挫折してしまう。
                        挫折してしまう人のほとんどが「どうやって学習すればいいのか分からない」からです。
                        「何をどの順番でどこまで学べばいいのかわからない」
                        「もっと早くこの方法を知っていれば…」
                        MyMoveはそんな方たちのためんい効率の良い学習方法をみんなで共有し、学習を進めていけるサービスです。
                    </p>
                </SAboutContainer>
            </SAbout>

            <SMerit>
                <SMeritTitle>MyMoveの特徴</SMeritTitle>
                <SMeritContainer>
                    {topDatas.map((item) => (
                        <TopCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    ))}
                </SMeritContainer>
            </SMerit>

            <CatchContainer title="さっそく始めよう。" button="無料会員登録" />
        </div>
    );
});

const SHero = styled.section`
    background: url(${topimg1}) 0 0 no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 80px;
    &:after {
        padding-top: 77.26%;
        content: "";
        display: block;
    }
`;

const SContainer = styled.div`
    background: rgba(50, 50, 50, 0.5);
    padding: ${space.l};
    box-sizing: border-box;
`;

const SHeroCatch = styled.h1`
    font-size: ${fonts.size.xxxl};
    color: ${colors.font.fontColorSub};
    font-family: ${fonts.family.catch};
    text-align: center;
    ${breakPoint.sm`
        font-size: ${fonts.size.xl};
    `}
`;

const SHeroLine = styled.br`
    display: none;
    ${breakPoint.sm`
display: block;
`}
`;

const SAbout = styled.section`
    background: url(${topimg2}) 0 0 no-repeat;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${colors.font.fontColorSub()};
    ${breakPoint.sm`
    padding-left: ${space.m};
    padding-right: ${space.m};
    box-sizing: border-box;
`}
`;

const SAboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    padding: ${space.l};
    box-sizing: border-box;
    background: rgba(50, 50, 50, 0.5);
    ${breakPoint.sm`
    width: 100%;
    `}
`;

const SAboutTitle = styled.h1`
    font-size: ${fonts.size.xxl};
    margin-bottom: ${space.l};
    ${breakPoint.sm`
    font-size: ${fonts.size.xl};
    `}
`;

const SMerit = styled.section`
    padding: ${space.l};
    box-sizing: border-box;
`;

const SMeritTitle = styled.h2`
    text-align: center;
    font-size: ${space.xxl};
    margin-bottom: ${space.l};
`;

const SMeritContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -${space.l};
`;
