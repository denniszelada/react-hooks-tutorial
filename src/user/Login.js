import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'

export default function Login() {
  const [ loginFailed, setLoginFailed ] = useState(false)
  const [ password, setPassword ] = useState('')
  const [ username, setUsername ] = useState('')
  const { dispatch } = useContext(StateContext)
  const [ user, login ] = useResource((username, password) => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: 'get'
  }))

  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false)
        dispatch({ type: 'LOGIN', username: user.data[0].username})
      } else {
        setLoginFailed(true)
      }
    }

    if (user && user.error) {
      setLoginFailed(true)
    }
  }, [user])

  function handleUsername (event) {
    setUsername(event.target.value)
  }

  function handlePassword (event) {
    setPassword(event.target.value)
  }
 
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={e => { login(username, password) } }
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={handleUsername} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={username.length === 0}>
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
      {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </Form>
  )
}
