import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Form, Button, Row, Col, DatePicker, Input, Cascader, Icon } from 'antd';
const FormItem = Form.Item;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleToggle = () => {
    this.props.handleClick();
  };
  render() {

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <MuiThemeProvider>
        <div>
          <Drawer openSecondary={true}
                  docked={false}
                  width={`50%`}
                  open={this.props.open}
          >
            <AppBar title={`新增资讯`}  iconElementRight={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}/>



            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Log in
                </Button>
              </FormItem>
            </Form>




          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Form.create()(DrawerComponent);

