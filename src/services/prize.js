import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { prize } = api

export async function list (params) {
  return request({
    url: prize,
    method: 'get',
    data: params,
  })
}
