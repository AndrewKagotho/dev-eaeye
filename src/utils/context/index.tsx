import { createContext, useContext, useState } from 'react'
import type {
  SelectedBookType,
  SelectedMemberType,
  SelectedIssueType,
  ContextType,
  ContextProviderProps
} from '../types'

const AppContext = createContext({} as ContextType)

export const AppProvider = ({ children }: ContextProviderProps) => {
  const [selectedBook, setSelectedBook] = useState({} as SelectedBookType)
  const [selectedMember, setSelectedMember] = useState({
    isMemberFormOpen: false
  } as SelectedMemberType)
  const [selectedIssue, setSelectedIssue] = useState({
    isIssueFormOpen: false
  } as SelectedIssueType)
  const [editBook, setEditBook] = useState(false)
  const [editMember, setEditMember] = useState(false)

  const value = {
    book: { selectedBook, setSelectedBook },
    member: { selectedMember, setSelectedMember },
    issue: { selectedIssue, setSelectedIssue },
    editBook: { editBook, setEditBook },
    editMember: { editMember, setEditMember }
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
