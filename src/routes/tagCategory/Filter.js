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
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
}) => {

    const handleFields = (fields) => {
    //   console.log('fields',fields);
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
  let { status } = filter

  return (
    <Row gutter={24}>
         <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 5 }} sm={{ span: 5 }}>
            <Button size="large" type="ghost" onClick={onAdd} style={{marginBottom:10}}>新增</Button>
        </Col>
        <Col {...ColProps} xl={{ span: 3 }} md={{ span: 5 }}>
         {getFieldDecorator('status', { initialValue: status })(
             <Select
                 showSearch
                 style={{ width: '100%' }}
                 placeholder="选择一个状态"
              //    optionFilterProp="children"
                 onChange={handleChange.bind(null, 'status')}
              //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >

               <Option value='DISPLAY'> 展示 </Option>
               <Option value='HIDE'> 隐藏 </Option>
              </Select>)}
        </Col>
        <div>
            <Button size="large" onClick={handleReset}>重置</Button>
        </div>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
}

export default Form.create()(Filter)
