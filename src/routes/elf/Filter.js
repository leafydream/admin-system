import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

const Filter = ({ onAdd }) => {
  return (
    <Row gutter={24}>
      <div>
        <Button size="large" type="ghost" onClick={onAdd} style={{marginBottom:10}}>新增</Button>
      </div>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func
}

export default Filter;
