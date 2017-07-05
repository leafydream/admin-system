import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Modal }  from 'antd';
import List from './List';
import Filter from './Filter';
import Silder from './Silder';

class NewsLibList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      visible: false,
      imageData:{},
      checkItemArr: []
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

  handleClick = ()=>{
    this.setState({
      open: !this.state.open
    });
  };
  handleSubmit =(data)=>{
    const { dispatch } = this.props;
    if(data){
      /*dispatch({
        type: 'newsLib/addNews',
        payload: {
          ...data,
          fromLib: true
        },
      });*/
      dispatch({
        type: 'newsLib/update',
        payload: {
          ...data,
          toNews: true
        },
      })
    }
  }
  handleCheckItem = (checkItemArr)=>{
    this.setState({
      checkItemArr: checkItemArr
    });
  }
  handlePutWarehouse = ()=>{
    const checkItemArr = this.state.checkItemArr;
    const { dispatch } = this.props;
    let curstate = this.state;
    if(checkItemArr.length){
      dispatch({
        type: 'newsLib/newsLibPutWarehouse',
        payload: {
          checkItemArr:checkItemArr,
          curstate:curstate
        }
      })
    }
  }
  onEditItem (item) {
    const { dispatch } = this.props;
    this.handleClick();
    dispatch({
      type: 'newsLib/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    });
    dispatch({
      type: 'newsLib/queryNewsLib',
      payload: {
        id: item.id,
      },
    });
  }

  render(){
    const { location, dispatch, newsLib, loading } = this.props;
    const { newsLibList, categoryList, pagination, isMotion, currentItem, modalType, newsLibItem } = newsLib;

    const { pageSize } = pagination;
    const listProps = {
      dataSource: newsLibList.list,
      loading: loading.effects['newsLib/list'],
      pagination,
      location,
      isMotion,
      selectedRowKeys:this.state.checkItemArr,
      handleCheckItem: this.handleCheckItem,
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
      onDeleteItem (id) {
        dispatch({
          type: 'newsLib/delete',
          payload: id,
        });
      }
    };

    const filterProps = {
      filter: {
        ...location.query,
      },
      handlePutWarehouse: this.handlePutWarehouse,
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
          pathname: '/newsLib/list',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/newsLib/list',
        }))
      }
    };

    const silderProps = {
      open: this.state.open,
      currentItem,
      categoryList,
      newsLibItem,
      handleSubmit: this.handleSubmit,
      handleClick: this.handleClick
    };
    return (
      <div>
        <Filter {...filterProps}/>
        <List {...listProps} onEditItem={this.onEditItem.bind(this)} handleShowImage={this.showModal}/>
        <Silder {...silderProps}/>
        <Modal width="800" wrapClassName="vertical-center-modal"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               footer={null}
        >
          <div>
            <img src={this.state.imageData.thumbnails} width="740" height="600" alt=""/>
          </div>
        </Modal>
      </div>
    )
  }
}

NewsLibList.propTypes = {
  newsLib: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(
  ({ newsLib, loading }) => ({ newsLib, loading })
)(NewsLibList);
