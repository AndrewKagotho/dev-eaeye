import api from '../utils/libs/axios.lib'
import type { ReturnType } from '../utils/types'

const getAllReturns = () => {
  return api('/returns')
}

const createReturn = (data: ReturnType) => {
  return api.post('/returns', data)
}

const ReturnService = {
  getAllReturns,
  createReturn
}

export default ReturnService
