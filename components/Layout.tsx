import React, { FC, ReactNode } from 'react'
import { Layout, Menu, Typography } from 'antd'
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
  color: #ffffff !important;
  margin-bottom: 0 !important;
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
          <LayoutTitle>Coding challenge</LayoutTitle>
          {user && (
            <LayoutMenu mode="horizontal">
              <LayoutSubMenu key="header-submenu" title={user.name}>
                <Menu.Item key="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </LayoutSubMenu>
            </LayoutMenu>
          )}
        </LayoutHeader>
      )}
      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}

export default MainLayout
