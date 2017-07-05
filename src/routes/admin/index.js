import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Admin = ({ location, dispatch, admin, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = admin
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['admin/update'],
    title: `${modalType === 'create' ? '添加管理员' : '管理员修改'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'update',
    onOk (data) {
       // console.log('modalType is :', modalType);
      dispatch({
        type: `admin/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'admin/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list.list,
    loading: loading.effects['admin/list'],
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
        type: 'admin/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'admin/showModal',
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
        type: 'admin/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'admin/switchIsMotion' })
    }
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Admin.propTypes = {
  admin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ admin, loading }) => ({ admin, loading }))(Admin)
