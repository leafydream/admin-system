import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  disabled,
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
        key: item.key,
      }
    //   data.address = data.address.join(' ')
        onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fff\w]{1,16}$/,
                message: '无效用户名!',
              },
            ],
        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem label="真实姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('realName', {
            initialValue: item.realName,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fff\w]{1,16}$/,
                message: '无效姓名!',
              },
            ],
          })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('passwd', {
            initialValue: '',
            rules: [
              {
                required: true,
                pattern: /^[a-zA-Z0-9]{6,20}$/,
                message: '无效密码!',
              },
            ],
        })(<Input type="password" placeholder="密码长度不少于6位" />)}
        </FormItem>
        <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '无效手机号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Email" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'Email地址无效!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
