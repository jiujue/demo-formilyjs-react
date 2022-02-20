import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form, FormItem, Input, Password, Submit,
} from '@formily/antd';
import { Tabs, Card } from 'antd';
import * as ICONS from '@ant-design/icons';
import { phoneSchema, normalSchema } from './schema';
import { VerifyCode } from './verifyCode';
import styles from './index.module.less';
import { LOGIN } from '../../network/user.js';

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name]);
    },
  },
});

function Login() {
  const handleOnSubmit = (data) => {
    LOGIN(data);
    console.log('with passwd ', data);
  };
  const handleOnSubmitWithPhone = (data) => {
    console.log('with phone', data);
  };
  return (
    <div
      className={styles.wrap}
    >
      <Card className={styles.card}>
        <Tabs className={styles.table}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={handleOnSubmit}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={handleOnSubmitWithPhone}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  );
}
export default Login;
