import api from '../utils/libs/axios.lib'
import type { ReturnType, QueryType } from '../utils/types'

const getReturns = ({ type, item }: QueryType) => {
  return api.get(`/returns?type=${type}&item=${item}`)
}

const createReturn = (data: ReturnType) => {
  return api.post('/returns', data)
}

const ReturnService = {
  getReturns,
  createReturn
}

export default ReturnService
