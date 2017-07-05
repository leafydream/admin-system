import React, {Component} from 'react';
import { Icon, Select } from 'antd';
const Option = Select.Option;
import styles from './styles.less';
import CommentList from "./commentList";


const Silder = ({ open, displayNone, data, dispatch }) =>{
    const listProps = {
    //     onChangeComment(payload) {
    //       dispatch({
    //         type: 'broadcast/commentStatusChange',
    //         payload,
    //       })
    //   },
    }
    return(
      <div>
        <div className={styles.overlay} style={{display:open?'block':'none'}}  onClick={displayNone}></div>
        <div className={styles.silder} style={{left:open?'50%':'100%'}}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <Icon type="message" />
              <span className={styles.title_txt}>评论列表</span>
            </h1>
          </div>
          <CommentList dataSource={data} {...listProps}/>
        </div>
      </div>
    );
};

export default Silder;
