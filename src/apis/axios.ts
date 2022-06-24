import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { UserStore } from '../stores/user'
// 全局配置
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
    (config) => {
        const common = { Authorization: '' }
        const user = UserStore() // 获取用户状态仓库
        if (user.getToken) {
            common.Authorization = 'Bearer ' + user.getToken
        }
        if (config?.headers) {
            config.headers.Authorization = common.Authorization
        }
        return config
    },
    (error) => {
        // 请求失败的处理
        return Promise.reject(error)
    }
)
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response
    },
    (error) => {
        // 处理响应失败
        return Promise.reject(error?.response?.data ?? {})
    }
)
// 封装基础传输控件
export default {
    get: <T, D extends object | null | undefined | string> (url: string, params: D): Promise<T> => axios.get(url, { params }).then(response => response?.data ?? null),
    download: <T, D extends object | null | undefined | string>(url: string, params: D): Promise<T> => axios.get(url, { params, responseType: 'blob' }).then(response => response?.data ?? null),
    post: <T, D extends object | null | undefined | string>(url: string, data : D, config : AxiosRequestConfig = {}) : Promise<T> => axios.post(url, data, config).then(response => response?.data ?? null), // 上传文件用这个！！！！！ data用 FormData包裹即可
    put: <T, D extends object | null | undefined | string>(url: string, data : D, config : AxiosRequestConfig = {}) : Promise<T> => axios.put(url, data, config).then(response => response?.data ?? null),
    delete: <T, D extends object | null | undefined | string> (url: string, params: D): Promise<T> => axios.delete(url, { params }).then(response => response?.data ?? null),
    postForm <T> (url : string, data: object, config: AxiosRequestConfig = {}): Promise<T> {
        config.url = url
        config.method = 'POST'
        config.data = qs.stringify(data)
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        return axios(config).then(response => response?.data ?? null)
    }
}
