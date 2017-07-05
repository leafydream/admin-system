import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import PicturesWall from './upload'

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
        // data.cover = upload.cover

        onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const upload = {
      cover: '',
  }

  const setPicturesWall = (data) => {
      upload.cover = data
    //   console.log('setPicturesWall', upload.cover);
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="栏目名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '无效栏目名称!'
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="栏目标识码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
                message: '无效标识码!'
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="栏目顺序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sequence', {
            initialValue: item.sequence,
            rules: [
              {
                required: true,
                pattern: /^[0-9]*[1-9][0-9]*$/,
                message: '无效顺序,必须为正整数!'
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="栏目封面" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cover', {
            initialValue: item.cover,
            rules: [
              {
                required: true,
                message: '无效封面!',
              },
            ],
        })(<PicturesWall />)}
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
