import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const CommentList = ({ onChangeComment, isMotion, location, ...tableProps }) => {

  const menuClick = (record) => {
    // console.log('record',record);
    let prama = {
        id: record.id,
        status: 'NORMAL',
    }
    // console.log('param s',prama.status);
    // onChangeComment(prama)
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      className: styles.avatar
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      width: 70,
    },{
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 70,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 80,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
      width: 150,
    },
    {
      title: '回复评论id',
      dataIndex: 'replyId',
      key: 'replyId',
      width: 30,
    },
    {
      title: '回复者',
      dataIndex: 'replyUser',
      key: 'replyUser',
      width: 50,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: (text, record) => text === 'VIOLATION' ? '违规' : '正常',
    },
    // {
    //   title: '选择状态',
    //   width: 50,
    //   render: (text, record) => {
    //       return <div>
    //       <Button style={{ margin: '8px' }} type="primary" ghost onClick={menuClick(record)}>正常</Button>
    //       <Button type="danger" ghost>违规</Button>
    //       </div>
    //
    //     return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'VIOLATION', name: '违规' }, { key: 'NORMAL', name: '正常' }]} />
    //   },
    // },
  ];

  // const getBodyWrapperProps = {
  //   page: location.query.page,
  //   current: tableProps.pagination.current,
  // };

  // const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body };



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
      />
    </div>
  )
};

CommentList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object
};

export default CommentList;
