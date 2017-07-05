import { request, config } from '../utils'
import qs from 'qs'
const { api } = config
const { quizList,quiz } = api

export async function quizlist (params) {
  return request({
    url: quizList,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: quiz.replace(':id', ``),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: quiz.replace(':id', params.id),
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: quiz.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
