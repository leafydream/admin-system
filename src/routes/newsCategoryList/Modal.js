import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 8,
  },
};

const ModalComponent = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
      console.log('data',data)
      onOk(data);
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  let initialExternal = '';
  (function () {
    if(item.external){
      initialExternal = '是';
    }else if(item.external == false){
      initialExternal = '否';
    }else{
      initialExternal = '未填写';
    }
  })();

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="资讯类别名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [ { required: true } ],
          })(<Input />)}
        </FormItem>
        <FormItem label="资讯类别顺序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('position', {
            initialValue: item.position,
            rules: [ { required: true } ],
          })(<Input />)}
        </FormItem>
        <FormItem label="数据对接ID"  {...formItemLayout}>
          {getFieldDecorator('externalId', {
            initialValue: item.externalId
          })(<Input />)}
        </FormItem>
        <FormItem label="是否来自第三方公司"  {...formItemLayout}>
          {getFieldDecorator('external',{ initialValue: initialExternal })(
            <Select>
              <Option value="true" checked>是</Option>
              <Option value="false">否</Option>
          </Select>)}
        </FormItem>
      </Form>
    </Modal>
  )
};

ModalComponent.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(ModalComponent);
