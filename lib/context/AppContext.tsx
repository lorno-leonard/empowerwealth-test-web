import React, { createContext, FC, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
  setNoHeader?: (bool: boolean) => void
  setUser?: (user: User) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined)

const userStorageKey = 'empowerwealth-test:user'

const AppContextProvider: FC = ({ children }) => {
  const [noHeader, _setNoHeader] = useState<boolean>(initialState.noHeader)
  const [user, _setUser] = useState<User>(initialState.user)
  const router = useRouter()

  const setNoHeader = (bool: boolean) => _setNoHeader(bool)

  const setUser = (user: User) => {
    if (typeof window !== 'undefined') {
      if (user) {
        window.localStorage.setItem(userStorageKey, JSON.stringify(user))
      } else {
        window.localStorage.removeItem(userStorageKey)
      }
    }
    _setUser(user)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem(userStorageKey)
      if (user) {
        _setUser(JSON.parse(user) as User)
        if (['/login', '/register'].includes(router.route)) {
          router.replace('/')
        }
      } else {
        _setUser(null)
        if (['/'].includes(router.route)) {
          router.replace('/login')
        }
      }
    }
  }, [router])

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
