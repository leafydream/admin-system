import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Select } from 'antd';
import classnames from 'classnames';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import { DropOption } from '../../components';
import { dateFormat } from '../../utils';
import styles from './List.less';
const confirm = Modal.confirm;
const Option = Select.Option;

const List = ({ onDeleteItem, onEditItem,isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    }
    /*else if (e.key === '2') {
      confirm({
        title: '确定要删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }*/
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '资讯类别',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span>{ text ? text : `未填写` }</span>
      }
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      key: 'updateBy'
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
      title: '资讯类别显示顺序',
      dataIndex: 'position',
      key: 'position',
      render: (text, record) =>{
        return <span>{`第${text}位`}</span>
      }
    },
    {
      title: '数据是否来自第三方公司',
      dataIndex: 'external',
      key: 'external',
      render: (text, record) =>{
        function getExternal(external) {
          if(external){
            return `是`;
          }else if(external==false){
            return `否`;
          }else{
            return `未填写`;
          }
        }
        return <span>{getExternal(record.external)}</span>
      }
    },
    {
      title: '数据对接ID',
      dataIndex: 'externalId',
      key: 'externalId',
      render: (text, record) =>{
        return <span>
          {
            record.externalId ? record.externalId : `未填写`
          }
          </span>
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
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }]} />
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
