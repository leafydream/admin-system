import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select } from 'antd'
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
  options,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // console.log('options:', options);
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

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    // console.log('key is', key, '\nvalue :', values);
    fields = handleFields(fields)
    onFilterChange(fields)
    // console.log('fields',fields);
  }

  const { topicCategoryId ,valleyCode} = filter



  return (
    <Row gutter={24}>
        <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Button size="large" type="ghost" onClick={onAdd}>新增</Button>
              </div>
            </div>
        </Col>

        <Col {...ColProps} xl={{ span: 3 }} md={{ span: 5 }}>
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
                </Select>
            )}
        </Col>

        <Col {...ColProps} xl={{ span: 3 }} md={{ span: 5 }}>
           {getFieldDecorator('topicCategoryId', { initialValue: topicCategoryId })(
               <Select
                   showSearch
                   allowClear={true}
                   style={{ width: '100%' }}
                   placeholder="选择一个话题类别"
                //    optionFilterProp="children"
                   onChange={handleChange.bind(null, 'topicCategoryId')}
                //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                   {options.list.map((list) =>(
                     <Option value={String(list.id)} key={list.id}>{list.name}</Option>
                   ))}
                </Select>
            )}
        </Col>
        <div >
            <Button size="large" onClick={handleReset}>重置</Button>
        </div>
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
