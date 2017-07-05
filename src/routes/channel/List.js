import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps, handleShowImage }) => {
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
  }
  const handleClick = (record, e)=>{
    handleShowImage(record);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      className: styles.avatar
    }, {
      title: '创建者',
      dataIndex: 'createBy',
      key: 'createBy',
      width: 100,
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 150,
    }, {
      title: '更新者',
      dataIndex: 'updateBy',
      key: 'updateBy',
      width: 100,
    }, {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
      width: 150,
    }, {
      title: '栏目名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    }, {
      title: '排序',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 100,
    }, {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.cover}`} width="140"  height="100"  onClick={e => handleClick(record, e)} style={{cursor:`pointer`}} />
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

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
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
