import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, IssueType } from '../../utils/types'
import IssueService from '../../services/issue.service'

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
    builder.addCase(fetchAllIssues.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllIssues.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchAllIssues.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchAllIssues = createAsyncThunk('allIssues/fetch', async () => {
  const res = await IssueService.getAllIssues()
  return res.data
})

export const addIssue = createAsyncThunk(
  'issue/add',
  async (data: IssueType) => {
    const res = await IssueService.createIssue(data)
    return res.data
  }
)

export const { reducer } = issueSlice
