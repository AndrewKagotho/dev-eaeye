type AppState = {
  isLoading: boolean
  error: any
}

export type InitialStateType = {
  data: []
} & AppState

export type BookType = {
  isbn: number
  title?: string
  author?: string
  fee?: number
  quantity?: number
}

export type MemberType = {
  nationalId: number
  firstName?: string
  lastName?: string
  email?: string
}

export type IssueType = {
  issueId?: number
  bookIsbn: number
  memberNationalId: number
  createdAt?: any
}

export type ReturnType = {
  returnId: number
  pay: number
  issueIssueId: number
  createdAt: any
}

export type SelectedBookType = {
  isBookFormOpen: boolean
} & BookType

export type SelectedMemberType = {
  isMemberFormOpen: boolean
} & MemberType

export type SelectedIssueType = {
  isIssueFormOpen: boolean
}

export type ContextType = {
  book: {
    selectedBook: SelectedBookType
    setSelectedBook: React.Dispatch<React.SetStateAction<SelectedBookType>>
  }
  member: {
    selectedMember: SelectedMemberType
    setSelectedMember: React.Dispatch<React.SetStateAction<SelectedMemberType>>
  }
  issue: {
    selectedIssue: SelectedIssueType
    setSelectedIssue: React.Dispatch<React.SetStateAction<SelectedIssueType>>
  }
  editBook: {
    editBook: boolean
    setEditBook: React.Dispatch<React.SetStateAction<boolean>>
  }
  editMember: {
    editMember: boolean
    setEditMember: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export type ContextProviderProps = {
  children: React.ReactNode
}

export type CardType = {
  id?: number
  title: string | number
  subtitle: string | number
  details: { name: string; content: string | number }[]
  primaryAction?: (id: number) => void
  actionText?: string
  secondaryAction?: (id: number) => void
  actionTextSecondary?: string
  fitContent?: boolean
}

export type ViewType = {
  header: string
  description: string
  Component: React.ReactNode
  action: React.MouseEventHandler<HTMLButtonElement>
  actionText: string
}

export type DisplayType = 'create' | 'read' | 'update' | 'delete'
