import { topiclist,query,} from '../../services/topic'
import { parse } from 'qs'

export default {
  namespace: 'topic',
  state: {
    topiclist: [],
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
        if (location.pathname === '/tencolourValley/topic') {
          dispatch({
            type: 'topiclist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *topiclist ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(topiclist, payload);
    //   console.log('data',data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            topiclist: data.data,
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
        // console.log('payload', payload);
        // console.log('debug url:',location.search.substr(1));
        const page = parse(location.search.substr(1))
        // id=1&userId=6&title=2&valleyCode=3&status=4&sex=5
        let param = {}
        if (payload.sex) {
            param.sex = payload.sex
        }
        if (payload.id) {
            param.id = payload.id
        }
        if (payload.status) {
            param.status = payload.status
        }
        if (payload.valleyCode) {
            param.valleyCode = payload.valleyCode
        }
        if (payload.title) {
            param.title = payload.title
        }
        if (payload.userId) {
            param.userId = payload.userId
        }
        // console.log('param',param);
        const data = yield call(topiclist, param)
        // console.log('response filter: ', data);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              topiclist: data.data,
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
      payload = parse(location.search.substr(1))
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            topiclist: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { topiclist, pagination } = action.payload;
    //   console.log('topiclist.list',topiclist.list);

      return { ...state,
        topiclist,
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
