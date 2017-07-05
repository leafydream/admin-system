import { getNewsLibList, getNewsCategoryList , queryNewsLib, removeNewsLib, newsLibPutWarehouse, updateNewsLib } from '../../services/newsLibList';
import { addNews } from '../../services/newsList';
import { parse } from 'qs';
export default {
  namespace: 'newsLib',
  state: {
    newsLibList: [],
    categoryList: [],
    newsLibItem: {},
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
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/newsLib/list') {
          dispatch({
            type: 'getNewsLibList',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *getNewsLibList ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(getNewsLibList, payload);
      const result = yield call(getNewsCategoryList, payload);
      if (data && result) {
        yield put({
          type: 'querySuccess',
          payload: {
            newsLibList: data.data,
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
    *queryNewsLib ({ payload }, { call, put }) {
      const data = yield call(queryNewsLib, payload);
      if (data) {
        yield put({
          type: 'getNewsLibSuccess',
          payload: {
            newsLibItem: data.data,
          },
        })
      }
    },
    *addNews ({ payload }, { call, put }) {
      const data = yield call(addNews, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *newsLibPutWarehouse ({ payload }, { call, put }){
      const data = yield call(newsLibPutWarehouse, payload.checkItemArr);
      if (data.success) {
        payload.curstate.checkItemArr = [];
        yield put({
          type: 'putWarehouseSuccess'
        });
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ newsLib }) => newsLib.currentItem.id );
      const result = { ...payload, id };
      const data = yield call(updateNewsLib, result);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsLibList' });
      } else {
        throw data
      }
    },
    *delete ({ payload }, { call, put }) {
      const data = yield call(removeNewsLib, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'getNewsLibList' });
      } else {
        throw data
      }
    }
  },
  reducers: {
    getNewsLibSuccess (state,action){
      return { ...state, ...action.payload, modalVisible: true };
    },
    putWarehouseSuccess (state,action){
      console.log({...state});
      console.log({...action.payload});
      return { ...state, ...action.payload, modalVisible: true };
    },
    querySuccess (state, action) {
      const { newsLibList, pagination, categoryList } = action.payload;
      return { ...state,
        newsLibList,
        categoryList,
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
