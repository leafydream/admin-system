import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './List';
import { Modal }  from 'antd';
import { parse } from 'qs';

const Commentlist = ({  location, dispatch, comment, loading }) => {
    const { commentlist, pagination, currentItem, modalVisible, modalType, isMotion } = comment;
    const { pageSize } = pagination;

    const listProps = {
      dataSource: commentlist,
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
      onChangeItem (payload) {
        dispatch({
          type: 'comment/statusChange',
          payload,
        })
      },

    };


    return (
      <div className="content-inner">
        <List {...listProps} />

      </div>
    )
  }


Commentlist.propTypes = {
  comment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  }


export default connect(({ comment, loading }) => ({ comment, loading })
)(Commentlist);
