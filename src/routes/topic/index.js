import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './List';
import Filter from './Filter';
import { Modal }  from 'antd';
import { parse } from 'qs';

class Topic extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      imageData:{}
    };
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      imageData: record
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render(){
    // console.log(this.props);
    const { location, dispatch, topic, loading } = this.props;
    const { topiclist, pagination, currentItem, modalVisible, modalType, isMotion } = topic;
    const { pageSize } = pagination;
    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects['tencolour/update'],
    };
    const listProps = {
      dataSource: topiclist.list,
      loading: loading.effects['topic/topiclist'],
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
          type: 'topic/delete',
          payload: id,
        })
      },
      onEditItem (item) {
        dispatch({
          type: 'topic/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    };

    const filterProps = {
      filter: {
        ...location.query,
      },
      onFilterChange (value) {
        const payload = value
        if (payload.sex) {
            payload.sex = payload.sex
        }
        if (payload.id) {
            payload.id = payload.id
        }
        if (payload.status) {
            payload.status = payload.status
        }
        if (payload.valleyCode) {
            payload.valleyCode = payload.valleyCode
        }
        if (payload.title) {
            payload.title = payload.title
        }
        if (payload.userId) {
            payload.userId = payload.userId
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
            ...value,
            page: 1,
            pageSize,
          },
        }))
      },
      onSearch (fieldsValue) {
        fieldsValue.keyword.length ? dispatch(routerRedux.push({
          pathname: '/tencolourValley/topic',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/tencolourValley/topic',
        }))
      },
      onAdd () {
        dispatch({
          type: 'topic/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    };

    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        <List {...listProps} handleShowImage={this.showModal} />
        <Modal width="800" wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
               footer={null}
        >
          <div>
            <img src={this.state.imageData.cover} width="740" height="600" alt=""/>
          </div>
        </Modal>
      </div>
    )
  }
}

Topic.propTypes = {
  tencolour: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(
  ({ topic, loading }) => ({ topic, loading })
)(Topic);
