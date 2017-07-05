import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const TagCategory = ({ location, dispatch, tagCategory, loading }) => {
  const { tagCategoryList, pagination, currentItem, modalVisible, modalType, isMotion } = tagCategory
  const { pageSize } = pagination
  // console.log('loading',loading)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['tagCategory/update'],
    title: `${modalType === 'create' ? '添加标签类别' : '标签类别修改'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'create',
    onOk (data) {
        // console.log('modalType is :', modalType);
      dispatch({
        type: `tagCategory/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'tagCategory/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: tagCategoryList,
    loading: loading.effects['tagCategory/tagCategorylist'],
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
        type: 'tagCategory/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'tagCategory/showModal',
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
        type: 'tagCategory/showModal',
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

TagCategory.propTypes = {
  tencolour: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ tagCategory, loading }) => ({ tagCategory, loading }))(TagCategory)
