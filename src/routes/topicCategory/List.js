import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

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
      title: '话题类别名',
      dataIndex: 'name',
      key: 'name'
    }, {
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
    }, {
      title: '正常图标',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.cover}`} width="80"  height="80"  />
      }
    }, {
      title: '选中图标',
      dataIndex: 'clickedIcon',
      key: 'clickedIcon',
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.cover}`} width="80"  height="80"  />
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => text === 0 ? '开放' : '关闭',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
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
