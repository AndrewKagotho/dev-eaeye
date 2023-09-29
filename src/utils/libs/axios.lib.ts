import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'
// const BASE_URL = '/api'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
