import { getNewsCategoryList, addNewsCategory, updateNewsCategory, query } from '../../services/newsCategoryList';
import { parse } from 'qs';
export default {
  namespace: 'newsCategory',
  state: {
    newsCategoryList: [],
    currentItem: {},
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
        if (location.pathname === '/newsCategory/list') {
          dispatch({
            type: 'getNewsCategoryList',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *getNewsCategoryList ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(getNewsCategoryList, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsCategoryList: data.data,
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
      alert(1);
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsCategoryList: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    *add ({ payload }, { call, put }) {
      const data = yield call(addNewsCategory, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsCategoryList' });
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ newsCategory }) => {
        console.log("=======news=====");
        console.log(newsCategory);
        return newsCategory.currentItem.id
      } );
      console.log("=======id=====");
      console.log(id);
      console.log("=======payload=====");
      console.log(payload);

      const result = { ...payload, id };
      const data = yield call(updateNewsCategory, result);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsCategoryList' });
      } else {
        throw data
      }
    }
  },
  reducers: {
    querySuccess (state, action) {
      const { newsCategoryList, pagination } = action.payload;

      return { ...state,
        newsCategoryList,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
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
