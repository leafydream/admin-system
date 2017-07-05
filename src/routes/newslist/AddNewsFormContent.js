import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Cascader, Upload, Icon, Modal, Card } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from '../../components';
const FormItem = Form.Item;

const rawContentState = {"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"http://i.imgur.com/aMtBIep.png","height":"auto","width":"100%"}}},"blocks":[{"key":"9unl6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"95kn","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"7rjes","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};


class AddNewsFormContent extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    editorContent: undefined,
    contentState: rawContentState,
    editorState: '',
    uploadImageList: []
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ file, fileList }) => {
    this.setState({
      fileList: fileList
    },()=>{
      if(file.status === "done"){
        this.setState({
          uploadImageList: this.state.uploadImageList.concat(file)
        });
      }
    });
  };

  handleRemove = (file)=>{
    let imageList = this.state.uploadImageList.filter((item,index)=>{
        return item.uid != file.uid;
    });
    this.setState({
      uploadImageList: imageList
    });
    return true;
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleClick();
  };



  onEditorChange = (editorContent) => {


    console.log();


   // console.log(typeof draftToHtml(editorContent));
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
    alert(contentState);
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

    console.log('selectionState=====',selectionState);
    console.log('anchorKey======',anchorKey);
    console.log('currentContent=====',currentContent);
    console.log('currentContentBlock=====',currentContentBlock);
    console.log('start=====',start);
    console.log('end=====',end);
    console.log('selectedText=====',selectedText);

    this.setState({
      editorState,
    });
  };

  handleSetThumb(data){
    alert('设置为缩略图');
    console.log(data);
  };

  handleSetNews(item){
    alert('插入资讯');
    let html = item.response.data;
    console.log(html);
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorContent, editorState } = this.state;
    const { previewVisible, previewImage, fileList, uploadImageList } = this.state;
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
          onSubmit={this.handleSearch}
        >
          <Row>
            <Col span={24} key="1" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 5}} label={`资讯标题`}>
                {getFieldDecorator(`title`)(
                  <Input size="large" placeholder={`请输入资讯标题`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="2" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 5}} label={`资讯类别`}>
                {getFieldDecorator('catId')(
                  <Cascader
                    size="large"
                    style={{ width: '100%' }}
                    placeholder={`请选择资讯类别`}
                  />)}
              </FormItem>
            </Col>
            <Col span={24} key="3" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 5}} label={`资讯类型`}>
                  {getFieldDecorator('type')(
                    <Cascader
                      size="large"
                      style={{ width: '100%' }}
                      placeholder={`请选择资讯类型`}
                    />)}
              </FormItem>
            </Col>
            <Col span={24} key="4" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 5}} label={`内容类型`}>
                {getFieldDecorator('contentType')(
                  <Cascader
                    size="large"
                    style={{ width: '100%' }}
                    placeholder={`请选择内容类型`}
                  />)}
              </FormItem>
            </Col>
            <Col span={24} key="5" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 5}} label={`文章作者`}>
                {getFieldDecorator(`author`)(
                  <Input size="large" placeholder={`请输入作者`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="6" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 8}} label={`资讯标签`}>
                {getFieldDecorator(`labels`)(
                  <Input size="large" placeholder={`请输入资讯标签`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="7" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 8}} label={`资讯来源`}>
                {getFieldDecorator(`origin`)(
                  <Input size="large" placeholder={`请输入资讯来源`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="8" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 10}} label={`资讯来源url`}>
                {getFieldDecorator(`originUrl`)(
                  <Input size="large" placeholder={`请输入资讯来源url`} />
                )}
              </FormItem>
            </Col>
            <Col span={24} key="9" >
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 10}} label={`导语`}>
                {getFieldDecorator(`intro`)(
                  <Input type="textarea" size="large" placeholder={`请输入导语`} autosize={{ minRows: 3, maxRows: 6 }}/>
                )}
              </FormItem>
            </Col>
            <Col span={24} key="10">
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 15}} label={`上传图片`}>
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
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Col>
          </Row>
          <Row style={{display: uploadImageList.length ? `block` : `none`}}>
            <Col>
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 21}} label={`已上传图片`}>
                {
                  uploadImageList.length ? uploadImageList.map((item,index)=>{
                    return(
                        <div style={{padding: `10px`, float: `left`}} key={index}>
                          <p><img  width="180" height="100" src={item.response.data} style={{borderRadius: 3}}/></p>
                          <Button size="small" onClick={this.handleSetThumb.bind(this,item)}>设置为缩略图</Button>
                          <Button size="small" style={{ marginLeft: 5 }} onClick={this.handleSetNews.bind(this,item)}>插入资讯内容</Button>
                        </div>
                    )
                  }) : ''
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem labelCol={{span: 3}} wrapperCol={{span: 18}} label={`资讯内容`}>
                <Editor
                  wrapperStyle={{
                    maxHeight: 376,
                    maxWidth: 630
                  }}
                  editorStyle={{
                    minHeight: 260,
                    maxHeight: 260
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
                 /* onFocus={() => {console.log('focus')}}
                  onBlur={() => {console.log('blur')}}
                  onTab={() => {console.log('tab'); return true;}}*/
                  localization={{ locale: 'zh' }}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={20} style={{ textAlign: `center`}}>
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

};

export default Form.create()(AddNewsFormContent);
