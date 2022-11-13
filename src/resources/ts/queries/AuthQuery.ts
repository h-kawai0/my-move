import * as api from "../api/AuthApi";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";
import { useHistory, useLocation } from "react-router-dom";


const useUser = () => {
    return useQuery("users", api.getUser);
};

const useLogin = () => {

    const history = useHistory();
    const location = useLocation();

    const { setIsAuth } = useAuth();

    const { from } = location.state as { from: string} || {from: { pathname: '/' }};

    return useMutation(api.login, {
        onSuccess: (user) => {
            if (user) {
                setIsAuth(true);
            }
            console.log(user);
            toast.success("ログインしました!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            history.replace(from);
        },
        onError: () => {
            toast.error("ログインに失敗しました。", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 300
            });
        },
    });
};

const useLogOut = () => {
    const history = useHistory();
    const { setIsAuth } = useAuth();
    return useMutation(api.logout, {
        onSuccess: () => {
            setIsAuth(false);
            toast.success("ログアウトしました!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            history.push('/login');
        },
        onError: () => {
            toast.error("ログアウトに失敗しました。", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        },
    });
};

export { useUser, useLogin, useLogOut };
