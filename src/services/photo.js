import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { photoList,photoUpdate } = api

export async function photolist (params) {
  return request({
    url: photoList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: photo.replace(':id', ``),
    method: 'get',
    data: params,
  })
}
export async function updateStatus (params) {
  return request({
    url: photoUpdate,
    method: 'put',
    data: params,
  })
}
