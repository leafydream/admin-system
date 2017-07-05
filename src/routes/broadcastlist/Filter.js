import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select} from 'antd'
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
    //   console.log('fields',fields);
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
    // console.log('fields',fields);

  }
  let { id, contentType, userId, status, createDate} = filter


   let initialCreateDate = []
  if (filter.createDate && filter.createDate[0]) {
    initialCreateDate[0] = moment(filter.createDate[0])
  }
  if (filter.createDate && filter.createDate[1]) {
    initialCreateDate[1] = moment(filter.createDate[1])
  }

  return (
    <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 7 }} sm={{ span: 12 }}>
            <FilterItem label="时间搜索">
              {getFieldDecorator('createDate', { initialValue: initialCreateDate })(
                <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createDate')} />
              )}
            </FilterItem>
         </Col>
         <Col {...ColProps} xl={{ span: 3 }} md={{ span: 5 }}>
           {getFieldDecorator('userId', { initialValue: userId })(<Search placeholder="搜索用户ID" size="large" onSearch={handleSubmit} />)}
         </Col>
         <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
          {getFieldDecorator('status', { initialValue: status })(
              <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="选择一个状态"
               //    optionFilterProp="children"
                  onChange={handleChange.bind(null, 'status')}
               //    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >

                <Option value='VIOLATION'> 违规 </Option>
                <Option value='NORMAL'> 正常 </Option>
               </Select>)}
         </Col>
         <Col {...ColProps} xl={{ span: 3 }} md={{ span: 3 }}>
          {getFieldDecorator('contentType', { initialValue: contentType })(
              <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="选择一个类型"
                  onChange={handleChange.bind(null, 'contentType')}
                  >

                <Option value='VIDEO'> VIDEO </Option>
                <Option value='PHOTO'> PHOTO </Option>
                <Option value='TEXT'> TEXT </Option>
                <Option value='PHOTOS'> PHOTOS </Option>
                <Option value='VIDEOS'> VIDEOS </Option>
                <Option value='VOICE'> VOICE </Option>
                <Option value='NEWS_FAVS'> NEWS_FAVS </Option>
               </Select>)}
         </Col>
          <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
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
