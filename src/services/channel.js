import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { channelList,channel } = api

export async function channellist (params) {
  return request({
    url: channelList,
    method: 'get',
    data: params,
  })
}

// export async function query (params) {
//   return request({
//     url: channel.replace(':id', ``),
//     method: 'get',
//     data: params,
//   })
// }

export async function create (params) {
    // let data = qs.stringify(params)
    // console.log('create request data:', data);
  return request({
    //   url: admin.replace(':id', `?${data}`),
    url: channel.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
      //   删除
    url: channel.replace(':id', params.id),
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: channel.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
