import { myCity, queryWeather, query } from '../services/dashboard'
import { parse } from 'qs'

export default {
  namespace: 'dashboard',
  state: {

    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
    },
  },
  reducers: {

  },
}
