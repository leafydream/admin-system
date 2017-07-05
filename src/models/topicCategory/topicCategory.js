import { Categorylist,query,create, remove, update } from '../../services/topicCategory'
import { parse } from 'qs'
import {valleylist} from '../../services/tencolour'


export default {

  namespace: 'topicCategory',

  state: {
    list: [],
    selectData:[],
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
        if (location.pathname === '/tencolourValley/topicCategory') {
          dispatch({
            type: 'list',
            payload: location.query,
          })
          dispatch({
            type: 'valleylist',
          })
        }
      })
    },
  },

  effects: {

    *list ({ payload={} }, { call, put }) {
        // console.log('触发list');
      const data = yield call(Categorylist, payload)
    //   console.log('data',data);
      const selectData = yield call(valleylist, {...payload, page:1})
    //   console.log('selectData',selectData);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            selectData: selectData.data,
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
            list: data.data,
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
        yield put({ type: 'list' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
        // console.log('** create: ', payload);
      const data = yield call(create, payload)
      if (data.success) {
          if (data.result === 1) {
               throw data.msg
           } else {
               yield put({ type: 'hideModal' })
               yield put({ type: 'list' })
           }
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ topicCategory }) => topicCategory.currentItem.id)
      const newUser = { ...payload, id }
    //   console.log('update data:', newUser);
      const data = yield call(update, newUser)
      if (data.success) {
          if (data.result === 1) {
               throw data.msg
           } else {
               yield put({ type: 'hideModal' })
               yield put({ type: 'list' })
           }
      } else {
        throw data
      }
    },

  },


  reducers: {

    querySuccess (state, action) {
      const { list, pagination,selectData } = action.payload
      return { ...state,
        list,
        selectData,
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
