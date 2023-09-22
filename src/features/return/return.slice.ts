import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, ReturnType, QueryType } from '../../utils/types'
import ReturnService from '../../services/return.service'

const initialState: InitialStateType = {
  isLoading: false,
  data: null,
  error: null
}

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReturns.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchReturns.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchReturns.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(addReturn.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addReturn.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addReturn.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchReturns = createAsyncThunk(
  'allReturns/fetch',
  async (data: QueryType) => {
    const res = await ReturnService.getReturns(data)
    return res.data
  }
)

export const addReturn = createAsyncThunk(
  'return/add',
  async (data: ReturnType) => {
    const res = await ReturnService.createReturn(data)
    return res.data
  }
)

export const { reducer } = issueSlice
