import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Gallery from './Gallery';
import Filter from './Filter';
import { Modal }  from 'antd';
import { parse } from 'qs';

class Photo extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      imageData:{},
      checkedArray: [],
    };
  }
  //
  // handleGallery = ( ) => {
  //     console.log('handleGallery');
  //     this.setState(( old ) => {
  //         console.log('old', old);
  //         return {
  //             ...old,
  //             status: old.status==1 ? 2 : 1,
  //         }
  //     });
  // }

  showModal = (record) => {
    this.setState({
      visible: true,
      imageData: record
    });
    // console.log(this.state.imageData);
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render(){
    const VM = this
    const { location, dispatch, photo, loading } = this.props;
    const { photolist, Photo, pagination, currentItem, modalVisible, modalType, isMotion } = photo;
    const { pageSize } = pagination;
    const that = this
    // console.log('Photo',Photo);
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
          pathname: '/user/photo',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/user/photo',
        }))
      },
      onAdd () {
        dispatch({
          type: 'photo/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    };

    const galleryProps = {
        checkedArray: VM.state.checkedArray,
        dataSource:photolist,
        imgs: Photo,
        status: that.state.status,
        loading: loading.effects['photo/query'],
        pagination,
        location,

        handleCheckBox(item, checked) {
            // console.log('handleCheckBox checked', item.checked);
            // console.log('handleCheckBox item',item);
            // console.log('state',VM.state);

            if (checked === true) {
                VM.state.checkedArray.push(item.id)
                VM.setState({checkedArray: VM.state.checkedArray})
            } else if (checked === false) {
                let index = VM.state.checkedArray.findIndex((i) => {
                    return i === item.id
                })
                // console.log('index:', index);
                // console.log('原来的 array', VM.state.checkedArray);
                VM.state.checkedArray.splice(index, 1)
                VM.setState({checkedArray: VM.state.checkedArray})
            }
            // console.log('state',VM.state);

            // dispatch({
            //     type: 'photo/changeChecked',
            //     item,
            //     checked,
            // })

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
            // console.log('state',VM.state);
            args.ids = VM.state.checkedArray.join(',')
            // dispatch({
            //     type: 'photo/changeAllChecked',
            // })
            dispatch({
                type: 'photo/updateStatus',
                payload: args,
                page: page,
            })
            VM.setState({checkedArray: []})
            // setTimeout(function(){
            //     // window.location.reload();
            // },100);
        }
    }

    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        <Gallery {...galleryProps} handleShowImage={this.showModal} />
        <Modal width={800} wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            <img src={this.state.imageData.imgUrl} width="740" height="600" alt=""/>
          </div>
        </Modal>

      </div>
    )
  }
}

Photo.propTypes = {
  photo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(
  ({ photo, loading }) => ({ photo, loading })
)(Photo);
