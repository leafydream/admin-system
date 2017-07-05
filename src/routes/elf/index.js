import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import CreateModal from './Modal'
import { Modal }  from 'antd';

class Elf extends Component {
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
      const { location, dispatch, elf, loading } = this.props;
      const { list,selectData, pagination, currentItem, modalVisible, modalType, isMotion } = elf
      const { pageSize } = pagination
      const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects['elf/update'],
        title: `${modalType === 'create' ? '添加精灵' : '精灵修改'}`,
        wrapClassName: 'vertical-center-modal',
        disabled: modalType === 'update',
        select:selectData,
        onOk (data) {
            // console.log('modalType is :', modalType);
          dispatch({
            type: `elf/${modalType}`,
            payload: data,
          })
        },
        onCancel () {
          dispatch({
            type: 'elf/hideModal',
          })
        },
      }

      const listProps = {
        dataSource: list.list,
        loading: loading.effects['elf/list'],
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
            type: 'elf/delete',
            payload: id,
          })
        },
        onEditItem (item) {
          dispatch({
            type: 'elf/showModal',
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
            type: 'elf/showModal',
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
              <img src={this.state.imageData.backgroundImg} width="740" height="600" alt=""/>
            </div>
          </Modal>
        </div>
      )
    }
}

Elf.propTypes = {
  elf: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ elf, loading }) => ({ elf, loading }))(Elf)
