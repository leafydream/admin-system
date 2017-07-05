import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Modal }  from 'antd';
import AddBtn from './AddBtn';
import List from './List';
import Silder from './Silder';
import Filter from './Filter';

class NewsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
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

  handleClick = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: `news/changType`,
      payload:{
        modalType: 'create'
      }
    });
    this.setState({
      open: !this.state.open
    });

  };
  handleSubmit =(data)=>{
    const { dispatch, news } = this.props;
    const modalType = news.modalType == 'update' ? 'update' : 'add';
    if(data){
      dispatch({
        type: `news/${modalType}`,
        payload: {
          ...data,
          fromLib: false
        },
      })
    }
  }
  onEditItem (item) {
    const { dispatch } = this.props;
    this.setState({
      open: !this.state.open
    });
    dispatch({
      type: 'news/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    });
    dispatch({
      type: 'news/getNewsDetails',
      payload: {
        id: item.id,
      },
    })
  }

  render(){
    const { location, dispatch, news, loading } = this.props;
    const { newsList, categoryList ,pagination, isMotion, currentItem, newsDetails, modalType } = news;
    const { pageSize } = pagination;
    const listData = {
      dataSource: newsList.list,
      loading: loading.effects['news/getNewsList'],
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
      onDeleteItem (id) {
        dispatch({
          type: 'news/delete',
          payload: id,
        });
      },

    };
    const silderProps = {
      open: this.state.open,
      currentItem,
      categoryList,
      newsDetails,
      modalType,
      handleSubmit: this.handleSubmit,
      handleClick: this.handleClick
    };

    const filterProps = {
      filter: {
        ...location.query,
      },
      categoryList: categoryList,
      handlePutWarehouse: this.handlePutWarehouse,
      handleClick: this.handleClick,
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
    return (
      <div>
        <Filter {...filterProps}/>
        <List {...listData} onEditItem={this.onEditItem.bind(this)} handleShowImage={this.showModal}/>
        <Silder {...silderProps}/>
        <Modal width="800" wrapClassName="vertical-center-modal"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               footer={null}>
          <div>
            <img src={this.state.imageData.thumbnails} width="740" height="600" alt=""/>
          </div>
        </Modal>
      </div>
    )
  }
}

NewsList.propTypes = {
  news: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(
  ({ news, loading }) => ({ news, loading })
)(NewsList);
