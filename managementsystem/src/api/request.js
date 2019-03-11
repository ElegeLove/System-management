/*
    axios企业级封装
*/ 
import axios from 'axios';
import qs from 'qs';

// 设置服务器基本路径
axios.defaults.baseURL = 'http://127.0.0.1:8888';

export default {
    get (url, params={}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(response => {
                    // 成功处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败处理
                    reject(err)
                })
        })
    },
    post (url, params={}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    // 成功处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败处理
                    reject(err)
                })
        })
    }
}