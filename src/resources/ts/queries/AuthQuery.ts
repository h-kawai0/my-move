import * as api from "../api/AuthApi";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// ユーザー情報取得
const useUser = () => {
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();
    return useQuery({
        queryKey: ["users"],
        queryFn: api.getUser,
        onError: (e) => {
            console.log(e);
            toast.error("エラーが発生しました。ログインし直してください。", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            setIsAuth(false);
            navigate("/login");
        },
        retry: false,
    });
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

    const { from } = (location.state as { from: string }) || {
        from: { pathname: "/" },
    };

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

// ログアウト処理
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

// パスワードリセットリクエスト処理
const useForgotPassword = () => {
    return useMutation(api.forgotPassword, {
        onSuccess: (data) => {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        },
    });
};

// パスワードリセット処理
const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation(api.resetPassword, {
        onSuccess: (data) => {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            // パスワードがリセットできたらログイン画面に遷移させる
            navigate("/login");
        },
    });
};

// プロフィール情報更新処理
const useUpdateProfile = () => {
    const navigate = useNavigate();
    return useMutation(api.updateProfile, {
        onSuccess: (data) => {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            navigate(`/mypage`);
        },
    });
};

// パスワード更新処理
const useUpdatePassword = () => {
    const navigate = useNavigate();
    return useMutation(api.updatePassword, {
        onSuccess: (data) => {
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            navigate(`/mypage`);
        },
    });
};

export {
    useUser,
    useRegister,
    useLogin,
    useLogOut,
    useForgotPassword,
    useResetPassword,
    useUpdateProfile,
    useUpdatePassword,
};
