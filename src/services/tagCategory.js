import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { tagCategoryList, tagCategory } = api

export async function tagCategorylist (params) {
  return request({
    url: tagCategoryList,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: tagCategory.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: tagCategory.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
