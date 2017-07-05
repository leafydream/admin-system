import { request, config } from '../utils';
const { api } = config;
const { newsList, news, newsCategoryList, newsCategory } = api;

//获取资讯列表
export async function getNewsList (params) {
  return request({
    url: newsList,
    method: 'get',
    data: params,
  })
}

//新增资讯
export async function addNews (params) {
  return request({
    url: news.replace(':id', ''),
    method: 'post',
    data: params,
  })
}

//删除资讯
export async function removeNews (params) {
  return request({
    url: news.replace(':id', params.id),
    method: 'delete',
    data: params,
  })
}

//更新资讯
export async function updateNews (params) {
  return request({
    url: news.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}

//查询
export async function query (params) {
  return request({
    url: newsList.replace(':id', ''),
    method: 'get',
    data: params,
  })
}

//根据id获取资讯
export async function getNewsDetails (params) {
  return request({
    url: news.replace(':id', params.id),
    method: 'get',
    data: params,
  })
}

//获取资讯类别列表
export async function getNewsCategoryList (params) {
  return request({
    url: newsCategoryList,
    method: 'get',
    data: params,
  })
}
