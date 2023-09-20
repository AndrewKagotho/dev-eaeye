import { createContext, useContext } from 'react'
import type { ContextProviderProps } from '../types'

const AppContext = createContext(null)

export const AppProvider = ({ children }: ContextProviderProps) => {
  const value = {}
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
