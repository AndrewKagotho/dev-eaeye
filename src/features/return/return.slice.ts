import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, ReturnType } from '../../utils/types'
import ReturnService from '../../services/return.service'

const initialState: InitialStateType = {
  isLoading: false,
  data: [],
  error: null
}

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllReturns.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllReturns.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchAllReturns.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchAllReturns = createAsyncThunk(
  'allReturns/fetch',
  async () => {
    const res = await ReturnService.getAllReturns()
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
