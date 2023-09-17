import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { fetchAllBooks, updateBook, deleteBook } from './book.slice'
import type { BookType } from '../../utils/types'

export const EditBook = ({ setDisplay, selectedBook }) => {
  const dispatch = useAppDispatch()
  const [bookUpdates, setBookUpdates] = useState({
    isbn: selectedBook.isbn
  } as BookType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookUpdates({ ...bookUpdates, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateBook(bookUpdates))
      .unwrap()
      .then((res) => {
        alert('Updated!')
        if (res === 'OK') setDisplay('read')
        dispatch(fetchAllBooks())
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    dispatch(deleteBook(bookUpdates))
      .unwrap()
      .then((res) => {
        alert('Deleted!')
        if (res === 'OK') setDisplay('read')
        dispatch(fetchAllBooks())
      })
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
        <button type='submit'>Update</button>
      </form>
      <div className='edit_actions'>
        <button onClick={handleDelete}>Delete book</button>
        <button onClick={() => setDisplay('read')}>Close</button>
      </div>
    </>
  )
}
