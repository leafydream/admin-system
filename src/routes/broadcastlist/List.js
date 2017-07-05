import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const List = ({ onChangeItem, isMotion, location, handleShowImage, handleClick, ...tableProps }) => {
  const handleShoeModel = (record, e)=>{
    //   console.log('record',record);
    handleShowImage(record);
  };

  const handleShowDrawerClick = (id)=>{
    handleClick(id);
  }

  const handleMenuClick = (record, e) => {
    // console.log('record',record, 'e', e);
    let prama = {
        id: record.id,
        status: e.key,
    }
    onChangeItem(prama)
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
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
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 150,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'contentType',
      key: 'contentType',
      width: 100,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => {
        //   console.log('text',text);
        //   console.log('record',record);
          if (record.contentType === "PHOTOS") {
            //   console.log('photorecord',record.contentType);
            if (  text !== null ) {
                text = text.split(' ')
                //  console.log('text',text);
                 text = text.map((text, index) => <img key={index} src={text}  width="140"  height="100"  onClick={e => handleShoeModel({...record, content:text}, e)}  style={{cursor:`pointer`}} />)
            } else {
                 text=`暂无内容`
            }
        }  else if (record.contentType === "PHOTO") {
            if (  text !== null ) {
                text = <img src={text}  width="140"  height="100"  onClick={e => handleShoeModel({...record}, e)}  style={{cursor:`pointer`}} />
            } else {
                 text=`暂无内容`
            }
        }  else if (record.contentType === "VIDEOS") {
            if (text !== null) {
                text = text.split(' ')
                text = text.map((text, index) => <img key={index} src={`${record.videoCover}`}  width="140"  height="100"  onClick={e => handleShoeModel({...record, content:text}, e)}  style={{cursor:`pointer`}} />)

            }else {
                 text=`暂无内容`
            }
        }
        else if (record.contentType === "VIDEO") {
            if (  text !== null ) {
                // console.log('text',text);

                text = <img src={`${record.videoCover}`}  width="140"  height="100"  onClick={e => handleShoeModel({...record}, e)}  style={{cursor:`pointer`}} />

            } else {
                 text=`暂无内容`
            }
        }
        else if (record.contentType === "VOICE") {
            if (text !== null) {
                text = <img src='http://pic.58pic.com/58pic/15/48/05/97d58PICQNW_1024.png'  width="60"  height="60"  onClick={e => handleShoeModel({...record}, e)}  style={{cursor:`pointer`}} />
            }else {
                 text=`暂无内容`
            }
        } else if (record.contentType === null) {
            text= ``
        }
          return text

      }
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 100,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      key: 'commentCount',
      render: (text, record) => <span onClick={() => (handleShowDrawerClick(record.id))} style={{cursor:`pointer`,color:`#2196F3`}}>{text}</span>
    },{
      title: '点赞数',
      dataIndex: 'favourCount',
      key: 'favourCount',
    },{
      title: '转发数',
      dataIndex: 'quotedCount',
      key: 'quotedCount',
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
