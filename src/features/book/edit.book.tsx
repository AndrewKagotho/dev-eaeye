import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateBook, deleteBook } from './book.slice'
import type { BookType } from '../../utils/types'

export const EditBook = ({ setDisplay, selectedBook }) => {
  const dispatch = useAppDispatch()
  const bookState = useAppSelector((state) => state.book)
  const isLoading = bookState.isLoading
  const [bookUpdates, setBookUpdates] = useState({
    isbn: selectedBook.isbn
  } as BookType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookUpdates({ ...bookUpdates, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateBook(bookUpdates))
      .unwrap()
      .then(() => {
        alert('Book updated!')
        setDisplay('read')
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteBook(bookUpdates))
        .unwrap()
        .then(() => {
          alert('Book deleted!')
          setDisplay('read')
        })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name='title'
            placeholder='Title'
            defaultValue={selectedBook.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            name='author'
            placeholder='Author'
            defaultValue={selectedBook.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type='number'
            name='quantity'
            placeholder='Quantity'
            defaultValue={selectedBook.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Fees:
          <input
            type='number'
            name='fee'
            placeholder='Fee'
            defaultValue={selectedBook.fee}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>{isLoading ? 'Please wait...' : 'Update'}</button>
      </form>
      <button id='delete_action' onClick={handleDelete}>
        Delete book
      </button>
    </>
  )
}
