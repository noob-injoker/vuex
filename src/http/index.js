import axios from 'axios';
import nprogress from 'nprogress';
import {Message} from 'element-ui'

//运行环境：本地环境和线上环境（生产环境）
const isPro = process.env.NODE_ENV === 'production'

//创建一个axios的实例
const service = axios.create({
    //基础路径
    baseURL: isPro ? '线上的接口路径':'/api',
    //超时时间
    timeout:100000
})

//请求拦截：每一次发请求都会做的事情
service.interceptors.request.use((config) => {
    nprogress.start()
    //前后端鉴权
    //jwt:JSON WEB TOKEN（令牌）
    //登录成功之后后端会返回一个令牌
    let token = localStorage.getItem('token')
    if(token){
        //需要在请求当中添加token
        config.headers['Authorization'] = token
    }
    return config
},err => {
    nprogress.done()
    return Promise.reject(err)
})

//响应拦截：每一次接口返回数据的时候都会做的事情
service.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
},err => {
    if(err.response && err.response.status){
        //错误请求的状态码
        let status = err.response.status
        if(status === 400){
            Message.error('参数错误')
        }
        if(status === 401){
            Message.error('登录过期，请重新登录')
        }
        if(status === 403){
            Message.error('没有权限')
        }
        if(status === 404){
            Message.error('接口路径错误')
        }
        if(status === 500){
            Message.error('服务器出错')
        }
        if(status === 503){
            Message.error('服务器在维护')
        }
    }
    return Promise.reject(err)
})

export default service