import React, { FC } from 'react'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState } from '@lib/context/AppContext'

const Register: FC = () => {
  const { user } = useAppState()

  if (user?.token) {
    return <Loader />
  }

  return (
    <Container>
      <h1>Register</h1>
    </Container>
  )
}

export default Register
