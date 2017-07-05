import { broadcastlist,query,statusChange} from '../../services/broadcastlist'
import { commentlist, commentstatusChange } from '../../services/broadcastComment'
import { parse } from 'qs'
import moment from 'moment'


export default {

  namespace: 'broadcast',

  state: {
    broadcastlist: [],
    commentList: [],
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
        if (location.pathname === '/broadcast/list') {
          dispatch({
            type: 'broadcastlist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *broadcastlist ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1));
      const data = yield call(broadcastlist, payload);


    //   console.log('data',data);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            broadcastlist: data.data,
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
            broadcastlist: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *statusChange ({ payload }, { call, put }) {
        const data = yield call(statusChange, payload)
        // console.log('statusChange reaponse: ', data);
        if (data.success) {
            yield put({ type: 'broadcastlist' })
            // console.log('broadcastlist',broadcastlist);
        } else {
          throw data
        }
    },

    *comment ({ payload }, { call, put }) {
      const param = {broadcastId: payload.id}
      const data = yield call(commentlist, param)
    //   console.log('comment resp', data);
      if (data.success) {
          yield put ({
              type: 'commentSuccess',
              payload: data,
       })

      }
    },

    *commentStatusChange ({ payload }, { call, put }) {
        const data = yield call(commentstatusChange, payload)
        // console.log('statusChange reaponse: ', data);
        if (data.success) {
            yield put({ type: 'commentlist' })
        } else {
          throw data
        }
    },

  },


  reducers: {
    commentSuccess (state, action) {
        const { data, commentStatusChange } = action.payload;
        let dataArray = data
        // console.log('dataArray',dataArray);
        for (var i = 0; i < dataArray.length; i++) {
            if(dataArray[i].createDate){
              dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
           }
        }
        return {
            commentStatusChange,
            ...state,
            commentList: data,
        }
    },
    querySuccess (state, action) {


      const { broadcastlist, pagination,statusChange } = action.payload;
    //   console.log('action.payload',action.payload);
      let dataArray = broadcastlist.list
      for (var i = 0; i < dataArray.length; i++) {
          if(dataArray[i].createDate){
            dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
         }
      }



    //   console.log('broadcastlist.list',broadcastlist.list);

      return { ...state,
        broadcastlist,
        statusChange,
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
