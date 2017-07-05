import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { broadcastList,broadcast } = api

export async function broadcastlist (params) {
  return request({
    url: broadcastList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: broadcast.replace(':id', ``),
    method: 'get',
    data: params,
  })
}

export async function statusChange (params) {
  return request({
    url: broadcast.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
