import api from '../utils/libs/axios.lib'
import type { IssueType, QueryType } from '../utils/types'

const getIssues = ({ type, item }: QueryType) => {
  return api.get(`/issues?type=${type}&item=${item}`)
}

const createIssue = (data: IssueType) => {
  return api.post('/issues', data)
}

const IssueService = {
  getIssues,
  createIssue
}

export default IssueService
