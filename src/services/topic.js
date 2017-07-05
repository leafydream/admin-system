import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { topicList,topic } = api

export async function topiclist (params) {
  return request({
    url: topicList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: topic.replace(':id', ``),
    method: 'get',
    data: params,
  })
}
