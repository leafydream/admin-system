import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './List';
import AddBtn from './AddBtn';
import Modal from './Modal'

const NewsCategoryList = ({ location, dispatch, newsCategory, loading }) => {
  const { newsCategoryList ,pagination, isMotion, currentItem, modalType, modalVisible } = newsCategory;
  const { pageSize } = pagination;
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['newsCategory/update'],
    title: `${modalType === 'create' ? '添加资讯类别' : '修改资讯类别'}`,
    wrapClassName: 'vertical-center-modal',
    disabled: modalType === 'update',
    onOk (data) {
      dispatch({
        type: `newsCategory/add`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'newsCategory/hideModal',
      })
    },
  };
  const listProps = {
    dataSource: newsCategoryList,
    loading: loading.effects['newsCategory/getNewsCategoryList'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onEditItem (item) {
      dispatch({
        type: 'newsCategory/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    }
  };
  const filterProps = {
    onAdd () {
      dispatch({
        type: 'newsCategory/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  };
  return (
    <div>
      <AddBtn {...filterProps}/>
      <List {...listProps}/>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
};

NewsCategoryList.propTypes = {
  newsCategory: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(
  ({ newsCategory, loading }) => ({ newsCategory, loading })
)(NewsCategoryList);
