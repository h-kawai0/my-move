import * as api from "../api/AuthApi";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const useUser = () => {
    return useQuery("users", api.getUser);
};

// 会員登録処理
const useRegister = () => {
    const navigate = useNavigate();

    const { setIsAuth } = useAuth();

    return useMutation(api.register, {
        onSuccess: (data) => {

            console.log(data);
            toast.success("会員登録が完了しました!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            setIsAuth(true);
            navigate("/index");
        },
    });
};

// ログイン処理
const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setIsAuth } = useAuth();

    const { from } = location.state as { from: string} || {from: { pathname: '/' }};

    return useMutation(api.login, {
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            setIsAuth(true);
            navigate(from, { replace: true });
        },
    });
};

const useLogOut = () => {
    const navigate = useNavigate();
    const { setIsAuth, setIsLoading } = useAuth();

    return useMutation(api.logout, {
        onSuccess: () => {
            toast.success("ログアウトしました!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            navigate("/login");
            setIsAuth(false);
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
            toast.error("ログアウトに失敗しました。", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        },
    });
};

export { useUser, useRegister ,useLogin, useLogOut };
