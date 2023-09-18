import api from '../utils/libs/axios.lib'
import type { BookType, QueryType } from '../utils/types'

const getBooks = ({ type, item }: QueryType) => {
  return api.get(`/books?type=${type}&item=${item}`)
}

const createBook = (data: BookType) => {
  return api.post('/books', data)
}

const updateBook = (data: BookType) => {
  return api.put(`/books/${data.isbn}`, data)
}

const deleteBook = ({ isbn }: BookType) => {
  return api.delete(`/books/${isbn}`)
}

const BookService = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
}

export default BookService
