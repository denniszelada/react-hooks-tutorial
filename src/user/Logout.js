import React, {useContext} from 'react'
import { Form, Button } from 'antd';
import { StateContext } from '../contexts'

export default function Logout () {
  const {state, dispatch} = useContext(StateContext)
  const { user } = state

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onSubmit={e => e.preventDefault()}
      onFinish={e => dispatch({type: 'LOGOUT'})}
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
