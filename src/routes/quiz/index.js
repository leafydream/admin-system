import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Quiz = ({ location, dispatch, quiz, loading }) => {
  const { quizList, pagination, currentItem, modalVisible, modalType, isMotion } = quiz
  const { pageSize } = pagination
  // console.log('loading',loading)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['quiz/update'],
    title: `${modalType === 'create' ? '添加测试题' : '测试题修改'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
        // console.log('modalType is :', modalType);
      dispatch({
        type: `quiz/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'quiz/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: quizList,
    loading: loading.effects['quiz/quizlist'],
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
        type: 'quiz/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'quiz/showModal',
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
        type: 'quiz/showModal',
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

Quiz.propTypes = {
  tencolour: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ quiz, loading }) => ({ quiz, loading }))(Quiz)
