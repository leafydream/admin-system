import { videolist, updateStatus} from '../../services/video'
import { parse } from 'qs'
import moment from 'moment'

export default {

  namespace: 'video',

  state: {
    videolist: [],
    videoArray:[],
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
        if (location.pathname === '/user/video') {
          dispatch({
            type: 'videolist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *videolist ({ payload }, { call, put }) {

    //   payload = parse(location.search.substr(1));
    //   console.log('---video payload', payload);
      const data = yield call(videolist, {...payload, pageSize:20});


    //   console.log('data',data);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            videolist: data.data,
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

        if (payload.id) {
            param.id = payload.id
        }

        if (payload.valleyCode) {
            param.valleyCode = payload.valleyCode
        }

        if (payload.userId) {
            param.userId = payload.userId
        }
        // console.log('param',param);
        const data = yield call(videolist, param)
        // console.log('response filter: ', data);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              photolist: data.data,
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
            videolist: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *updateStatus ({ payload }, { call, put }) {
        const data = yield call(updateStatus, payload)
        if (data) {
          yield put({
            type: 'videolist',
            payload: parse(location.search.substr(1)),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          })
        }
    },


  },

  reducers: {

    querySuccess (state, action) {
        const { videolist, pagination } = action.payload;
        // console.log('photoaction.payload', action.payload);

        let dataArray = videolist.list
        // 处理时间
        for (var i = 0; i < dataArray.length; i++) {
            if(dataArray[i].createDate){
                dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
            }
        }


        // 处理封面数据
        let l = videolist.list
        // console.log('l',l);
        let r = []
        for (let i = 0; i < l.length; i++) {
            if (l[i].cover === null) {
                l[i].cover = []
            }else if (l[i].cover !== null) {
                l[i].cover = l[i].cover.split(',')
            }

        }
        // console.log('ll',l);
        for (let j = 0; j < l.length; j++) {
            if(l[j].cover.length === 1) {
                r.push(l[j])
            } else if(l[j].cover.length > 1) {
                for (let k = 0; i < l[j].cover.length; k++) {
                    r.push(l[j].cover[k])
                }
            }
        }

        // 把 imgs 分给二维数组
        let array = []
        let colLength = Math.ceil(r.length / 5)
        for (let i = 0; i < 5; i++) {
            array.push(r.slice(i*colLength, (i+1)*colLength))
        }
        // console.log('imgs array:', array);
        return { ...state,
            videolist,
            videoArray: array,
            pagination: {
                ...state.pagination,
                ...pagination,
            }
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
