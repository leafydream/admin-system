import {
  getNewsList, getNewsCategoryList, getNewsDetails,
  addNews, removeNews, updateNews, query
} from '../../services/newsList';
import { parse } from 'qs';
export default {
  namespace: 'news',
  state: {
    newsList: [],
    categoryList: [],
    currentItem: {},
    newsDetails:{},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/news/list') {
          dispatch({
            type: 'getNewsList',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *getNewsList ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(getNewsList, payload);
      const result = yield call(getNewsCategoryList, payload);
      if (data && result) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsList: data.data,
            categoryList: result.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.count,
            },
          },
        })
      }
    },
    *getNewsCategoryList ({ payload }, { call, put }){
      payload = parse(location.search.substr(1));
      const data = yield call(getNewsCategoryList, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsList: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.count,
            },
          },
        })
      }
    },
    *query ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsList: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    *delete ({ payload }, { call, put }) {
      const data = yield call(removeNews, { id: payload });
      if (data.success) {
        yield put({ type: 'getNewsList' })
      } else {
        throw data
      }
    },
    *getNewsDetails ({ payload }, { call, put }) {
      const data = yield call(getNewsDetails, payload);
      if (data) {
        yield put({
          type: 'queryNewsDetailsSuccess',
          payload: {
            newsDetails: data.data
          },
        })
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ news }) => news.currentItem.id );
      const result = { ...payload, id };
      const data = yield call(updateNews, result);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsList' });
      } else {
        throw data
      }
    },
    *add ({ payload }, { call, put }) {
      console.log('===========');
      console.log(payload);
      const data = yield call(addNews, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsList' });
      } else {
        throw data
      }
    },
  },
  reducers: {
    queryNewsDetailsSuccess (state, action){
      return { ...state, ...action.payload, modalVisible: true };
    },
    querySuccess (state, action) {
      const { newsList, pagination, categoryList } = action.payload;
      return { ...state,
        newsList,
        categoryList,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    changType (state, action){
      return { ...state, ...action.payload };
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal (state) {
      return { ...state, modalVisible: false };
    },
    switchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion);
      return { ...state, isMotion: !state.isMotion };
    },
  }
}
