import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { adminList,admin } = api

export async function list (params) {
  return request({
    url: adminList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: admin.replace(':id', ``),
    method: 'get',
    data: params,
  })
}

export async function create (params) {
    // let data = qs.stringify(params)
    // console.log('create request data:', data);
  return request({
    //   url: admin.replace(':id', `?${data}`),
      url: admin.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
      //   删除
    url: admin.replace(':id', params.id),
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: admin.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
