type AppState = {
  isLoading: boolean
  error: any
}

export type InitialStateType = {
  data: [] | null
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
  returnId?: number
  pay: number
  issueId: number
  bookIsbn: number
  memberNationalId: number
  issuedDate: string
  returnDate?: string
}

export type ContextProviderProps = {
  children: React.ReactNode
}

export type CardType = {
  id?: number
  title: string | number
  subtitle: string | number
  details: { name: string; content: string | number }[]
  primaryAction?: { handler: (id: number) => void; text: string }
  secondaryAction?: { handler: (id: number) => void; text: string }
}

export type ViewType = {
  header: string
  description: string
  SearchComponent?: React.ReactNode
  MainComponent: React.ReactNode
  action?: {
    handler: React.MouseEventHandler<HTMLButtonElement>
    text: string
  }
}

export type DisplayType = 'create' | 'read' | 'update'

export type QueryType = {
  type: string
  item: string
}
