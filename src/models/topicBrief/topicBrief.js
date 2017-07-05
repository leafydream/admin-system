import { Brieflist,query,create, remove, update } from '../../services/topicBrief'
import { parse } from 'qs'
import {Categorylist} from '../../services/topicCategory'


export default {

  namespace: 'topicBrief',

  state: {
    talkList: {
        count: 0,
        list: [],
    },
    createTalkList: {
        count: 0,
        list: [],
    },
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
        if (location.pathname === '/tencolourValley/topicBrief') {
          dispatch({
            type: 'list',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *list ({ payload }, { call, put }) {
      payload = parse(location.search.substr(1))
      const data = yield call(Brieflist, payload)
    //   console.log('data',data);
      const selectData = yield call(Categorylist, {...payload, pageSize: 100})
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

    *findlist({payload}, {call, put}) {
        // console.log('payload', payload);
        const page = parse(location.search.substr(1))
        // console.log('debug url:',location.search.substr(1));

        // const selectData = yield call(Categorylist, payload)
        // id=1&userId=6&title=2&valleyCode=3&status=4&sex=5
        let param = {}


        // console.log('payload.valleyCode',payload.valleyCode);
        if (payload.valleyCode) {
            param.valleyCode = payload.valleyCode
        }
        if (payload.topicCategoryId) {
            param.topicCategoryId = payload.topicCategoryId
        }
        if(page.page){
            param.page = page.page
        }
        if(page.pageSize){
            param.pageSize = page.pageSize
        }
        // console.log('param',param);
        const data = yield call(Brieflist, param)
        const talk = yield put({
          type: 'talkList',
          payload: {
            valleyCode: param.valleyCode,
        }})

        // console.log('response filter: ', data);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
            //   selectData: selectData.data,
              pagination: {
                current: Number(page.page) || 1,
                pageSize: Number(page.pageSize) || 10,
                total: data.data.count,
              },
            },
          })
        }
    },

    *talkList({ payload }, {call, put}) {
        // console.log('talkList拿到 :', payload);
        // console.log('payload.valleyCode',payload.valleyCode);
        // const res = {
        //     data:1,
        // }
        // const data = res.data
        //
        // const { data } = {
        //     data: 1
        // }
        const { data } = yield call(Categorylist, {...payload, pageSize: 100})
        // console.log('talkList data:', data);
        if (data) {
            if (payload.type === 'create' || payload.type === 'update') {
                yield put({
                    type: 'createTalkListSuccess',
                    payload: {
                        talkList: data,
                    }
                })
            } else {
                yield put({
                  type: 'talkListSuccess',
                  payload: {
                    talkList: data,
                  },
                })
            }
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
      const id = yield select(({ topicBrief }) => topicBrief.currentItem.id)
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

    *showUpdataModal ({payload}, { select, call, put }) {
        if (payload.modalType === 'update') {
            const valleyCode = payload.currentItem.valleyCode
            yield put({
                type: "talkList",
                payload: {
                    type: payload.modalType,
                    valleyCode: valleyCode,
                }
            })
        }
        yield put({
            type: 'showModal',
            payload: payload,
        })
    }


  },

  reducers: {
    talkListSuccess (state, action) {
        const { talkList } = action.payload
        // console.log('reducers taskList', talkList);
        return {
            ...state,
            talkList,
        }
    },
    createTalkListSuccess (state, action) {
        const { talkList } = action.payload
        // console.log('reducers taskList', talkList);
        return {
            ...state,
            createTalkList: talkList,
        }
    },
    querySuccess (state, action) {
      const { list, pagination,selectData } = action.payload
    //   console.log('querySuccess taskList', selectData);
      return { ...state,
        list,
        talkList: selectData,
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
