import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { topicCategoryList, topicCategory, uploadfile } = api

export async function Categorylist (params) {
  return request({
    url: topicCategoryList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: topicCategory.replace(':id', ``),
    method: 'get',
    data: params,
  })
}

export async function create (params) {
    // let data = qs.stringify(params)
    // console.log('create request data:', data);
  return request({
    //   url: admin.replace(':id', `?${data}`),
      url: topicCategory.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
      //   删除
    url: topicCategory.replace(':id', params.id),
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: topicCategory.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}

export async function upload (params) {
  return request({
    url: uploadfile,
    method: 'post',
    data: params,
  })
}
