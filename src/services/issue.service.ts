import api from '../utils/libs/axios.lib'
import type { IssueType } from '../utils/types'

const getAllIssues = () => {
  return api('/issues')
}

const createIssue = (data: IssueType) => {
  return api.post('/issues', data)
}

const IssueService = {
  getAllIssues,
  createIssue
}

export default IssueService
