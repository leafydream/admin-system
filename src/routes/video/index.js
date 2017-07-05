import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Gallery from './Gallery';
import Filter from './Filter';
import { Modal }  from 'antd';
import { parse } from 'qs';

class Video extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      videoData:{},
      checkedArray: [],
    };
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      videoData: record
    });
    // console.log(this.state.imageData);
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({ visible: false, }, () => {
    //   this.refs.video.focus(video.pause())
    this.refs.video.pause()

    });
  }

  render(){
    const VM = this
    const { location, dispatch, video, loading } = this.props;
    const { videolist, videoArray, pagination, currentItem, modalVisible, modalType, isMotion } = video;
    const { pageSize } = pagination;
    const that = this

    const filterProps = {
      filter: {
        ...location.query,
      },
      onFilterChange (value) {

        const payload = value
        if (payload.valleyCode) {
            payload.valleyCode = payload.valleyCode
        }

        if (payload.userId) {
            payload.userId = payload.userId
        }
        const page = parse(location.search.substr(1))
        if(page.page){
            payload.page = page.page
        }
        if(page.pageSize){
            payload.pageSize = page.pageSize
        }


        dispatch(routerRedux.push({
          pathname: location.pathname,
          query: {
            ...value,
            startDate: value.createDate[0] !== undefined ? value.createDate[0].split('-').join('/') + " 00:00:00" : [],
            endDate: value.createDate[1] !== undefined ? value.createDate[1].split('-').join('/') + " 00:00:00" : [],
            page: 1,
            pageSize,
          },
        }))
      },
      onSearch (fieldsValue) {
        fieldsValue.keyword.length ? dispatch(routerRedux.push({
          pathname: '/user/video',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/user/video',
        }))
      },
      onAdd () {
        dispatch({
          type: 'video/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    };

    const galleryProps = {
        checkedArray: VM.state.checkedArray,
        dataSource:videolist,
        videos: videoArray,
        status: that.state.status,
        loading: loading.effects['video/query'],
        pagination,
        location,
        handleCheckBox(item, checked) {
            // console.log('handleCheckBox checked', checked);
            // console.log('handleCheckBox item',item,);
            if (checked === true) {
                VM.state.checkedArray.push(item.id)
                // console.log('checkedArray',checkedArray);
                VM.setState({checkedArray: VM.state.checkedArray})
            } else if (checked === false) {
                let index = VM.state.checkedArray.findIndex((i) => {
                    return i === item.id
                })
                // console.log('index:', index);
                // console.log('原来的 array', VM.state.checkedArray);
                VM.state.checkedArray.splice(index, 1)
                // console.log('后来的 array', VM.state.checkedArray);
                VM.setState({checkedArray: VM.state.checkedArray})
            }
        },
        onChange (page) {
          const { query, pathname } = location
          dispatch(routerRedux.push({
            pathname,
            query: {
              ...query,
              page: page,
            },
          }))
        },

        setStatus(status,page) {
            // console.log('setStatus:', status);
            let args = {}
            if (status === '正常') {
                args.status	= 0
            } else if(status === '违规') {
                args.status	= 1
            }
            // args.ids = checkedArray.join(',')
            // console.log('state',VM.state.checkedArray);
            args.ids = VM.state.checkedArray.join(',')
            // console.log('args.ids', args.ids);

            dispatch({
                type: 'video/updateStatus',
                payload: args,
                page: page,
            })
            VM.setState({checkedArray: []})

            // setTimeout(function(){
            //     window.location.reload();
            // },200);
        }
    }

    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        <Gallery {...galleryProps} handleShowVideo={this.showModal} />
        <Modal width={800} wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          footer={null}
        >
          <div>
            <video src={this.state.videoData.videoUrl} ref='video' width="740" height="600" alt="" controls="controls" />
          </div>
        </Modal>

      </div>
    )
  }
}

Video.propTypes = {
  video: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(
  ({ video, loading }) => ({ video, loading })
)(Video);
