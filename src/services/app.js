import { request, config } from '../utils'
const { api } = config
const { loginCheck, adminLogout, adminLogin } = api

export async function login (params) {
  return request({
    url: adminLogin,
    method: 'post',
    data: params,
  })
}

// 发 ajax 的方法
// var user = request({url: , method:'get', data: {xxx}})

export async function logout (params) {
  return request({
    url: adminLogout,
    method: 'get',
    data: params,
  })
}

export async function loginQuery (params) {
  return request({
    url: loginCheck,
    method: 'get',
    data: params,
  })
}
