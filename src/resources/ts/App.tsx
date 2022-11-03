import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { Layout } from "./components/templates/Layout";

import { GlobalStyle } from "./theme/globalStyle";
import { FlashMessageProvider } from "./providers/FlashMessageProvider";
import { AuthProvider } from "./hooks/AuthContext";

export const App = () => {
    const queryClient = new QueryClient();
    


    return (
        <>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <FlashMessageProvider>
                                <ThemeProvider theme={theme}>
                                    <GlobalStyle />
                                    <BrowserRouter>
                                        <Layout>
                                            <Router />
                                        </Layout>
                                    </BrowserRouter>
                                </ThemeProvider>
                    </FlashMessageProvider>
                </QueryClientProvider>
            </AuthProvider>
        </>
    );
};
