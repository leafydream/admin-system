import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

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

const AddBtn = ({ onAdd }) => {
  return (
    <Row gutter={24}>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}>新增</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
};


AddBtn.propTypes = {
  onAdd: PropTypes.func
};

export default AddBtn;
