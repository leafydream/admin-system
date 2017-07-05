import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { videoList,videoUpdate } = api

export async function videolist (params) {
  return request({
    url: videoList,
    method: 'get',
    data: params,
  })
}

// export async function query (params) {
//   return request({
//     url: photo.replace(':id', ``),
//     method: 'get',
//     data: params,
//   })
// }
export async function updateStatus (params) {
  return request({
    url: videoUpdate,
    method: 'put',
    data: params,
  })
}
