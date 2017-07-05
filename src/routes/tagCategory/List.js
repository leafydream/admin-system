import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import reactCSS from 'reactcss'
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      className: styles.avatar
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 150,
    }, {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
      width: 150,
    }, {
      title: '标签类别名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => text === 'DISPLAY' ? '展示' : '隐藏',
    }, {
      title: '字体颜色',
      dataIndex: 'color',
      key: 'color',
      width: 150,
      render: (c, record) =>  <div style={{display: 'inline-block', width: '36px', height: '14px', borderRadius: '2px', background: `${c.replace('0x', '#')}`}} />
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 150,
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.cover}`} width="80"  height="80"  />
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }]} />
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
