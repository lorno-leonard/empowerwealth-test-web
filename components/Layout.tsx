import React, { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Button, Layout, Menu, Space, Typography } from 'antd'
import styled from '@emotion/styled'

import { useAppState, useAppDispatch } from '@lib/context/AppContext'

type Props = {
  children?: ReactNode
}

const { Header, Content } = Layout
const { SubMenu } = Menu
const { Title } = Typography

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

const LayoutMenu = styled(Menu)``

const LayoutSubMenu = styled(SubMenu)``

const MainLayout: FC<Props> = ({ children }) => {
  const { noHeader, user } = useAppState()
  const { setUser } = useAppDispatch()

  const handleLogout = () => {
    setUser && setUser(null)
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
            <LayoutMenu mode="horizontal">
              <LayoutSubMenu key="header-submenu" title={user.name}>
                <Menu.Item key="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </LayoutSubMenu>
            </LayoutMenu>
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
