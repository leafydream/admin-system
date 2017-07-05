import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './List';
import Filter from './Filter';
import { Modal }  from 'antd';
import { parse } from 'qs';


import Silder from './silder';


class Broadcast extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      allData:{},

    };
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      allData: record
    });
    // console.log('选中的url', this.state.allData);
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
      this.setState({ visible: false }, () => {
        if (this.refs.videoAll) {
            this.refs.videoAll.pause()
        }
    });
  }

  noSilder = () => {
    this.setState({
      open: false
    });
  }

  render(){
    const { location, dispatch, broadcast, loading } = this.props;
    const { broadcastlist, pagination, currentItem, modalVisible, modalType, isMotion, commentList } = broadcast;
    const { pageSize } = pagination;
    const handleClick = (id) => {
        // console.log('select id', id);
        this.setState({
            open: true
        });
        dispatch({
            type: "broadcast/comment",
            payload: {
                id
            }
        })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects['broadcast/update'],
    };
    const listProps = {
      dataSource: broadcastlist.list,
      loading: loading.effects['broadcast/query'],
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
          type: 'broadcast/statusChange',
          payload,
        })
      },

    };

    const filterProps = {
      filter: {
        ...location.query,
      },
      onFilterChange (value) {
        dispatch(routerRedux.push({
          pathname: location.pathname,
          query: {
            ...value,
            startDate: value.createDate[0] !== undefined ? value.createDate[0].split('-').join('/') + " 00:00:00" : [],
            endDate: value.createDate[1] !== undefined ? value.createDate[1].split('-').join('/') + " 00:00:00" : [],
            page: 1,
            pageSize,
          },
        }))
      },
      onSearch (fieldsValue) {
        fieldsValue.keyword.length ? dispatch(routerRedux.push({
          pathname: '/broadcast/list',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/broadcast/list',
        }))
      },
      onAdd () {
        dispatch({
          type: 'broadcast/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    };

    // 这里得到　type的值
      let type = this.state.allData.contentType
      let url = this.state.allData.content
      const m = ["VIDEO", "PHOTO", "PHOTOS", "VIDEOS", "VOICE"]
      const index = m.indexOf(String(type))
    //   console.log('index',index);
    //   console.log('url',url);
    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        <List {...listProps} handleShowImage={this.showModal} handleClick={handleClick}/>
        <Modal width={800} wrapClassName="vertical-center-modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel.bind(this)}
            footer={null}
        >
            <div>
                {(index === 1 || index === 2) && <img src={url} width="740" height="600" alt=""/>}
                {(index === 0 || index === 3) && <video src={url} ref='videoAll' width="740" height="600" alt="" controls="controls" />}
                {(index === 4) && <audio ref='videoAll' src={url} width="740" height="640" alt="" controls="controls" />}
            </div>
        </Modal>

        <Silder title={`编辑评论`} open={this.state.open} data={commentList} displayNone={::this.noSilder} dispatch={dispatch} />
      </div>
    )
  }
}

Broadcast.propTypes = {
  broadcast: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(
  ({ broadcast, loading }) => ({ broadcast, loading })
)(Broadcast);
