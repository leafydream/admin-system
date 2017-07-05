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
        <FormItem label="题目" hasFeedback {...formItemLayout}>
          {getFieldDecorator('question', {
            initialValue: item.question,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="选项" hasFeedback {...formItemLayout}>
          {getFieldDecorator('choices', {
            initialValue: item.choices,
            rules: [
              {
                required: true,
              },
            ],
        })(<Input placeholder="多个选项以空格分隔"/>)}
        </FormItem>
        <FormItem label="题目顺序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sequence', {
            initialValue: item.sequence,
            rules: [
              {
                required: true,
              },
            ],
        })(<Input />)}
        </FormItem>
        <FormItem label="题目编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('serialNum', {
            initialValue: item.serialNum,
            rules: [
              {
                required: true,
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
