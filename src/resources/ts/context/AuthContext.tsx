import axios from "../libs/axios";
import React, {
    useContext,
    createContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { Route, Redirect } from "react-router-dom";
import { useFlash } from "../hooks/useFlash";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    pic: string;
    profile: string;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string | null;
};
type LoginData = {
    email: string;
    password: string;
};
type RegisterData = {
    email: string;
    password: string;
    password_confirmation: string;
};
type ProfileData = {
    name?: string;
    email?: string;
};
type authProps = {
    user: User | null;
    register: (registerData: RegisterData) => Promise<void>;
    signin: (loginData: LoginData) => Promise<void>;
    signout: () => Promise<void>;
    saveProfile: (formData: FormData | ProfileData) => Promise<void>;
    isLoading: boolean;
};
type Props = {
    children: ReactNode;
};
type RouteProps = {
    children: ReactNode;
    path: string;
    exact?: boolean;
};
type From = {
    from: Location;
};

const authContext = createContext<authProps | null>(null);

const ProvideAuth = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
export default ProvideAuth;

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { handleFlashMessage } = useFlash();

    const register = (registerData: RegisterData) => {
        return axios.post("/api/register", registerData).then((res) => {
            axios.get("api/user").then((res) => {
                setUser(res.data);
            });
        });
    };

    const signin = async (loginData: LoginData) => {
        try {
            const res = await axios.post("/login", loginData);

            console.log(res.data.message);

            handleFlashMessage(res.data.message);
            
        } catch (error) {
            throw error;
        }

        return axios
            .get("/api/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                setUser(null);
            });
    };

    const signout = () => {
        return axios.post("/api/logout", {}).then(() => {
            setUser(null);
            handleFlashMessage('ログアウトしました。');
        });
    };

    const saveProfile = async (formData: FormData | ProfileData) => {
        const res = await axios
            .post("/api/user/profile-information", formData, {
                headers: { "X-HTTP-Method-Override": "PUT" },
            })
            .catch((error) => {
                throw error;
            });
        if (res?.status == 200) {
            return axios
                .get("/api/user")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    setUser(null);
                });
        }
    };

    useEffect(() => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log('useEffect',res.data);
                setUser(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setUser(null);
                setIsLoading(false);
            });
    }, []);

    return {
        user,
        isLoading,
        register,
        signin,
        signout,
        saveProfile,
    };
};

/**
 * 認証済みのみアクセス可能
 */
export const PrivateRoute = ({ children, path, exact = false }: RouteProps) => {
    const auth = useAuth();
    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) => {
                if (auth?.user == null) {
                    // console.log("private true", auth?.isLoading);
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    );
                } else {
                    // console.log("private false");
                    return children;
                }
            }}
        />
    );
};

/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const PublicRoute = ({ children, path, exact = false }: RouteProps) => {
    const auth = useAuth();
    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) => {
                if (auth?.user == null) {

                    // console.log("public true", auth?.user);
                    return children;
                } else {
                    // console.log("public false");
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
