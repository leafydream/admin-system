import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Upload, Icon } from 'antd'
import UserSelect from '../../components/Select/Select'
import PicturesWall from './upload'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item = {},
  disabled,
  select,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
    // console.log('modal:', dispatch)
    // window.console.log('***data',data.data);
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          // key: item.key,
        }
        // console.log('upload value', upload)
        // console.log('mainupload value', mainupload)
        // data.mainImg = mainupload.mainImg
        // data.backgroundImg = upload.backgroundImg
        data.valleyCode = select.value
        // console.log('data',data)
      //   data.address = data.address.join(' ')
          onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }
    const selectProps = {
        select:select,

    }

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="精灵名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  pattern: /^[\u4e00-\u9fff\w]{1,20}$/,
                  message: '无效精灵名!',
                },
              ],
          })(<Input placeholder="名称长度不多于20位" />)}
          </FormItem>
          <FormItem label="精灵编号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('serialNum', {
              initialValue: item.serialNum,
              rules: [
                {
                  required: true,
                  pattern: /^[0-9]*[1-9][0-9]*$/,
                  message: '无效精灵编号!',
                },
              ],
          })(<Input />)}
          </FormItem>
          <FormItem label="精灵属性" hasFeedback {...formItemLayout}>
            {getFieldDecorator('attr', {
              initialValue: item.attr,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="谷" hasFeedback {...formItemLayout}>
          {getFieldDecorator('valleyCode', {
            initialValue: item.valleyCode,
            rules: [
              {
                required: true,
              },
            ],
          })(<UserSelect {...selectProps} />)}
          </FormItem>
          <FormItem label="精灵技能" hasFeedback {...formItemLayout}>
            {getFieldDecorator('skill', {
              initialValue: item.skill,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="精灵装备" hasFeedback {...formItemLayout}>
            {getFieldDecorator('equipment', {
              initialValue: item.equipment,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="精灵简短介绍" hasFeedback {...formItemLayout}>
            {getFieldDecorator('shortIntro', {
              initialValue: item.shortIntro,
              rules: [
                {
                  required: true,
                },
              ],
          })(<textarea style={{ width: 280 , height : 100}} />)}
          </FormItem>
          <FormItem label="精灵详细介绍" hasFeedback {...formItemLayout}>
            {getFieldDecorator('intro', {
              initialValue: item.intro,
              rules: [
                {
                  required: true,
                },
              ],
          })(<textarea style={{ width: 280 , height : 200}} />)}
          </FormItem>
          <FormItem label="男孩头像" hasFeedback {...formItemLayout}>
            {getFieldDecorator('mainImg', {
              initialValue: item.mainImg,
              rules: [
                {
                  required: true,
                  message: '无效头像!',
                },
              ],
            })(<PicturesWall />)}
          </FormItem>
          <FormItem label="女孩头像" hasFeedback {...formItemLayout}>
            {getFieldDecorator('girlMainImg', {
              initialValue: item.girlMainImg,
              rules: [
                {
                  required: true,
                  message: '无效头像!',
                },
              ],
            })(<PicturesWall />)}
          </FormItem>
          <FormItem label="背景" hasFeedback {...formItemLayout}>
            {getFieldDecorator('backgroundImg', {
              initialValue: item.backgroundImg,
              rules: [
                {
                  required: true,
                  message: '无效背景!',
                },
              ],
          })(<PicturesWall />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
  }

  export default Form.create()(modal)
