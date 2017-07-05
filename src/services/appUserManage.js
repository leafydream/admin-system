import { request, config } from '../utils';
const { api } = config;
const { userList } = api;

export async function getUserList (params) {
  return request({
    url: userList,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: userList.replace(':id', ``),
    method: 'get',
    data: params,
  })
}
