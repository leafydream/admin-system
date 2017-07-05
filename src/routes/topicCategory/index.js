import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { parse } from 'qs'

const TopicCategory = ({ location, dispatch, topicCategory, loading }) => {
  const { list, selectData,pagination, currentItem, modalVisible, modalType, isMotion } = topicCategory
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['topicCategory/update'],
    title: `${modalType === 'create' ? '添加话题分类' : '话题分类修改'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'update',
    select:selectData,
    onOk (data) {
        // console.log('modalType is :', modalType);
      dispatch({
        type: `topicCategory/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'topicCategory/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list.list,
    loading: loading.effects['topicCategory/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
    //   const Page = parse(location.search.substr(1))
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
        type: 'topicCategory/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'topicCategory/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
        // console.log('categoryindex filter:', value);
        // dispatch ({
        //     type: 'topicCategory/findlist',
        //
        //     payload: value,
        //
        // })
        const payload = value
        if (payload.status) {
            payload.status = payload.status
        }
        if (payload.valleyCode) {
            payload.valleyCode = payload.valleyCode
        }
        const page = parse(location.search.substr(1))
        if(page.page){
            payload.page = page.page
        }
        if(page.pageSize){
            payload.pageSize = page.pageSize
        }
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...payload,
          page: 1,
          pageSize,
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
        type: 'topicCategory/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'topicCategory/switchIsMotion' })
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

TopicCategory.propTypes = {
  topicCategory: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ topicCategory, loading }) => ({ topicCategory, loading }))(TopicCategory)
