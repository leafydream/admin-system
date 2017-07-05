import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select } from 'antd'
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
  disabled,
  select,
  onOk,
  onModalChange,
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
        // data.id = select.value

        onOk(data)
    })
  }

  const handleFields = (fields) => {

    return fields
  }



  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onModalChange(fields)
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
        <FormItem label="快捷标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fff\w]{1,20}$/,
                message: '无效快捷标题!',
              },
            ],
        })(<Input />)}
        </FormItem>
        <FormItem label="谷" hasFeedback {...formItemLayout}>
          {getFieldDecorator('valleyCode', {
            initialValue: item.valleyCode ,
            rules: [
              {
                required: true,
                message: '无效谷名!',
              },
            ],
          })(<Select
              showSearch
              allowClear={true}
              style={{ width: 280 }}
              placeholder="选择一个谷"
           //    optionFilterProp="children"
              onChange={handleChange.bind(null, 'valleyCode')}
           //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >

                <Option value='black'>玄谷</Option>
                <Option value='gold'>金谷</Option>
                <Option value='moon'>月谷</Option>
                <Option value='vain'>空谷</Option>
                <Option value='pure'>清谷</Option>
                <Option value='surge'>泉谷</Option>
                <Option value='wander'>迷谷</Option>
                <Option value='fire'>火谷</Option>
                <Option value='star'>炫谷</Option>
                <Option value='sand'>沙谷</Option>
            </Select>)}
        </FormItem>
        <FormItem label="类别名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('topicCategoryId', {
            initialValue: item.topicCategoryId,
            rules: [
              {
                required: true,
                message: '无效类别名!',
              },
            ],
          })(<Select
              showSearch
              style={{ width: 280 }}
              placeholder="选择一个话题类别"
           //    optionFilterProp="children"
              onChange={handleChange}
           //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              {select.list.map((list) =>(
                <Option value={String(list.id)} key={list.id}>{list.name}</Option>
              ))}
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
