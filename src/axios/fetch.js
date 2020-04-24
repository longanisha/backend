import axios from 'axios'
import Qs from 'qs'
// import { Message } from 'element-ui'
// import store from '../vuex/store.js'
var common = require('./utils.js')
const SERVER_BASE = common.GetServerBase()
// import { Notify } from 'vant'
export default function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 60000, // 超时时间设置
      // baseURL: SERVER_BASE.baseServerUrl,
      url: SERVER_BASE.baseServerUrl + options.url,
      // url: options.url,
      method: options.method, // 请求方式 get or post
      transformRequest: [function(data) {
        return data
      }],
      transformResponse: [function(data) {
        return data
      }],
      data: options.dataType === 'json' ? JSON.stringify(options.data) : options.dataType === 'file' ? options.data : Qs.stringify(options.data), // 数据处理
      params: options.params, // 传递的参数
      responseType: options.responseType || 'json', // 服务器响应的数据类型
      headers: options.headers || { 'X-Requested-With': 'XMLHttpRequest' } // 请求头部
    })
    instance.interceptors.request.use(
      config => {
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error) {
          return Promise.reject(error)
        }
      }
    )
    // 请求处理
    instance()
      .then((res) => {
        sessionStorage.setItem('headers', JSON.stringify(res.headers))
        resolve(res.data)
      }) // 请求成功处理
      .catch((error) => {
        reject(error)
        // Notify({ type: 'warning', message: '请求超时,请刷新页面重试' }) 这个崩了
      }) // 请求失败处理
  })
}
