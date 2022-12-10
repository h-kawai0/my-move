import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { theme } from "./theme/theme";
import { Router } from "./router/Router";

import { GlobalStyle } from "./theme/globalStyle";
import { AuthProvider } from "./hooks/AuthContext";

export const App = () => {
    const queryClient = new QueryClient();

    return (
        <>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        <BrowserRouter>
                            <ToastContainer />
                            <Router />
                        </BrowserRouter>
                    </ThemeProvider>
                </QueryClientProvider>
            </AuthProvider>
        </>
    );
};
