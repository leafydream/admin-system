import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { tagList, tag } = api

export async function taglist (params) {
  return request({
    url: tagList,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: tag.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: tag.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
