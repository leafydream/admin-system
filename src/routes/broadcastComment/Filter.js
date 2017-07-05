import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select} from 'antd'
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
      const { createDate } = fields
      console.log('fields',fields);
      if (createDate.length) {
      fields.createDate = [createDate[0].format('YYYY-MM-DD'), createDate[1].format('YYYY-MM-DD')]
      }
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
    console.log('fields',fields);

  }
  let { id, title,userId,status,createDate} = filter


   let initialCreateDate = []
  if (filter.createDate && filter.createDate[0]) {
    initialCreateDate[0] = moment(filter.createDate[0])
  }
  if (filter.createDate && filter.createDate[1]) {
    initialCreateDate[1] = moment(filter.createDate[1])
  }

  return (
    <Row gutter={24}>

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
