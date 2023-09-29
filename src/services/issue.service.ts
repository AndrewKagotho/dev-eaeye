import api from '../utils/libs/axios.lib'
import type { IssueType, QueryType } from '../utils/types'

const getIssues = ({ type, item }: QueryType) => {
  return api.get(`/issues?type=${type}&item=${item}`)
}

const getIssue = (issueId: number) => {
  return api.get(`/issues/${issueId}`)
}

const createIssue = (data: Omit<IssueType, 'issueId' | 'createdAt'>) => {
  return api.post('/issues', data)
}

const IssueService = {
  getIssues,
  getIssue,
  createIssue
}

export default IssueService
