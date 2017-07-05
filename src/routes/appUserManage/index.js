import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { parse } from 'qs';

import DataList from '../../components/DataList';
import Filter from '../../components/DataFilter';

const UserList = ({ location, dispatch, user, loading }) => {
  const { userList, pagination, currentItem, modalVisible, modalType, isMotion } = user;
  const { pageSize } = pagination;
  const listData = {
    dataSource: userList.list,
    loading: loading.effects['user/getUserList'],
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
        }
      }))
    }
  };
  const filterData = {
    filter: {
      ...location.query
    },
    onFilterChange(value){
      let result = value;
      const page = parse(location.search.substr(1));
      if (result.sex) {
        if (result.sex[0] === "男") {
          result.sex = 1
        } else if(result.sex[0] === "女") {
          result.sex = 2
        }
      }

      if(result.regStage){
        if(result.regStage[0] === `还未选择城市`){
          result.regStage = 0;
        }else if(result.regStage[0] === `还未生成专属精灵`){
          result.regStage = 1;
        }else if(result.regStage[0] === `完成注册`){
          result.regStage = 2;
        }
      }

      if(result.registerType){
        if(result.registerType[0] === `手机`){
          result.registerType = 1;
        }else if(result.registerType[0] === `微信`){
          result.registerType = 2;
        }else if(result.registerType[0] === `QQ`){
          result.registerType = 3;
        }
      }

      if (result.valleyCode) {
        if (result.valleyCode[0] === "玄谷") {
          result.valleyCode = 'black'
        } else if(result.valleyCode[0] === "金谷") {
          result.valleyCode = 'gold'
        } else if(result.valleyCode[0] === "月谷") {
          result.valleyCode = 'moon'
        } else if(result.valleyCode[0] === "空谷") {
          result.valleyCode = 'vain'
        } else if(result.valleyCode[0] === "清谷") {
          result.valleyCode = 'pure'
        } else if(result.valleyCode[0] === "涌谷") {
          result.valleyCode = 'surge'
        } else if(result.valleyCode[0] === "迷谷") {
          result.valleyCode = 'wander'
        } else if(result.valleyCode[0] === "火谷") {
          result.valleyCode = 'fire'
        } else if(result.valleyCode[0] === "星谷") {
          result.valleyCode = 'star'
        } else if(result.valleyCode[0] === "沙谷") {
          result.valleyCode = 'sand'
        }
      }

      if(page.page)result.page = page.page;
      if(page.pageSize)result.pageSize = page.pageSize;

      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/user/getUserList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        },
      })) : dispatch(routerRedux.push({
        pathname: '/user/getUserList'
      }))
    }
  };

  return (
    <div className="content-inner">
      <Filter  {...filterData}/>
      <DataList {...listData} />
    </div>
  )
};


UserList.propTypes = {
  uesr: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(
  ({ user, loading }) => ({ user, loading })
)(UserList);
