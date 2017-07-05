import { request, config } from '../utils'
const { api } = config
const { adminLogin } = api

export async function login (data) {
  return request({
    url: adminLogin,
    method: 'post',
    data,
  })
}
