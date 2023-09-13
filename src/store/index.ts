import { configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from '../features/book/book.slice'
import { reducer as memberReducer } from '../features/member/member.slice'
import { reducer as issueReducer } from '../features/issue/issue.slice'
import { reducer as returnReducer } from '../features/return/return.slice'

const store = configureStore({
  reducer: {
    book: bookReducer,
    member: memberReducer,
    issue: issueReducer,
    return: returnReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
