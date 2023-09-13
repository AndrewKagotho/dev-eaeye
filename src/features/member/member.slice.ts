import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { InitialStateType, MemberType } from '../../utils/types'
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
    builder.addCase(fetchAllMembers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllMembers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(fetchAllMembers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export const fetchAllMembers = createAsyncThunk(
  'allMembers/fetch',
  async () => {
    const res = await MemberService.getAllMembers()
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
