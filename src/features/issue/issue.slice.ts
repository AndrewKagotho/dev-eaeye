import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, IssueType, QueryType } from '../../utils/types'
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
    builder.addCase(fetchIssues.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchIssue.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchIssue.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
    })
    builder.addCase(fetchIssue.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(addIssue.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addIssue.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addIssue.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchIssues = createAsyncThunk(
  'issues/fetch',
  async (data: QueryType) => {
    const res = await IssueService.getIssues(data)
    return res.data
  }
)

export const fetchIssue = createAsyncThunk(
  'issue/fetch',
  async (data: number) => {
    const res = await IssueService.getIssue(data)
    return res.data
  }
)

export const addIssue = createAsyncThunk(
  'issue/add',
  async (data: IssueType) => {
    const res = await IssueService.createIssue(data)
    return res.data
  }
)

export const { reducer } = issueSlice
