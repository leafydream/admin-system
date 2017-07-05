import React, { PropTypes } from 'react';

import { Select } from 'antd';

const UserSelect = ({
    select,
}) => {
const Option = Select.Option;

function handleChange(value) {
  select.value = value
  // console.log(`selected ${value}`);

}


    return (
      <Select
        showSearch
        style={{ width: 280 }}
        placeholder="请选择一个谷"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >

        {select.list.map((list) =>(
          <Option value={list.code} key={list.id}>{list.name}</Option>
        ))}


      </Select>
    )
}
export default UserSelect;
