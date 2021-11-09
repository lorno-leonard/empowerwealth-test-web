import React, { FC } from 'react'
import { Typography } from 'antd'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState } from '@lib/context/AppContext'

const { Title } = Typography

const Home: FC = () => {
  const { user } = useAppState()

  if (!user?.token) {
    return <Loader />
  }

  return (
    <Container>
      <Title>Home</Title>
    </Container>
  )
}

export default Home
