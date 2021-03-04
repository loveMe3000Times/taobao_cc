import axios from './index'

const DEFAULT_URL = "/user"

const userApi = {
    // 电话号码注册
    register: (data) => {
        return axios.post(DEFAULT_URL + '/register', data)
    },
    getCode: (data) => {
        return axios.post(DEFAULT_URL + '/getCode', data)
    },
    loginByPassword: (data) => {
        return axios.post(DEFAULT_URL + "/loginByPassword", data)
    },
    loginByPhone: (data) => {
        return axios.post(DEFAULT_URL + "/loginByPhone", data)
    }
}

export default userApi