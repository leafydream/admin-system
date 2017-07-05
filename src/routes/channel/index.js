import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import CreateModal from './Modal'
import { Modal }  from 'antd';

class Channel extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      imageData:{},
      bigvisible: false,
    };
  }

  showModal = (record) => {
    this.setState({
      bigvisible: true,
      imageData: record
    });
  }
  handleOk = () => {
    this.setState({
      bigvisible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      bigvisible: false,
    });
  }
  render(){
      const { location, dispatch, channel, loading } = this.props;
      const { channellist, pagination, currentItem, modalVisible, modalType, isMotion } = channel
      const { pageSize } = pagination
      // console.log('loading',loading)
      const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects['channel/update'],
        title: `${modalType === 'create' ? '添加栏目' : '栏目修改'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
            // console.log('modalType is :', modalType);
          dispatch({
            type: `channel/${modalType}`,
            payload: data,
          })
        },
        onCancel () {
          dispatch({
            type: 'channel/hideModal',
          })
        },
      }

      const listProps = {
        dataSource: channellist,
        loading: loading.effects['channel/query'],
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
            type: 'channel/delete',
            payload: id,
          })
        },
        onEditItem (item) {
          dispatch({
            type: 'channel/showModal',
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
            type: 'channel/showModal',
            payload: {
              modalType: 'create',
            },
          })
        },

      }

      return (
        <div className="content-inner">
            <Filter {...filterProps} />
            <List {...listProps} handleShowImage={this.showModal} />
            {modalVisible && <CreateModal {...modalProps} />}
            <Modal width={800} wrapClassName="vertical-center-modal"
              visible={this.state.bigvisible}
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

Channel.propTypes = {
  channel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ channel, loading }) => ({ channel, loading }))(Channel)
