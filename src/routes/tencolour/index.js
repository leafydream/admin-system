import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Tencolour = ({ location, dispatch, tencolour, loading }) => {
  const { valleylist, pagination, currentItem, modalVisible, modalType, isMotion } = tencolour
  const { pageSize } = pagination
  // console.log('loading',loading)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['tencolour/update'],
    title: `${modalType === 'create' ? '添加十色谷' : '十色谷修改'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
        // console.log('modalType is :', modalType);
      dispatch({
        type: `tencolour/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'tencolour/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: valleylist.list,
    loading: loading.effects['tencolour/valleylist'],
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
        type: 'tencolour/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'tencolour/showModal',
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
        type: 'tencolour/showModal',
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

Tencolour.propTypes = {
  tencolour: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ tencolour, loading }) => ({ tencolour, loading }))(Tencolour)
