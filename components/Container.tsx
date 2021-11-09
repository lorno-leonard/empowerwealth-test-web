import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  children?: ReactNode
}

const MainContainer = styled('div')`
  position: relative;
  padding: 20px 50px;
`

const Container: FC<Props> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>
}

export default Container
