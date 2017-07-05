import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Switch, Select } from 'antd'
const Option = Select.Option;

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
    const handleFields = (fields) => {
      const { createTime } = fields

      return fields
    }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values,filters) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
    // console.log('filters', filters);
    // console.log('fields',fields);

  }
  let { valleyCode,id, title,userId,sex ,status} = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
        {getFieldDecorator('id', { initialValue: id })(<Search placeholder="搜索ID" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
        {getFieldDecorator('userId', { initialValue: userId })(<Search placeholder="搜索用户ID" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
        {getFieldDecorator('title', { initialValue: title })(<Search placeholder="搜索话题标题" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
       {getFieldDecorator('valleyCode', { initialValue: valleyCode })(
           <Select
               showSearch
               allowClear={true}
               style={{ width: '100%' }}
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
     </Col>
     <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
      {getFieldDecorator('status', { initialValue: status })(
          <Select
              showSearch
              allowClear={true}
              style={{ width: '100%' }}
              placeholder="选择一个状态"
           //    optionFilterProp="children"
              onChange={handleChange.bind(null, 'status')}
           //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >

                <Option value='0' >开放</Option>
                <Option value='1' >关闭</Option>
           </Select>)}
     </Col>
     <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
         {getFieldDecorator('sex', { initialValue: sex })(
             <Select
                 showSearch
                 allowClear={true}
                 style={{ width: '100%' }}
                 placeholder="选择一个性别"
              //    optionFilterProp="children"
                 onChange={handleChange.bind(null, 'sex')}
              //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >

                   <Option value='1' >男生</Option>
                   <Option value='2' >女生</Option>
            </Select>)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 5 }} md={{ span: 10 }} sm={{ span: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
