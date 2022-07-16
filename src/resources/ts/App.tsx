import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { Layout } from "./components/templates/Layout";

import { GlobalStyle } from "./theme/globalStyle";
import ProvideAuth from "./context/AuthContext";

export const App = () => {
    return (
        <>
            <ProvideAuth>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Layout>
                            <Router />
                        </Layout>
                    </BrowserRouter>
                </ThemeProvider>
            </ProvideAuth>
        </>
    );
};
