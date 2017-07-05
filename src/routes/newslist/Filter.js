import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input,  Select, } from 'antd';
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
  filter,
  handleClick,
  categoryList,
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
  const handleTypeChange = ( key, values ) => {
    let fields = getFieldsValue()
    console.log('========fields=======')
    console.log(fields)
    fields[key] = values;
    onFilterChange(fields)
  }
  const handleCatIdChange = ( key, values ) => {
    let fields = getFieldsValue()
    fields[key] = values;
    onFilterChange(fields)
  }

  const { title, type, catId } = filter;


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('title', { initialValue: title })(<Search placeholder="请输入标题" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('catId', { initialValue: catId })(
          <Select style={{ width: '100%' }} placeholder="请选择资讯类别" onChange={handleCatIdChange.bind(null,'catId')}>
            {
              categoryList.length ? categoryList.map((item,index)=>{
                return <Option value={item.id} key={index}>{item.name}</Option>
              }) :   <Option value="暂无数据">暂无数据</Option>
            }
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('type',{ initialValue: type })(
          <Select style={{ width: '100%' }} placeholder="请选择资讯类型" onChange={handleTypeChange.bind(null,'type')}>
            <Option value='ORIGINAL'>原创</Option>
            <Option value='REPRODUCED'>转发</Option>
          </Select>)}
      </Col>

      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" className="margin-right" onClick={handleReset}>重置</Button>
            <Button size="large" type="ghost" onClick={handleClick}>新增</Button>
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
