import React, { FC, useState } from 'react'
import { Alert, Button, Col, Form, Input, Row, Typography } from 'antd'
import { AxiosResponse } from 'axios'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState } from '@lib/context/AppContext'
import apiService from '@services/api'

type FormValuesType = {
  name: string
  email: string
  password: string
}

const { Title } = Typography

const Register: FC = () => {
  const { user } = useAppState()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const handleOnFinish = (values: FormValuesType) => {
    setIsSubmitting(true)

    const login = async () => {
      const { name, email, password } = values

      try {
        const response: AxiosResponse = await apiService.post('/auth/register', {
          name,
          email,
          password,
        })
        setFormSuccess(response.data?.message)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log({ error })
        setFormError(error?.response?.data?.error?.message)
      } finally {
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
          <Title level={3}>Register</Title>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
            autoComplete="off"
            onSubmitCapture={() => {
              setFormError(null)
              setFormSuccess(null)
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
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
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Please input at least 8 characters!' },
              ]}
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
          {formSuccess && <Alert message={formSuccess} type="success" />}
        </Col>
      </Row>
    </Container>
  )
}

export default Register
