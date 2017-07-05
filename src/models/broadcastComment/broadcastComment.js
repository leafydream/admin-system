import { commentlist,query,commentstatusChange } from '../../services/broadcastComment'
import moment from 'moment'
import { parse } from 'qs'

export default {

  namespace: 'comment',

  state: {
    commentlist: [],
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
        if (location.pathname === '/broadcast/commentlist') {
          dispatch({
            type: 'commentlist',
            payload: location.query,
          })
        }
      })
    },
  },


  effects: {

    *commentlist ({ payload }, { call, put }) {

      payload = parse(location.search.substr(1));
      const data = yield call(commentlist, payload);


    //   console.log('data',data);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            commentlist: data.data,
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
            commentlist: data.data,
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
        const data = yield call(commentstatusChange, payload)
        // console.log('statusChange reaponse: ', data);
        if (data.success) {
            yield put({ type: 'commentlist' })
        } else {
          throw data
        }
    }

  },

  reducers: {

    querySuccess (state, action) {


      const { commentlist, pagination,statusChange } = action.payload;
    //   console.log('action.payload',action.payload);
      let dataArray = commentlist
    //   console.log('dataArray',dataArray);
      for (var i = 0; i < dataArray.length; i++) {
          if(dataArray[i].createDate){
            dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
         }
      }



    //   console.log('broadcastlist.list',broadcastlist.list);

      return { ...state,
        commentlist,
        statusChange,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
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
