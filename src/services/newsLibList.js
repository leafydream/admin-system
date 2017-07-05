import { request, config } from '../utils';
const { api } = config;
const { newsLibList, newsLib, newsCategoryList, news, newsLibBatchToNews } = api;

//获取资讯库列表
export async function getNewsLibList (params) {
  return request({
    url: newsLibList,
    method: 'get',
    data: params,
  })
}

//查询
export async function queryNewsLib (params) {
  return request({
    url: newsLib.replace(':id', params.id),
    method: 'get',
    data: params,
  })
}

//删除资讯
export async function removeNewsLib (params) {
  return request({
    url: newsLib.replace(':id', params),
    method: 'delete',
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

//资讯入库
export async function newsLibPutWarehouse (params) {
  let param = `?ids=`+params.join(",");
  return request({
    url: newsLibBatchToNews+`${param}`,
    method: 'post',
  })
}

//更新资讯库
export async function updateNewsLib (params) {
  return request({
    url: newsLib.replace(':id', params.id),
    method: 'put',
    data: params,
  })
}
