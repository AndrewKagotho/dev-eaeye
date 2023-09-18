import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, MemberType, QueryType } from '../../utils/types'
import MemberService from '../../services/member.service'

const initialState: InitialStateType = {
  isLoading: false,
  data: [],
  error: null
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchMembers = createAsyncThunk(
  'members/fetch',
  async (data: QueryType) => {
    const res = await MemberService.getMembers(data)
    return res.data
  }
)

export const addMember = createAsyncThunk(
  'member/add',
  async (data: MemberType) => {
    const res = await MemberService.createMember(data)
    return res.data
  }
)

export const updateMember = createAsyncThunk(
  'member/update',
  async (data: MemberType) => {
    const res = await MemberService.updateMember(data)
    return res.data
  }
)

export const deleteMember = createAsyncThunk(
  'member/update',
  async (data: MemberType) => {
    const res = await MemberService.deleteMember(data)
    return res.data
  }
)

export const { reducer } = memberSlice
