import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { broadcastCommentlist,broadcastComment } = api

export async function commentlist (params) {
  return request({
    url: broadcastCommentlist,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: broadcastComment.replace(':id', ``),
    method: 'get',
    data: params,
  })
}

export async function commentstatusChange (params) {
    // console.log('params',params);
  return request({
    url: broadcastComment.replace(':id', params.id).replace(':broadcastId', params.broadcastId),
    method: 'put',
    data: params,
  })
}
