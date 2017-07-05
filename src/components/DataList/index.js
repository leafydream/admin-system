import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import classnames from 'classnames';
import AnimTableBody from '../../components/DataTable/AnimTableBody';

import { dateFormat, formatSEX } from '../../utils';
import styles from './List.less';

const List = ({ isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,

    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text, record) => {
        return <span>{ text ? text : `未填写` }</span>
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record)=>{
        return <span>{formatSEX(text)}</span>
      }
    },
    {
      title: '出生日期',
      dataIndex: 'bornDate',
      key: 'bornDate',
      width: 150,
      render: (text, record)=>{
        let getBornDate = date =>{
          let bornDate;
          if(date.bornYear || date.bornMonth || date.bornDay){
            bornDate = `${date.bornYear}-${date.bornMonth}-${date.bornDay}`;
          }else{
            bornDate = `未填写`;
          }
          return bornDate;
        };
        return <span>{getBornDate(record)}</span>
      }
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record)=>{
        return <span>{ text ? text : `未填写` }</span>
      }
    },
    {
      title: '所在位置',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) =>{
        let getLocation = loc =>{
          let locatoin = ``;
          if(loc.country){
            locatoin += `${loc.country}/`;
          }
          if(loc.province){
            locatoin += `${loc.province}`;
          }
          if(loc.city){
            locatoin += `/${loc.city}`;
          }
          if(!loc.country && !loc.province && !loc.city){
            locatoin = `未填写`;
          }
          return locatoin;
        };
        return <span>{getLocation(record)}</span>
      }
    },
    {
      title: '注册类型',
      dataIndex: 'registerType',
      key: 'registerType',
      render: (text, record) =>{
         let registerType = type =>{
            let regType;
            if(type === 1){
              regType = `手机`;
            }else if(type === 2){
              regType = `微信`;
            }else if(type === 3){
              regType = `QQ`;
            }
            return regType;
         };
        return <span>{registerType(text)}</span>
      }
    },
    {
      title: '注册阶段',
      dataIndex: 'regStage',
      key: 'regStage',
      render: (text, record) =>{
        let regStage = type =>{
          let stage;
          if(type === 0){
            stage = `还未选择城市`;
          }else if(type === 1){
            stage = `还未生成专属精灵`;
          }else if(type === 2){
            stage = `完成注册`;
          }
          return stage;
        };
        return <span>{regStage(text)}</span>
      }
    },
    {
      title: '所属谷',
      dataIndex: 'valleyName',
      key: 'valleyName',
      render: (text, record) =>{
        return <span>{text}</span>
      }
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      className: styles.avatar,
      render: (text, record) => {
        const getAvatarURL = ()=>{
          let avatarUrl = ``;
          if(record.headimgurl){
            avatarUrl = record.headimgurl;
          }else if(record.headimgurlQq){
            avatarUrl = record.headimgurlQq;
          }else if(record.headimgurlWx){
            avatarUrl = record.headimgurlWx;
          }
          return avatarUrl;
        };
        return (
          getAvatarURL() ? <img src={getAvatarURL()}  width="80"  height="80" /> : <span>暂无头像</span>
        )
      }
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text, record) =>{
        return <span>{dateFormat(text)}</span>
      }
    },
    {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: (text, record) =>{
        return <span>{dateFormat(text)}</span>
      }
    },
  ];

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body };

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
};

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object
};

export default List;
