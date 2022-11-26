import React, { memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { useLogOut } from "../../../queries/AuthQuery";

import { useAuth } from "../../../hooks/AuthContext";

import { breakPoint } from "../../../theme/setting/breakPoint";
import { colors } from "../../../theme/setting/colors";
import { fonts } from "../../../theme/setting/fonts";
import { space } from "../../../theme/setting/space";
import { Spinner } from "../../atoms/spinner/Spinner";
import { Oval } from "react-loader-spinner";

export const Header: VFC = memo(() => {
    const logOut = useLogOut();
    const { isAuth, isLoading, setIsLoading } = useAuth();

    const [isActive, setIsActive] = useState(false);

    const handleLogOut = () => {
        setIsLoading(true);
        logOut.mutate();
    };

    const naviOpen = () => {
        setIsActive((prevState) => !prevState);
    };

    const loggedIn = (
        <>
            <SItem>
                <SLink to="/index">MyMove一覧</SLink>
            </SItem>

            <SItem>
                <SLink to="/items/new">MyMove投稿</SLink>
            </SItem>
            <SItem>
                <SLink to="/mypage">マイページ</SLink>
            </SItem>
            <SItem>
                <SLink as="span" onClick={handleLogOut}>
                    ログアウト
                </SLink>
            </SItem>
        </>
    );

    const notLoggedIn = (
        <>
            <SItem>
                <SLink to="/index">MyMove一覧</SLink>
            </SItem>
            <SItem>
                <SLink to="/login">ログイン</SLink>
            </SItem>
            <SItem>
                <SLink to="/register">無料会員登録</SLink>
            </SItem>
        </>
    );

    return (
        <SHeader>
            <Link to="/">
                <STitle>MyMove</STitle>
            </Link>

            <SHamburger onClick={naviOpen}>
                <SHamburgerLine
                    className={isActive ? "active" : ""}
                ></SHamburgerLine>
                <SHamburgerLine
                    className={isActive ? "active" : ""}
                ></SHamburgerLine>
                <SHamburgerLine
                    className={isActive ? "active" : ""}
                ></SHamburgerLine>
            </SHamburger>

            <SNav className={isActive ? "active" : ""}>
                <SList>
                    {isLoading ? (
                        <Spinner>
                            <Oval
                                height={50}
                                width={50}
                                color="#555"
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#555"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </Spinner>
                    ) : isAuth ? (
                        loggedIn
                    ) : (
                        notLoggedIn
                    )}
                </SList>
            </SNav>
        </SHeader>
    );
});

const SHeader = styled.header`
    width: 100%;
    height: 80px;
    position: fixed;
    box-sizing: border-box;
    padding-left: ${space.xl};
    padding-right: ${space.xl};
    ${breakPoint.sm`
        padding-left: ${space.l};
        padding-right: ${space.l};
    `}

    box-sizing: border-box;
    background: ${colors.base.paletteSunnyGray};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const STitle = styled.h1`
    font-size: ${fonts.size.xxxl};
    font-family: ${fonts.family.logo};
`;

const SHamburger = styled.div`
    transition: all 0.4s;
    box-sizing: border-box;
    position: relative;
    width: 40px;
    height: 32px;
    z-index: 3;
    display: none;

    ${breakPoint.sm`
        display: inline-block;
    `}
`;

const SHamburgerLine = styled.span`
    display: inline-block;
    transition: all 0.4s;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${colors.base.paletteDimGray};
    border-radius: 4px;
    &:nth-of-type(1) {
        top: 0;
    }
    &:nth-of-type(2) {
        top: 14px;
    }
    &:nth-of-type(3) {
        bottom: 0;
    }
    &.active {
        &:nth-of-type(1) {
            transform: translateY(15px) rotate(-45deg);
        }
        &:nth-of-type(2) {
            opacity: 0;
        }
        &:nth-of-type(3) {
            transform: translateY(-13px) rotate(45deg);
        }
    }
`;

const SNav = styled.nav`
    ${breakPoint.sm`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    right: -100%;
    background: ${colors.base.paletteDimGray};
    box-sizing: border-box;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    transition: 0.5s;
    z-index:3;
    `}
    &.active {
        transform: translateX(-100%);
        z-index: 2;
    }
`;

const SList = styled.ul`
    display: flex;
    align-items: center;
    font-size: ${fonts.size.default};

    ${breakPoint.sm`
    display: block;
    font-size: ${fonts.size.xxl};
    text-align: center;
    `}

    ${breakPoint.md`
    font-size: ${fonts.size.m};
    `}
`;

const SItem = styled.li`
    margin-right: ${space.m};
    &:last-child {
        margin-right: initial;
    }
    ${breakPoint.sm`
        margin-right: initial;
        margin-bottom: ${space.xl};
    `}
    ${breakPoint.md`
    margin-right: ${space.s};
    `};
`;

const SLink = styled(Link)`
    font-weight: bold;
    display: block;
    padding: ${space.m};
    transition: 0.4s;
    cursor: pointer;

    ${breakPoint.sm`
        color: ${colors.font.fontColorSub()}
    `};

    &:hover {
        color: ${colors.base.paletteGambogeOrange};
        transition: 0.4s;
    }
`;
