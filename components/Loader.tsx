import React, { FC } from 'react'
import { Spin } from 'antd'
import styled from '@emotion/styled'

import Container from '@components/Container'

const LoaderContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader: FC = () => {
  return (
    <Container>
      <LoaderContainer>
        <Spin size="large" />
      </LoaderContainer>
    </Container>
  )
}

export default Loader
