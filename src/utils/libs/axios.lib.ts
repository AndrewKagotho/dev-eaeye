import axios from 'axios'
const BASE_URL = 'https://library-system-crud-4d7ba478356f.herokuapp.com/api'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
