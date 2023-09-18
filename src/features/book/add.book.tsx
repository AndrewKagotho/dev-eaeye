import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { addBook } from './book.slice'
import type { BookType } from '../../utils/types'

export const AddBook = ({ setDisplay }) => {
  const dispatch = useAppDispatch()
  const [newBook, setNewBook] = useState({} as BookType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addBook(newBook))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') setDisplay('read')
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
          value={newBook.isbn}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Title:
        <input
          name='title'
          placeholder='Title'
          value={newBook.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Author:
        <input
          name='author'
          placeholder='Author'
          value={newBook.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          value={newBook.quantity}
          onChange={handleChange}
        />
      </label>
      <label>
        Fees:
        <input
          type='number'
          name='fee'
          placeholder='Fee'
          value={newBook.fee}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add</button>
    </form>
  )
}
