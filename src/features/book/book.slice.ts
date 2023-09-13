import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, BookType } from '../../utils/types'
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
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchAllBooks = createAsyncThunk('allBooks/fetch', async () => {
  const res = await BookService.getAllBooks()
  return res.data
})

export const addBook = createAsyncThunk('book/add', async (data: BookType) => {
  const res = await BookService.createBook(data)
  return res.data
})

export const updateBook = createAsyncThunk(
  'member/update',
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
