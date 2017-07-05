import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Tag = ({ location, dispatch, tag, loading }) => {
  const { tagList, tagCategoryData, pagination, currentItem, modalVisible, modalType, isMotion } = tag
  const { pageSize } = pagination
  // console.log('**tagCategoryData',tagCategoryData)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['tag/update'],
    title: `${modalType === 'create' ? '添加标签' : '标签修改'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'create',
    tagCategory: tagCategoryData,
    onOk (data) {
        // console.log('modalType is :', modalType);
      dispatch({
        type: `tag/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'tag/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: tagList,
    loading: loading.effects['tag/tagList'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
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
        type: 'tag/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'tag/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
      isMotion,
      tagCategory: tagCategoryData,
      filter: {
        ...location.query,
      },
      onFilterChange (value) {
        dispatch(routerRedux.push({
          pathname: location.pathname,
          query: {
            ...value,
            page: 1,
            pageSize,
          },
        }))
      },

    onAdd () {
      dispatch({
        type: 'tag/showModal',
        payload: {
          modalType: 'create',
        },
      })
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

Tag.propTypes = {
  tencolour: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ tag, loading }) => ({ tag, loading }))(Tag)
