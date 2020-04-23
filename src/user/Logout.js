import React from 'react'
import { Form, Button } from 'antd';

export default function Logout ({user}) {
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onSubmit={e => e.preventDefault()}
    >
      Logged in as: <b>{user}</b>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log out
        </Button>
      </Form.Item>
    </Form>
  )
}
