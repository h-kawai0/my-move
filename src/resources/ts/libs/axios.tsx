import Axios from "axios";

const isProd = (process.env.MIX_APP_ENV === 'production' ? true : false);

console.log(process.env.MIX_APP_ENV, isProd);

const axios = Axios.create({
    baseURL: isProd ? 'https://my-move.jp' : "http://localhost:8080",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
});

export default axios;
