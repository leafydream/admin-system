import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Select } from 'antd';
const Option = Select.Option;
import classnames from 'classnames';
import styles from  './styles.less';

import AddNewsFormContent from './AddNewsFormContent';

const Silder = ({ open, handleClick, ...otherProps }) =>{

    return(
      <div>
        <div className={classnames({[styles.overlay]: true ,[styles.show]: open})}   onClick={handleClick}></div>
        <div className={classnames({[styles.silder]: true ,[styles.visible]: open})} >
          <div className={styles.header}>
            <h1 className={styles.title}>
              <Icon type="appstore" />
              <span className={styles.title_txt}>新增资讯</span>
            </h1>
          </div>
          <AddNewsFormContent open={open} handleClick={handleClick} {...otherProps}/>
        </div>
      </div>
    );
};
Silder.PropTypes = {
  open: PropTypes.bool,
  handleClick: PropTypes.func,
  categoryList: PropTypes.array,
  handleSubmit: PropTypes.func
};

export default Silder;
