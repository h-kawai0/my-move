import React, { memo, VFC } from "react";
import styled from "styled-components";

import { breakPoint } from "../../theme/setting/breakPoint";
import { colors } from "../../theme/setting/colors";
import { fonts } from "../../theme/setting/fonts";
import { space } from "../../theme/setting/space";
import { SignUpButton } from "../atoms/button/BaseButton";

import topimg1 from "../../img/top/top-image1.jpg";
import topimg2 from "../../img/top/top-image2.jpg";
import topimg3 from "../../img/top/top-image3.jpg";
import topimg4 from "../../img/top/top-image4.jpg";
import topimg5 from "../../img/top/top-image5.jpg";

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

            <section>
                <SCatch>
                    <SCatchTitle>「この順番でこんなことを学ぶ」</SCatchTitle>
                    <SCatchButton>今すぐ始める</SCatchButton>
                </SCatch>
            </section>

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
                    <SMeritCard>
                        <div>
                            <SMeritImgframe>
                                <SMeritImg src={topimg3} alt="Mymoveの特徴1" />
                            </SMeritImgframe>

                            <SMeritTextBox>
                                <SMeritCardTitle>
                                    効率の良い学習方法を簡単に知る。
                                </SMeritCardTitle>
                                <SMeritCardOverView>
                                    学習で大変なことは調べる作業です。
                                    参考書をたくさん購入したり、ネットに溢れる情報を読み漁ったりと非常に時間がかかります。
                                    MyMoveでは、みんなが投稿した「この方法で上手く学習できた」投稿内容を見るだけで効率の良い学習方法を知ることができます。
                                </SMeritCardOverView>
                            </SMeritTextBox>
                        </div>
                    </SMeritCard>

                    <SMeritCard>
                        <div>
                            <SMeritImgframe>
                                <SMeritImg src={topimg4} alt="MyMoveの特徴2" />
                            </SMeritImgframe>

                            <SMeritTextBox>
                                <SMeritCardTitle>
                                    みんなが投稿したMyMoveにチャレンジしよう。
                                </SMeritCardTitle>
                                <SMeritCardOverView>
                                    みんながとうこうしたMyMoveを実際にチャレンジしてみましょう。
                                    ゲーム感覚でチャレンジすることができるため、スムーズに学習をすることができます。
                                </SMeritCardOverView>
                            </SMeritTextBox>
                        </div>
                    </SMeritCard>

                    <SMeritCard>
                        <div>
                            <SMeritImgframe>
                                <SMeritImg src={topimg5} alt="MyMoveの特徴3" />
                            </SMeritImgframe>

                            <SMeritTextBox>
                                <SMeritCardTitle>
                                    モチベーションを共有しよう。
                                </SMeritCardTitle>
                                <SMeritCardOverView>
                                    学習は継続することが大切です。
                                    一緒に頑張れる仲間がいれば格段に
                                    モチベーションを維持できます。
                                    TwitterでMyMoveを共有し、学習する仲間を見つけましょう。
                                </SMeritCardOverView>
                            </SMeritTextBox>
                        </div>
                    </SMeritCard>
                </SMeritContainer>
            </SMerit>

            <section>
                <SCatch className="p-catch">
                    <SCatchTitle className="p-catch__title">
                        さっそく始めよう。
                    </SCatchTitle>
                    <SCatchButton>無料会員登録</SCatchButton>
                </SCatch>
            </section>
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

const SCatch = styled.div`
    width: 100%;
    padding: ${space.m} ${space.xxl};
    box-sizing: border-box;
    margin-top: ${space.xxl};
    margin-bottom: ${space.xxl};
    text-align: center;
    ${breakPoint.sm`
        padding: ${space.m};
    `}
    ${breakPoint.md`
        padding: ${space.m};
    `}
`;

const SCatchTitle = styled.h1`
    text-align: center;
    font-size: ${fonts.size.xxxl};
    font-family: ${fonts.family.catch};
    margin-bottom: ${space.xl};
    ${breakPoint.sm`
    font-size: ${fonts.size.l};
    `}
    ${breakPoint.md`
    font-size: ${fonts.size.xl};
    `}
`;

const SCatchButton = styled(SignUpButton)`
    padding: ${space.m} ${space.xl};
    font-size: ${fonts.size.l};
    display: inline-block;
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

const SMeritCard = styled.div`
    width: calc(33.3% - ${space.l});
    margin-right: ${space.l};
    margin-bottom: ${space.xxl};
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background: ${colors.base.paletteTrueWhite};
    &:last-child {
        ${breakPoint.sm`
        margin-bottom: initial;
        `}
    }
    ${breakPoint.sm`
        width: 100%;
    `}
    ${breakPoint.md`
    width: 100%;
    `}
`;

const SMeritImgframe = styled.div`
    width: 100%;
    padding-top: 65%;
    position: relative;
    box-sizing: border-box;
`;

const SMeritImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
`;

const SMeritTextBox = styled.div`
    width: 100%;
    padding: ${space.xl} ${space.l};
    box-sizing: border-box;
    background: ${colors.base.paletteTrueWhite};
`;

const SMeritCardTitle = styled.h3`
    font-size: ${fonts.size.l};
    margin-bottom: ${space.l};
    font-weight: bold;
    line-height: 125%;
`;

const SMeritCardOverView = styled.p`
    font-size: ${fonts.size.s};
    line-height: 150%;
`;
