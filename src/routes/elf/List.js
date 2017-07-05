import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, handleShowImage, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    //   console.log('record',record)
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
      title: '精灵名称',
      dataIndex: 'name',
      key: 'name',
      width: 80
    }, {
      title: '精灵编号',
      dataIndex: 'serialNum',
      key: 'serialNum',
      width: 80
    }, {
      title: '男生头像',
      dataIndex: 'mainImg',
      key: 'mainImg',
      width: 150,
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.mainImg}`} width="100"  height="100" />
      }
    }, {
      title: '女生头像',
      dataIndex: 'girlMainImg',
      key: 'girlMainImg',
      width: 150,
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.girlMainImg}`} width="100"  height="100" />
      }
    }, {
      title: '精灵属性',
      dataIndex: 'attr',
      key: 'attr',
      width: 80
    }, {
      title: '所属谷',
      dataIndex: 'valleyCode',
      key: 'valleyCode',
      width: 80,
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
      title: '精灵技能',
      dataIndex: 'skill',
      key: 'skill',
      width: 80
    }, {
      title: '精灵装备',
      dataIndex: 'equipment',
      key: 'equipment',
      width: 80
    }, {
      title: '精灵简短介绍',
      dataIndex: 'shortIntro',
      key: 'shortIntro',
      width: 150,
    }, {
      title: '精灵详细介绍',
      dataIndex: 'intro',
      key: 'intro',
      width: 300,
    }, {
      title: '背景',
      dataIndex: 'backgroundImg',
      key: 'backgroundImg',
      width: 150,
      render: (text, record) => {
        return <img src={`${text}`} title={`${record.backgroundImg}`} width="140"  height="100"  onClick={e => handleClick(record, e)} style={{cursor:`pointer`}} />
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
