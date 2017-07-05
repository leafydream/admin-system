import { valleylist,query,create, remove, update } from '../../services/tencolour'
import { parse } from 'qs'

export default {

  namespace: 'tencolour',

  state: {
    valleylist: [],
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
        if (location.pathname === '/tencolourValley/tencolour') {
          dispatch({
            type: 'valleylist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *valleylist ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1))
      const data = yield call(valleylist, payload)
    //   console.log('data',data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            valleylist: data.data,
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
      payload = parse(location.search.substr(1))
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            valleylist: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put }) {
        // console.log('***remove data', payload);
      const data = yield call(remove, { id: payload })
    //   console.log('delete reaponse: ', data);
      if (data.success) {
        yield put({ type: 'valleylist' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
        // console.log('** create: ', payload);
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'valleylist' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ tencolour }) => tencolour.currentItem.id)
      const newUser = { ...payload, id }
    //   console.log('update data:', newUser);
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'valleylist' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    querySuccess (state, action) {
      const { valleylist, pagination } = action.payload
    //   console.log('valleylist',valleylist)
      return { ...state,
        valleylist,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },

    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },

}
