import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, DatePicker, Input, Cascader } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

import findTopicvalley from '../../utils/findTopicvalley';
import findsex from '../../utils/findsex';
import formatType from '../../utils/formatType';
import formatStage from '../../utils/formatStage';

const Search = Input.Search;


const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  }
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

  const Filter = ({
    onFilterChange,
    filter,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue
    },
  }) => {
    const handleFields = (fields) => {
      let { createTime } = fields;
      if (createTime.length) {
        fields.startDate = createTime[0].format('YYYY/MM/DD HH:mm:SS');
        fields.endDate = createTime[1].format('YYYY/MM/DD HH:mm:SS');
      }
      return fields;
    };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = null;
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };



  const handleChange = (key, values,filters) => {

    let fields = getFieldsValue();
    fields[key] = values;
    fields = handleFields(fields);
    onFilterChange(fields);
  };
  let { valleyCode, id, country, province, city, sex, registerType, regStage } = filter;
    let initialCreateTime = [];
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
        {getFieldDecorator('id', { initialValue: id })(<Search placeholder="请输入ID" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
        {getFieldDecorator('country', { initialValue: country })(<Search placeholder="请输入国家" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
        {getFieldDecorator('province', { initialValue: province })(<Search placeholder="请输入省份" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
        {getFieldDecorator('city', { initialValue: city })(<Search placeholder="请输入城市" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
       {getFieldDecorator('valleyCode', { initialValue: valleyCode })(
         <Cascader
           size="large"
           style={{ width: '100%' }}
           options={findTopicvalley}
           placeholder="请选择谷"
           onChange={handleChange.bind(null, 'valleyCode')}
         />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
         {getFieldDecorator('sex', { initialValue: sex })(
           <Cascader
             size="large"
             style={{ width: '100%' }}
             options={findsex}
             placeholder="请选择性别"
             onChange={handleChange.bind(null, 'sex')}
           />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
        {getFieldDecorator('regStage', { initialValue: regStage })(
          <Cascader
            size="large"
            style={{ width: '100%' }}
            options={formatStage}
            placeholder="请选择注册阶段"
            onChange={handleChange.bind(null, 'regStage')}
          />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
        {getFieldDecorator('registerType', { initialValue: registerType })(
          <Cascader
            size="large"
            style={{ width: '100%' }}
            options={formatType}
            placeholder="请选择注册类型"
            onChange={handleChange.bind(null, 'registerType')}
          />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
        )}
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
};

Filter.propTypes = {
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default Form.create()(Filter);
