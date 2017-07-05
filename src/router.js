import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from './routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};

const Routers = function ({ history, app }) {
  const routes = [
      {
        path: '/',
        component: App,
        getIndexRoute (nextState, cb) {
          require.ensure([], require => {
            registerModel(app, require('./models/dashboard'));
            cb(null, { component: require('./routes/dashboard/') })
          }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/session'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        },
        {
          path: 'admin/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/admin/admin'))
              cb(null, require('./routes/admin/'))
            }, 'admin')
          },
        },
        {
          path: 'tencolourValley/tencolour',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tencolour/tencolour'))
              cb(null, require('./routes/tencolour/'))
            }, 'tencolour')
          },
        },
        {
            path: '/tencolourValley/elf',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/elf/elf'))
                cb(null, require('./routes/elf/'))
              }, 'elf')
            },
        },
        {
            path: '/tencolourValley/topic',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/topic/topic'))
                cb(null, require('./routes/topic/'))
              }, 'topic')
            },
        },
        {
            path: '/tencolourValley/topicCategory',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/topicCategory/topicCategory'))
                cb(null, require('./routes/topicCategory/'))
              }, 'topicCategory')
            },
        },
        {
            path: '/tencolourValley/topicBrief',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/topicBrief/topicBrief'));
                cb(null, require('./routes/topicBrief/'))
              }, 'topicBrief')
            },
        },
        {
          path: '/appUserManage/userList',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/appUserManage/appUserManage'));
              cb(null, require('./routes/appUserManage/'))
            }, 'appUserManage')
          },
        },
        {
            path: '/broadcast/list',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/broadcastlist/broadcastlist'))
                cb(null, require('./routes/broadcastlist/'))
            }, 'broadcastlist')
            },
        },
        {
          path: '/broadcast/commentlist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/broadcastComment/broadcastComment'))
              cb(null, require('./routes/broadcastComment/'))
            }, 'broadcastComment')
          },
        },
        {
            path: '/user/photo',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/photo/photo'))
                cb(null, require('./routes/photo/'))
            }, 'photo')
            },
        },{
            path: '/user/video',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/video/video'))
                cb(null, require('./routes/video/'))
            }, 'video')
            },
        },
        {
          path: '/news/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/newsList/newsList'))
              cb(null, require('./routes/newslist/'))
            }, 'newslist')
          },
        },
        {
          path: '/newsCategory/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/newsCategoryList/newsCategoryList'))
              cb(null, require('./routes/newsCategoryList/'))
            }, 'newsCategoryList')
          },
        },
        {
          path: '/newsLib/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/newsLibList'))
              cb(null, require('./routes/newsLibList'))
            }, 'newsLibList')
          },
        },
        {
          path: '/tencolourValley/channel',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/channel/channel'))
              cb(null, require('./routes/channel/'))
            }, 'channel')
          },
        },
        {
          path: '/user/quiz',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/quiz/quiz'))
              cb(null, require('./routes/quiz/'))
            }, 'quiz')
          },
        },
        {
          path: '/user/tagCategory',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tagCategory/tagCategory'))
              cb(null, require('./routes/tagCategory/'))
            }, 'tagCategory')
          },
        },
        {
          path: '/user/tag',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tag/tag'))
              cb(null, require('./routes/tag/'))
            }, 'tag')
          },
        },
        
      ],
    },
  ];

  return <Router history={history} routes={routes} />
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
