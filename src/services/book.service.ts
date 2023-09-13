import api from '../utils/libs/axios.lib'
import type { BookType } from '../utils/types'

const getAllBooks = () => {
  return api('/books')
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
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
}

export default BookService
