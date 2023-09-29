import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addBook } from './book.slice'
import type { DisplayType, BookType } from '../../utils/types'

export const AddBook = ({
  setDisplay
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>
}) => {
  const dispatch = useAppDispatch()
  const bookState = useAppSelector((state) => state.book)
  const isLoading = bookState.isLoading
  const [newBook, setNewBook] = useState({} as BookType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addBook(newBook))
      .unwrap()
      .then(() => {
        alert('Book added!')
        setDisplay('read')
      })
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ISBN:
        <input
          type='number'
          name='isbn'
          placeholder='ISBN'
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Title:
        <input name='title' placeholder='Title' onChange={handleChange} />
      </label>
      <label>
        Author:
        <input name='author' placeholder='Author' onChange={handleChange} />
      </label>
      <label>
        Quantity:
        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          onChange={handleChange}
        />
      </label>
      <label>
        Fees:
        <input
          type='number'
          name='fee'
          placeholder='Fee'
          onChange={handleChange}
        />
      </label>
      <button type='submit'>{isLoading ? 'Please wait...' : 'Add'}</button>
    </form>
  )
}
