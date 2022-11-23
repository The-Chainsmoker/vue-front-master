import axios from "axios";
import { baseURL } from "./baseUrl";
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : baseURL,
    timeout: 600000,
    headers: {
        'content-type': 'application/json'
    }
})

//请求拦截
service.interceptors.request.use((config) => {
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    console.log(err);

})

export default service