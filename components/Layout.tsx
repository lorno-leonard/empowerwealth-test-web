import React, { FC, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Layout, Space, Typography } from 'antd'
import styled from '@emotion/styled'

import { useAppState, useAppDispatch } from '@lib/context/AppContext'

type Props = {
  children?: ReactNode
}

const { Header, Content } = Layout
const { Paragraph, Title } = Typography

const LayoutHeader = styled(Header)`
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LayoutContent = styled(Content)`
  min-height: calc(100vh - 64px);
`

const LayoutTitle = styled(Title)`
  margin-bottom: 0 !important;
`

const LayoutHeaderBanner = styled('a')`
  color: #ffffff !important;

  &:active,
  &:hover {
    color: #ffffff !important;
  }
`

const LayoutUserName = styled(Paragraph)`
  margin-bottom: 0 !important;
  color: #ffffff !important;
`

const MainLayout: FC<Props> = ({ children }) => {
  const { noHeader, user } = useAppState()
  const { setUser } = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    setUser && setUser(null)
    router.replace('/')
  }

  return (
    <Layout>
      {!noHeader && (
        <LayoutHeader>
          <LayoutTitle level={2}>
            <Link href="/" passHref>
              <LayoutHeaderBanner>Coding challenge</LayoutHeaderBanner>
            </Link>
          </LayoutTitle>
          {user && (
            <Space>
              <LayoutUserName>Hi {user.name}</LayoutUserName>
              <Button type="primary" ghost onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          )}
          {!user && (
            <Space>
              <Link href="/login" passHref>
                <Button type="primary">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button type="primary" ghost>
                  Register
                </Button>
              </Link>
            </Space>
          )}
        </LayoutHeader>
      )}
      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}

export default MainLayout
