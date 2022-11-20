import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
    VFC,
} from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import { Spinner } from "../components/atoms/spinner/Spinner";
import axios from "../libs/axios";

type AuthContextProps = {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    loginCheck: boolean;
    setLoginCheck: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    setIsAuth: () => {},
    isLoading: false,
    setIsLoading: () => {},
    loginCheck: true,
    setLoginCheck: () => {},
});

export const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [loginCheck, setLoginCheck] = useState(true);

    const getUser = () => {
        setIsLoading(true);
        setLoginCheck(true);
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                setIsAuth(true);
                setLoginCheck(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsAuth(false);
                setLoginCheck(false);
            });
    };

    useEffect(() => {
        console.log("ログイン確認中");

        (async () => {
            await getUser();
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isLoading,
                setIsLoading,
                loginCheck,
                setLoginCheck,
            }}
        >
            {!isLoading && !loginCheck ? (
                children
            ) : (
                <Spinner>
                    <ThreeDots
                        height={80}
                        width={80}
                        visible={true}
                        radius="9"
                        color="#4fa94d" 
                        ariaLabel="three-dots-loading"                    />
                </Spinner>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
