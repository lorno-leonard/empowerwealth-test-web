import React, { createContext, FC, useContext, useState } from 'react'
import type { SetStateAction, Dispatch } from 'react'

import type { User } from '@lib/types'

const initialState = {
  noHeader: false,
  user: null,
}

export type AppState = {
  noHeader: boolean
  user: User
}

export type AppDispatch = {
  setNoHeader?: Dispatch<SetStateAction<boolean>>
  setUser?: Dispatch<SetStateAction<User>>
}

const AppStateContext = createContext<AppState | undefined>(undefined)
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined)

const AppContextProvider: FC = ({ children }) => {
  const [noHeader, setNoHeader] = useState<boolean>(initialState.noHeader)
  const [user, setUser] = useState<User>(initialState.user)

  return (
    <AppDispatchContext.Provider
      value={{
        setNoHeader,
        setUser,
      }}
    >
      <AppStateContext.Provider
        value={{
          noHeader,
          user,
        }}
      >
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}

export const useAppState = (): AppState => {
  const state = useContext(AppStateContext)
  return state ?? initialState
}

export const useAppDispatch = (): AppDispatch => {
  const dispatch = useContext(AppDispatchContext)
  return dispatch ?? {}
}

export default AppContextProvider
