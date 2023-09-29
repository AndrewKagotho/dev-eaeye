import { createContext, useContext } from 'react'
import type { ContextProviderProps } from '../types'

const AppContext = createContext(null)

export const AppProvider = ({ children }: ContextProviderProps) => {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
