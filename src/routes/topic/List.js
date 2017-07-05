import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps, handleShowImage }) => {
  const handleClick = (record, e)=>{
    handleShowImage(record);
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
      title: '话题标题',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: '封面类型',
      dataIndex: 'coverType',
      key: 'coverType',
    },
    {
      title: '封面图片',
      dataIndex: 'cover',
      key: 'cover',
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.title}`} width="140"  height="100"  onClick={e => handleClick(record, e)} style={{cursor:`pointer`}} />
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => text === 1 ? '男生' : '女生',

    },
    {
      title: '谷名',
      dataIndex: 'valleyCode',
      key: 'valleyCode',
      render : (text, record) => {
          if (record.valleyCode === 'black') {
              text = `玄谷`
          } else if (record.valleyCode === 'gold') {
              text = `金谷`
          } else if (record.valleyCode === 'moon') {
              text = `月谷`
          } else if (record.valleyCode === 'vain') {
              text = `空谷`
          } else if (record.valleyCode === 'pure') {
              text = `清谷`
          } else if (record.valleyCode === 'surge') {
              text = `泉谷`
          } else if (record.valleyCode === 'wander') {
              text = `迷谷`
          } else if (record.valleyCode === 'fire') {
              text = `火谷`
          } else if (record.valleyCode === 'star') {
              text = `炫谷`
          } else if (record.valleyCode === 'sand') {
              text = `沙谷`
          }

          return text
      }
    },{
      title: '话题状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => text === 0 ? '开放' : '关闭',
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
