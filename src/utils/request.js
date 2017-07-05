import axios from 'axios'
import qs from 'qs'
import { YQL, CORS, baseURL } from './config'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneParams = lodash.cloneDeep(data)
  const params = qs.stringify(data);
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneParams,
      })
    case 'delete':
      return axios.delete(url, {
        data: params,
      })
    case 'post':
      return axios.post(url, params)
    case 'put':
    // console.log('发一个put 请求');
      return axios.put(url, params)
    case 'patch':
      return axios.patch(url, params)
    default:
      return axios(options)
  }
}

export default function request (options) {

  options.fetchType = 'CORS'


  return fetch(options).then((response) => {
    // console.log(options);
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let status
    let otherData = {}
    if (response) {
      const { data, statusText } = response
      otherData = data
      status = response.status
      msg = data.message || statusText
    } else {
      status = 600
      msg = 'Network Error'
    }
    return { success: false, status, message: msg, ...otherData }
  })
}
