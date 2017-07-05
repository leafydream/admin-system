import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import UserSelect from '../../components/Select/Select'
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
  disabled,
  select,
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
        data.valleyCode = select.value

        onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const selectProps = {
      select:select,

  }

  // const upload = {
  //     cover: '',
  // }
  //
  // const setPicturesWall = (data) => {
  //     upload.cover = data
  //     console.log('setPicturesWall', upload.cover);
  // }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="话题类别名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fff\w]{1,20}$/,
                message: '无效话题类别名!',
              },
            ],
        })(<Input />)}
        </FormItem>
        <FormItem label="谷" hasFeedback {...formItemLayout}>
          {getFieldDecorator('valleyCode', {
            initialValue: item.valleyCode,
            rules: [
              {
                required: true,
              },
            ],
          })(<UserSelect {...selectProps} />)}
        </FormItem>
        <FormItem label="正常图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
            rules: [
              {
                required: true,
              },
            ],
          })(<PicturesWall />)}
        </FormItem>
        <FormItem label="选中图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('clickedIcon', {
            initialValue: item.clickedIcon,
            rules: [
              {
                required: true,
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
