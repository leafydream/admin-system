import { photolist, query, updateStatus } from '../../services/photo'
import { parse } from 'qs'
import moment from 'moment'

export default {

  namespace: 'photo',

  state: {
    photolist: [],
    Photo:[],
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
        if (location.pathname === '/user/photo') {
          dispatch({
            type: 'photolist',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *photolist ({ payload }, { call, put }) {

    //   payload = parse(location.search.substr(1));
    //   console.log('---photo payload', payload);
      const data = yield call(photolist, {...payload, pageSize:20});


    //   console.log('data',data);

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            photolist: data.data,
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
        const data = yield call(photolist, param)
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


    *updateStatus ({ payload }, { call, put }) {
        const data = yield call(updateStatus, payload)
        if (data) {
          yield put({
            type: 'photolist',
            payload: parse(location.search.substr(1)),
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          })
        }
    },

    // *changeChecked({item, checked}, {call, put, select}) {
    //         let Photo = yield select(state => state.Photo)
    //         Photo.forEach((v1) => {
    //             v1.forEach((v2) => {
    //                 if(v2.id === item.id){
    //                     v2.checked = checked
    //                 }
    //             })
    //         })
    //         yield put({type:'changeChecked', Photo})
    // },
    //
    // *changeAllChecked(undefined, {call, put, select}){
    //         let Photo = yield select(state => state.Photo)
    //         Photo.forEach((v1) => {
    //             v1.forEach((v2) => {
    //                     v2.checked = false
    //             })
    //         })
    //         yield put({type:'changeChecked', Photo})
    // },
  },

  reducers: {
    // changeChecked(state, Photo) {
    //     return {...state, Photo}
    // },
    querySuccess (state, action) {
        const { photolist, pagination } = action.payload;
        // console.log('photoaction.payload', action.payload);

        let dataArray = photolist.list
        // 处理时间
        for (var i = 0; i < dataArray.length; i++) {
            if(dataArray[i].createDate){
                dataArray[i].createDate = moment(dataArray[i].createDate).format('YYYY-MM-DD HH:mm')
            }
        }

        // 处理图片数据
        let l = photolist.list
        let r = []
        for (let i = 0; i < l.length; i++) {
            l[i].imgUrl = l[i].imgUrl.split(',')
        }
        for (let j = 0; j < l.length; j++) {
            if(l[j].imgUrl.length === 1) {
                r.push(l[j])
            } else if(l[j].imgUrl.length > 1) {
                for (let k = 0; i < l[j].imgUrl.length; k++) {
                    r.push(l[j].imgUrl[k])
                }
            }
        }

        // 把 imgs 分给二维数组
        let array = []
        let colLength = Math.ceil(r.length / 5)
        for (let i = 0; i < 5; i++) {
            array.push(r.slice(i*colLength, (i+1)*colLength))
        }
        // console.log('imgs:', array);
        return { ...state,
            photolist,
            Photo: array,
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
