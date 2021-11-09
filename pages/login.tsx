import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Alert, Button, Col, Form, Input, Row } from 'antd'
import { AxiosResponse } from 'axios'
import { pick } from 'lodash'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState, useAppDispatch } from '@lib/context/AppContext'
import type { User } from '@lib/types'
import apiService from '@services/api'

type LoginFormValuesType = {
  email: string
  password: string
}

const Login: FC = () => {
  const { user } = useAppState()
  const { setUser } = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const handleOnFinish = (values: LoginFormValuesType) => {
    setIsSubmitting(true)

    const login = async () => {
      const { email, password } = values

      try {
        const response: AxiosResponse = await apiService.post('/auth/login', {
          email,
          password,
        })
        setUser &&
          setUser({ ...pick(response.data.data, ['id', 'name', 'email', 'token']) } as User)
        router.replace('/')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log({ error })
        setFormError(error?.response?.data?.error?.message)
        setIsSubmitting(false)
      }
    }

    login()
  }

  if (user?.token) {
    return <Loader />
  }

  return (
    <Container>
      <Row>
        <Col span={8} offset={8}>
          <h1>Login</h1>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
            autoComplete="off"
            onSubmitCapture={() => setFormError(null)}
          >
            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {formError && <Alert message={formError} type="error" />}
        </Col>
      </Row>
    </Container>
  )
}

export default Login
