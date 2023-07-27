import qs from 'qs'
// 同时支持promise和普通回掉函数的写法，防止重复，防重
(function ($) {
    /**
     * 阻止ajax重复提交，guid异步请求唯一标示符(如果config中有serialId字段则使用，否则使用url加)
     * @param  {JSON object} config 等同ajax中的config参数
     * @return {[type]}          [description]
     */
    $.oneAjax = function (config) {
        if (!config.url) {
            throw new Error('提交的url不能为空')
        }
        let guid = config.serialId
        if (!guid) {
            let { url, data } = config
            let params = qs.stringify(data)
            guid = url + (typeof params === 'string' ? params : '')
        }
        if ($.oneAjax[guid] === true) {
            return new Promise(function (resolve, reject) {
                resolve({ code: 'serial-request', msg: '当前请求正在提交中，待请求返回后方可再次提交' })
            })
        }
        $.oneAjax[guid] = true
        return $.ajax(config).always(function () {
            delete $.oneAjax[guid]
        })
    }
})(jQuery)
// 防重，防止重复提交axios
const http = {
    // 防止重复提交
    blockRequest: function (config) {
        if (!config.url) {
            throw new Error('提交的url不能为空')
        }
        let guid = config.serialId
        if (!guid) {
            let { url, params } = config
            // console.log(params)
            params = qs.stringify(params)
            guid = url + (typeof params === 'string' ? params : '')
        }
        if (this.blockRequest[guid]) {
            // 正在提交中
            return new Promise((resolve, reject) => {
                resolve({ code: 'serial-request', msg: '当前请求正在提交中，待请求返回后方可再次提交' })
            })
        }
        this.blockRequest[guid] = true
        // let self = this
        return axios.request(config).finally(() => {
            // 请求结束重置请求，以允许用户再次提交
            // console.log('数据已经返回，重置请求状态标识符')
            this.blockRequest[guid] = false
        })
    }
}


import axios from 'axios'
import type { AxiosRequestConfigPlus, RawAxiosRequestHeaders } from 'axios'
import env from '../../build/env.js'
// import { genCommonMessageOptions } from '@/utils/consts/config.js'
import { getToken, logoutClear } from '@/utils/auth.js'
import {
    Message
} from 'element-ui'
// import router from '../router'

const requestLocker = new Map()
// 鉴权失效需要跳登录页http状态码
const authStatusCodes = [401, 403]

// create an axios instance
function getAxiosInstance (config) {
    const headers = {
        'Content-Type': 'application/json'
    }
    const service = axios.create({
        baseURL: config.BASE_API || env[process.env.NODE_ENV].BASE_API, // api 的 base_url
        timeout: 30000, // request timeout,
        headers
    })

    // request interceptor
    // 添加token，老版本接口请求体的data数据全部要系列化
    service.interceptors.request.use(
        config => {
            config.headers.Authorization = getToken()
            // config.withCredentials = true
            config.data = JSON.stringify(config.data)
            return config
        },
        error => {
            // Do something with request error
            // console.log('service.interceptors.request error', error) // for debug
            Promise.reject(error)
        }
    )

    // response interceptor
    // 统一token失效处理，以及公共错误处理。
    service.interceptors.response.use(
        // response => response,
        /**
         * 根据状态码定义特殊提示
         */
        response => {
            // 如果是老调研家接口直接返回response，为了兼容老调研家api，如果v1Api方法被废弃则不需要再兼容
            if (config.v1Api) {
                return response
            }

            const { data } = response
            const { code, message } = data
            if (code === 200) {
                // 兼容老接口，老接口可能会返回result字段, 后续会统一返回data，目前是为了兼容老接口
                return data?.result ?? data
            } else {
                // 默认不显示统一错误处理
                if (!config.hideError) Message.warning({
                    message,
                    showClose: true
                })
                return Promise.reject(message)
            }
        },
        res => {
            const status = res?.response?.status
            let tipMsg
            if (authStatusCodes.indexOf(status) !== -1) {
                tipMsg = res?.response?.data?.message ?? '登录信息过期，请重新登陆'
                logoutClear()
                location.href = 'cem/login'
            } else {
                tipMsg = res?.response?.data?.message ?? '发生了一个网络错误'
            }
            // 默认不显示统一错误处理
            if (!config.hideError) Message.warning({
                message: tipMsg,
                showClose: true
            })
            return Promise.reject(tipMsg)
        }
    )

    return service
}

/**
 * 封装Axios
 * 1. 同一个url且参数也相同，则必须等到请求返回结果后才能提交，其他请求不受影响
 * 2. 如果登录有token，则每个请求会在http header.Authorization中携带token
 * 3. 设置一些基础默认参数，比如超时时间等
 * 4. 统一错误处理，比如token失效调登录页
*/
export default function Request (config = {}) {
    // 设置默认参数
    config.method = config?.method ?? 'POST'
    config.crossDomain = true

    if (!config.url) {
        throw new Error('提交的url不能为空')
    }
    let guid = config.serialId
    if (!guid) {
        let { url, params } = config
        guid = url + JSON.stringify(params)
    }

    if (requestLocker.has(guid)) {
        // 正在提交中
        return new Promise((resolve, reject) => {
            resolve({ code: 'serial-request', data: true, message: '当前请求正在提交中，待请求返回后方可再次提交' })
        })
    }
    requestLocker.set(guid, true)

    const service = getAxiosInstance(config)

    return service.request(config).finally(() => {
        // 请求结束重置请求，以允许用户再次提交, 防止内存泄露
        requestLocker.delete(guid)
    })
}

// 本来应该只有一个config参数
export function api (config: AxiosRequestConfigPlus) {
    return Request(config)
}

export function get (config: AxiosRequestConfigPlus) {
    return api({ ...config, method: 'GET' })
}

export function post (config: AxiosRequestConfigPlus) {
    return api({ ...config, method: 'POST' })
}

// 下载
export function downloadByApi (config: AxiosRequestConfigPlus) {
    config.responseType = 'blob'
    return api(config)
}