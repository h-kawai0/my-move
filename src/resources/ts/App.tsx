import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { Layout } from "./components/templates/Layout";

import { GlobalStyle } from "./theme/globalStyle";
import ProvideAuth, { useAuth } from "./context/AuthContext";
import { FlashMessageProvider } from "./providers/FlashMessageProvider";

export const App = () => {
    const auth = useAuth();

    return (
        <>
            <FlashMessageProvider>
                <ProvideAuth>
                    {!auth?.isLoading && (
                        <ThemeProvider theme={theme}>
                            <GlobalStyle />
                            <BrowserRouter>
                                <Layout>
                                    <Router />
                                </Layout>
                            </BrowserRouter>
                        </ThemeProvider>
                    )}
                </ProvideAuth>
            </FlashMessageProvider>
        </>
    );
};
