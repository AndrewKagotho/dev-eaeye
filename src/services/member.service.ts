import api from '../utils/libs/axios.lib'
import type { MemberType, QueryType } from '../utils/types'

const getMembers = ({ type, item }: QueryType) => {
  return api.get(`/members?type=${type}&item=${item}`)
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
  getMembers,
  createMember,
  updateMember,
  deleteMember
}

export default MemberService
