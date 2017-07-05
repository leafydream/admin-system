import { request, config } from '../utils';
const { api } = config;
const { newsCategoryList, newsCategory } = api;

//获取资讯类别列表
export async function getNewsCategoryList (params) {
  return request({
    url: newsCategoryList,
    method: 'get',
    data: params,
  })
}

//新增资讯类别
export async function addNewsCategory (params) {
  console.log(params);
  return request({
    url: newsCategory.replace(':id', ''),
    method: 'post',
    data: params,
  })
}

//更新资讯类别
export async function updateNewsCategory (params) {
  return request({
    url: newsCategory.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}

//查询
export async function query (params) {
  return request({
    url: newsCategoryList.replace(':id', ''),
    method: 'get',
    data: params,
  })
}

