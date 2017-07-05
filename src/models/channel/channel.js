import { channellist, query, create, remove, update } from '../../services/channel'
import { parse } from 'qs'
import moment from 'moment'

export default {

  namespace: 'channel',

  state: {
    channellist: [],
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
        if (location.pathname === '/tencolourValley/channel') {
          dispatch({
            type: 'channellist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *channellist ({ payload }, { call, put }) {
    //   payload = parse(location.search.substr(1))
      const data = yield call(channellist, payload)
    //   console.log('data',data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            channellist: data.data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.data.count,
            // },
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
            channellist: data.data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put }) {
        // console.log('***remove data', payload);
      const data = yield call(remove, { id: payload })
    //   console.log('delete reaponse: ', data);
      if (data.success) {
        yield put({ type: 'channellist' })
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
               yield put({ type: 'channellist' })
           }
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ channel }) => channel.currentItem.id)
      const newUser = { ...payload, id }
    //   console.log('update data:', newUser);
      const data = yield call(update, newUser)
      if (data.success) {
          if (data.result === 1) {
               throw data.msg
           } else {
               yield put({ type: 'hideModal' })
               yield put({ type: 'channellist' })
           }
      } else {
        throw data
      }
    },

  },

  reducers: {

    querySuccess (state, action) {
      const { channellist, pagination } = action.payload
    //   console.log('channellist',channellist)
      let dataArray = channellist
    //   console.log('statusArray',statusArray);
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
        channellist,
        // pagination: {
        //   ...state.pagination,
        //   ...pagination,
        // }
       }
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
