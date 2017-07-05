import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Select } from 'antd';
import classnames from 'classnames';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import { DropOption } from '../../components';

import { dateFormat, formatSEX } from '../../utils';
import styles from './List.less';

const confirm = Modal.confirm;
const Option = Select.Option;

const List = ({ onDeleteItem, onEditItem,isMotion, location, handleShowImage, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  };
  const handleClick = (record, e)=>{
    handleShowImage(record);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
      render: (text, record) => {
        return <span>{ text ? text : `未填写` }</span>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record)=>{
        return <span>{ text===`ORIGINAL` ? `原创` : `转发` }</span>
      }
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      key: 'updateBy'
    },
    {
      title: '资讯缩略图',
      dataIndex: 'thumbnails',
      key: 'thumbnails',
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.title}`} width="140"  height="100"  onClick={e => handleClick(record, e)} style={{cursor:`pointer`}} />
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) =>{
        return <span>{ text=="0" ? "正常" : "删除" }</span>
      }
    },
    {
      title: '是否来自资讯库',
      dataIndex: 'fromLib',
      key: 'fromLib',
      render: (text, record) =>{
        return <span>{ text ? "是" : "否" }</span>
      }
    },
    {
      title: '资讯链接',
      dataIndex: 'url',
      key: 'url',
      render: (text, record) =>{
        return <a target='_blank' href={text}>{text}</a>
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
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    }
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
