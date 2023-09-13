import api from '../utils/libs/axios.lib'
import type { MemberType } from '../utils/types'

const getAllMembers = () => {
  return api('/members')
}

const createMember = (data: MemberType) => {
  return api.post('/members', data)
}

const updateMember = (data: MemberType) => {
  return api.put(`/members/${data.nationalId}`, data)
}

const deleteMember = ({ nationalId }: MemberType) => {
  return api.delete(`/members/${nationalId}`)
}

const MemberService = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember
}

export default MemberService
