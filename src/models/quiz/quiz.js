import { quizlist,create, remove, update } from '../../services/quiz'
import { parse } from 'qs'
import moment from 'moment'

export default {

  namespace: 'quiz',

  state: {
    quizList: [],
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
        if (location.pathname === '/user/quiz') {
          dispatch({
            type: 'quizList',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *quizList ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1))
      const data = yield call(quizlist, payload)
    //   console.log('data',data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            quizList: data.data,
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
            quizList: data.data,
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
        yield put({ type: 'quizList' })
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
               yield put({ type: 'quizList' })
           }
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ quiz }) => quiz.currentItem.id)
      const newUser = { ...payload, id }
    //   console.log('update data:', newUser);
      const data = yield call(update, newUser)
      if (data.success) {
          if (data.result === 1) {
               throw data.msg
           } else {
               yield put({ type: 'hideModal' })
               yield put({ type: 'quizList' })
           }
      } else {
        throw data
      }
    },

  },

  reducers: {

    querySuccess (state, action) {
      const { quizList, pagination } = action.payload
    //   console.log('quizList',quizList)
      let dataArray = quizList
      for (var i = 0; i < dataArray.length; i++) {
          if(dataArray[i].createDate){
            dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
         }
      }
      for (var i = 0; i < dataArray.length; i++) {
          if (dataArray[i].updateDate) {
              dataArray[i].updateDate = moment(dataArray[i].updateDate).format('YYYY-MM-DD HH:mm')
          }
      }
      return { ...state,
        quizList,
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
