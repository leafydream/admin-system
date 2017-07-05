import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, DatePicker, Input,  Select, Switch } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

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
  onFilterChange,
  handlePutWarehouse,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
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
  const handleChange = ( key, values ) => {
    let fields = getFieldsValue()
    fields[key] = values;
    onFilterChange(fields)
  }

  const { title, author, labels, contentType } = filter;
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('title', { initialValue: title })(<Search placeholder="请输入标题" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('author', { initialValue: author })(<Search placeholder="请输入作者" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('labels', { initialValue: labels })(<Search placeholder="请输入标签" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('contentType',{ initialValue: contentType })(
          <Select style={{ width: '100%' }} placeholder="请选择内容类型" onChange={handleChange.bind(null,'contentType')}>
            <Option value='PHOTO'>图片</Option>
            <Option value='VIDEO'>视频</Option>
            <Option value='VOICE'>音频</Option>
            <Option value='TEXT'>文本</Option>
          </Select>)}
      </Col>

      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button type="primary" size="large" className="margin-right" onClick={handlePutWarehouse}>入库</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
};

Filter.propTypes = {
  handlePutWarehouse: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
