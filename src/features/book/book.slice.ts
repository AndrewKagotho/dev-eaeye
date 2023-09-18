import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, BookType, QueryType } from '../../utils/types'
import BookService from '../../services/book.service'

const initialState: InitialStateType = {
  isLoading: false,
  data: [],
  error: null
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchBooks = createAsyncThunk(
  'books/fetch',
  async (data: QueryType) => {
    const res = await BookService.getBooks(data)
    return res.data
  }
)

export const addBook = createAsyncThunk('book/add', async (data: BookType) => {
  const res = await BookService.createBook(data)
  return res.data
})

export const updateBook = createAsyncThunk(
  'book/update',
  async (data: BookType) => {
    const res = await BookService.updateBook(data)
    return res.data
  }
)

export const deleteBook = createAsyncThunk(
  'member/update',
  async (data: BookType) => {
    const res = await BookService.deleteBook(data)
    return res.data
  }
)

export const { reducer } = bookSlice
