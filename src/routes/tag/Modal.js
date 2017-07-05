import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Select } from 'antd'

const Option = Select.Option;

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
  disabled,
  tagCategory,
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

  const handleFields = (fields) => {

    return fields
  }

  const upload = {
      icon: '',
  }

  const setPicturesWall = (data) => {
      upload.icon = data
    //   console.log('setPicturesWall', upload.icon);
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    // onModalChange(fields)
    // console.log('Brieflistkey is', key, '\nvalue :', values);
    // console.log('fields',fields);
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="标签名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="标签标识码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
              },
            ],
        })(<Input placeholder=""/>)}
        </FormItem>
        <FormItem label="标签优先级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('priority', {
            initialValue: item.priority,
            rules: [
              {
                required: true,
              },
            ],
        })(<Input placeholder=""/>)}
        </FormItem>
        <FormItem label="标签类别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('catId', {
            initialValue: item.catId,
            rules: [
              {
                required: true,
              },
            ],
        })( <Select
                showSearch
                style={{ width: 280 }}
                placeholder=""
                // optionFilterProp="children"
                onChange={handleChange}
                // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              {tagCategory.map((list) =>(
                <Option value={String(list.id)} key={list.id}>{list.name}</Option>
              ))}
            </Select>)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,

        })( <Select
                showSearch
                disabled={disabled}
                style={{ width: 280 }}
                placeholder="默认为展示"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="DISPLAY">展示</Option>
                <Option value="HIDE">隐藏</Option>
            </Select>)}
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
