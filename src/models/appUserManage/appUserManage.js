import { getUserList, query } from '../../services/appUserManage';
import { parse } from 'qs';

export default {
  namespace: 'user',
  state: {
    userList: [],
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
        if (location.pathname === '/appUserManage/userList') {
          dispatch({
            type: 'getUserList',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *getUserList ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      console.log("======payload=====");
      console.log(payload);
      const data = yield call(getUserList, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            userList: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.count,
            },
          },
        })
      }
    },

    *findlist({payload}, {call, put}) {
      const page = parse(location.search.substr(1));
      const data = yield call(getUserList,payload);
      console.log("data",data);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            userList: data.data,
            pagination: {
              current: Number(page.page) || 1,
              pageSize: Number(page.pageSize) || 10,
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
            userList: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    }
  },

  reducers: {
    querySuccess (state, action) {
      const { userList, pagination } = action.payload;
      console.log("======userList====");
      console.log(userList);
      return { ...state,
        userList,
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
