import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const List = ({ onChangeItem, isMotion, location, ...tableProps, handleShowImage }) => {
  const handleClick = (record, e)=>{
    handleShowImage(record);
  };
  const handleMenuClick = (record, e) => {
    // console.log('record',record, 'e', e);
    let prama = {
        id: record.id,
        broadcastId: record.broadcastId,
        status: e.key,
    }
    onChangeItem(prama)
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      className: styles.avatar
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      width: 150,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 150,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '回复id',
      dataIndex: 'replyId',
      key: 'replyId',
      width: 80,
    },
    {
      title: '回复用户',
      dataIndex: 'replyUser',
      key: 'replyUser',
      width: 100,
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text, record) => text === 'VIOLATION' ? '违规' : '正常',
    },{
      title: '选择状态',
      width: 50,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'VIOLATION', name: '违规' }, { key: 'NORMAL', name: '正常' }]} />
      },
    },
  ];

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body };

  // const handleTableChange = (pagination, filters, sorter) => {
  //   let filter = {}
  //   filter.sex = filters.sex[0]
  //   console.log('filter',filter);
  //
  //   dispatch({
  //       type: 'topic/filterslist',
  //       filter,
  //
  //   })
  // }


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
