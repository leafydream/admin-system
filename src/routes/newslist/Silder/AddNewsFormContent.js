import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Upload, Icon, Select, notification } from 'antd';
import { EditorState, AtomicBlockUtils,convertToRaw,convertFromRaw, convertFromHTML, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from '../../../components';
const FormItem = Form.Item;
const Option = Select.Option;
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class AddNewsFormContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      editorContent: undefined,
      contentState: '',
      editorState: EditorState.createEmpty(),
      uploadImageList: [],
      thumbImage: '',
      categoryList: props.categoryList,
      initialVal: {}
    }
  }
  handleChange = ({ file, fileList }) => {
    this.setState({
      fileList: fileList
    },()=>{
      if(file.status === "done"){
        this.setState({
          uploadImageList: this.state.uploadImageList.concat({
            uid: file.uid,
            thumbnails: file.response.data
          })
        });
      }
    });
  };
  handleRemove = (file)=>{
    let imageList = this.state.uploadImageList.filter( item =>{
      return item.uid != file.uid;
    });
    this.setState({
      uploadImageList: imageList
    });
    return true;
  };

  handleCommit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { editorState, uploadImageList } = this.state;
      let content = '';
      let contentJson = '';
      if(editorState){
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        content = draftToHtml(rawContentState);
        contentJson = JSON.stringify(rawContentState);

        //content = stateToHTML(editorState.getCurrentContent());
      }
      let commitData = values;
      commitData.content = content;
      commitData.contentJson = contentJson;
      commitData.thumbnails =  this.state.thumbImage;
      if(uploadImageList.length){
        let imageArr = [];
        for(let i=0,len=uploadImageList.length;i<len;i++){
          imageArr.push(uploadImageList[i].thumbnails);
        }
        commitData.imgUrls = imageArr.join(' ');
      }
      this.props.handleSubmit(commitData);
      this.handleReset();
    })
  };

  handleReset = () => {
    this.handleInitState();
    this.props.handleClick();
  };
  handleInitState = ()=>{
    this.props.form.resetFields();
    this.setState({
      fileList: [],
      editorContent: undefined,
      contentState: '',
      editorState: EditorState.createEmpty(),
      uploadImageList: [],
      thumbImage: '',
      initialVal: {}
    });
  };
  onEditorChange = (editorContent) => {
    this.setState({
      editorContent
    });
  };
  clearContent = () => {
    this.setState({
      contentState: '',
    });
  };
  onContentStateChange = (contentState) => {
    console.log('contentState', contentState);
  };
  onEditorStateChange = (editorState) => {
    let selectionState = editorState.getSelection();
    let anchorKey = selectionState.getAnchorKey();
    let currentContent = editorState.getCurrentContent();
    let currentContentBlock = currentContent.getBlockForKey(anchorKey);
    let start = selectionState.getStartOffset();
    let end = selectionState.getEndOffset();
    let selectedText = currentContentBlock.getText().slice(start, end);
    this.setState({
      editorState,
    });
  };

  handleSetThumb(item){
    if(item.thumbnails){
      this.props.currentItem.thumbnails = item.thumbnails;
      this.setState({
        thumbImage: item.thumbnails
      },()=>{
        this.openNotification({
          message: '设置成功',
          description: `成功设置为缩略图.`,
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        });
      });
    }
  };

  openNotification = (msg) => {
    notification.open(msg);
  };

  handleSetNewsImage(item){
    const url = item.thumbnails;
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      {src: url, width: `auto`, height: `auto`}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState,entityKey,' ')
    })
  };
  componentWillReceiveProps(newProps){
    const { categoryList, newsDetails , modalType } = newProps;
    let editState = null;
    if(modalType == 'update'){
      if(newsDetails.contentJson){
          let state = convertFromRaw(JSON.parse(newsDetails.contentJson));
          editState = EditorState.createWithContent(state);
      }else if(newsDetails.content){
          const blocksFromHTML = convertFromHTML(newsDetails.content);
          const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
          );
          editState = EditorState.createWithContent(state);
      }
      let imageArr = [];
      if(newsDetails.imgUrls){
        if(newsDetails.imgUrls.indexOf(newsDetails.thumbnails)==-1){
          imageArr.push({
            thumbnails: newsDetails.thumbnails
          });
        }
        let arr  = newsDetails.imgUrls.split(" ");
        for(let i=0;i<arr.length;i++){
          imageArr.push({
            thumbnails: arr[i]
          });
        }
      }

      this.setState({
        uploadImageList: imageArr,
        categoryList: categoryList,
        initialVal: newsDetails,
        thumbImage: newsDetails.thumbnails ? newsDetails.thumbnails : '',
        editorState: editState ? editState : this.state.editorState
      });
    }else{
      this.setState({
        fileList: [],
        editorContent: undefined,
        contentState: '',
        editorState: EditorState.createEmpty(),
        uploadImageList: [],
        thumbImage: '',
        initialVal: {}
      });
    }
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList, uploadImageList, categoryList, editorState, initialVal } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div style={{padding: `20px 0 `}}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleCommit}
        >
          <Row>
            <Col span={24} key="1" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 3}} label={`资讯标题`}>
                {getFieldDecorator(`title`,{ initialValue: initialVal.title })(
                  <Input size="large" placeholder={`请输入资讯标题`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="2" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 3}} label={`资讯类别`}>
                {getFieldDecorator('catId',{ initialValue: initialVal.catId })(
                  <Select style={{ width: '100%' }}  placeholder="请选择资讯类别" >
                    {
                      categoryList.length ? categoryList.map((item,index)=>{
                        return <Option value={item.id} key={index}>{item.name}</Option>
                      }) :   <Option value="暂无数据">暂无数据</Option>
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24} key="3" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 3}} label={`资讯类型`}>
                {getFieldDecorator('type',{ initialValue: initialVal.type })(
                  <Select style={{ width: '100%' }} placeholder="请选择资讯类型" >
                    <Option value='ORIGINAL'> 原创 </Option>
                    <Option value='REPRODUCED'> 转发 </Option>
                  </Select>)}
              </FormItem>
            </Col>
            <Col span={24} key="4" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 3}} label={`内容类型`}>
                {getFieldDecorator('contentType',{ initialValue: initialVal.contentType })(
                  <Select style={{ width: '100%' }} placeholder="请选择内容类型" >
                    <Option value='PHOTO'>图片</Option>
                    <Option value='VIDEO'>视频</Option>
                    <Option value='VOICE'>音频</Option>
                    <Option value='TEXT'>文本</Option>
                  </Select>)}
              </FormItem>
            </Col>
            <Col span={24} key="5" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 5}} label={`文章作者`}>
                {getFieldDecorator(`author`, { initialValue: initialVal.author })(
                  <Input size="large" placeholder={`请输入作者`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="6" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 5}} label={`资讯标签`}>
                {getFieldDecorator(`labels`,{ initialValue: initialVal.labels })(
                  <Input size="large" placeholder={`请输入资讯标签`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="7" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 5}} label={`资讯来源`}>
                {getFieldDecorator(`origin`, { initialValue: initialVal.origin })(
                  <Input size="large" placeholder={`请输入资讯来源`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="8" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 5}} label={`资讯来源url`}>
                {getFieldDecorator(`originUrl`,{ initialValue: initialVal.originUrl })(
                  <Input size="large" placeholder={`请输入资讯来源url`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="9" >
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 6}} label={`导语`}>
                {getFieldDecorator(`intro`,{ initialValue: initialVal.intro })(
                  <Input type="textarea" size="large" placeholder={`请输入导语`} autosize={{ minRows: 4, maxRows: 8 }}/>
                )}
              </FormItem>
            </Col>
            <Col span={24} key="10">
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 8}} label={`上传图片`}>
                <Upload
                  action="https://backend-test.10colour.com/upload"
                  listType="picture-card"
                  multiple={true}
                  fileList={fileList}
                  onChange={this.handleChange}
                  withCredentials={true}
                  onPreview={this.handlePreview}
                  onRemove={this.handleRemove}
                >
                  { fileList.length >= 10 ? null : uploadButton }
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row style={{display: uploadImageList.length ? `block` : `none`}}>
            <Col>
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 12}} label={`已上传图片`}>
                {
                  uploadImageList.length ? uploadImageList.map((item,index)=>{
                    return(
                      <div style={{padding: `10px`, float: `left`}} key={index}>
                        <p><img  width="180" height="100" src={item.thumbnails} style={{borderRadius: 3 , border: 'none'}}/></p>
                        <Button size="small" onClick={this.handleSetThumb.bind(this,item)} style={{ border: (this.props.currentItem&&item.thumbnails ==　this.props.currentItem.thumbnails) ? "1px solid #108ee9" : '1px solid #e5e5e5'}}>设置为缩略图</Button>
                        <Button size="small" style={{ marginLeft: 5 }} onClick={this.handleSetNewsImage.bind(this,item)}>插入资讯内容</Button>
                      </div>
                    )
                  }) : ''
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem labelCol={{span: 2}} wrapperCol={{span: 21}} label={`资讯内容`}>
                <Editor
                  wrapperStyle={{
                    maxHeight: 476,
                    maxWidth: 780
                  }}
                  editorStyle={{
                    minHeight: 360,
                    maxHeight: 360
                  }}
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                  onContentStateChange={this.onEditorChange}
                  toolbar={{
                    options: [
                      'inline', 'blockType', 'fontSize', 'fontFamily',
                      'list', 'textAlign', 'colorPicker', 'link',
                      'emoji', 'remove', 'history'
                    ],
                    history: { inDropdown: true },
                    inline: { inDropdown: false },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    fontFamily: {
                      options: ['宋体', '微软雅黑', '楷体','黑体', '隶书', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                    }
                  }}
                  placeholder="请输入资讯内容..."
                  spellCheck
                  localization={{ locale: 'zh' }}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: `center`}}>
              <Button size="large" type="primary" htmlType="submit" >提交</Button>
              <Button size="large" style={{ marginLeft: 15 }} onClick={this.handleReset}>
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

AddNewsFormContent.PropTypes = {
  previewVisible: PropTypes.bool,
  previewImage: PropTypes.string,
  fileList: PropTypes.array,
  editorContent: PropTypes.string,
  contentState: PropTypes.string,
  editorState: PropTypes.object,
  uploadImageList: PropTypes.array,
  thumbImage: PropTypes.string,
  categoryList: PropTypes.array,
  getFieldDecorator: PropTypes.func
};
export default Form.create()(AddNewsFormContent);
