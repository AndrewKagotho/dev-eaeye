import api from '../utils/libs/axios.lib'
import type { BookType, QueryType } from '../utils/types'

const getBooks = ({ type, item }: QueryType) => {
  return api(`/books?type=${type}&item=${item}`)
}

const getBook = (isbn: number) => {
  return api(`/books/${isbn}`)
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
  getBook,
  createBook,
  updateBook,
  deleteBook
}

export default BookService
