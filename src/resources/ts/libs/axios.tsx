import Axios from "axios";

const isProd = (process.env.APP_ENV === 'production' ? true : false);

const axios = Axios.create({
    baseURL: isProd ? 'http://my-move.jp/' : "http://localhost:8080",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
});

export default axios;
