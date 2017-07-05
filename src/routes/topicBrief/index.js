import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { parse } from 'qs'

const TopicBrief = ({ location, dispatch, topicBrief, loading }) => {
  const { list, talkList,pagination, currentItem, modalVisible, modalType, isMotion, createTalkList } = topicBrief
  const { pageSize } = pagination
  // console.log('======topicBrief=====');
  // console.log(topicBrief);
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['topicBrief/update'],
    title: `${modalType === 'create' ? '添加快捷标题' : '快捷标题修改'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'update',
    select: createTalkList,
    onOk (data) {
        //  console.log('modalType is :', modalType);
      dispatch({
        type: `topicBrief/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'topicBrief/hideModal',
      })
    },
    onModalChange (value) {
        // console.log('categoryindex Modal:', value);
        dispatch ({
            type: 'topicBrief/talkList',

            payload: {
                ...value,
                type: 'create'
            },

        })
    },
  }

  const listProps = {
    dataSource: list.list,
    loading: loading.effects['topicBrief/list'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      const Page = parse(location.search.substr(1))
    //   console.log('Page',Page);
    //   console.log('query',query);
    //   console.log('pathname',pathname);
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'topicBrief/delete',
        payload: id,
      })
    },
    onEditItem (item) {
        // console.log('***item',item);
      dispatch({
        type: 'topicBrief/showUpdataModal',
        // type: 'topicBrief/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  const filterProps = {
    isMotion,
    options: talkList,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
        // console.log('categoryindex filter:', value);
        // dispatch ({
        //     type: 'topicBrief/findlist',
        //
        //     payload: value,
        //
        // })

        const code = value.valleyCode
        const topicCategoryId = value.topicCategoryId
        dispatch(routerRedux.push({
          pathname: '/tencolourValley/topicBrief',
          query: {
            valleyCode: code,
            page: 1,
            pageSize: 10,
            topicCategoryId: topicCategoryId,
          },
        }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin/list',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/admin/list',
      }))
    },
    onAdd () {
      dispatch({
        type: 'topicBrief/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'topicBrief/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

TopicBrief.propTypes = {
  topicBrief: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ topicBrief, loading }) => ({ topicBrief, loading }))(TopicBrief)
