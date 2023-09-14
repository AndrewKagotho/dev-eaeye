import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchAllBooks, addBook } from '../features/book/book.slice'

export const NewBook = ({ toggleForm }) => {
  const dispatch = useAppDispatch()
  const [newBook, setNewBook] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addBook(newBook))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') toggleForm()
        dispatch(fetchAllBooks())
      })
    e.preventDefault()
  }

  return (
    <>
      <h2>New book</h2>
      <div className='view__main'>
        <p>Provide book details.</p>
        <form onSubmit={handleSubmit}>
          <label>
            ISBN:
            <input
              type='number'
              name='isbn'
              placeholder='ISBN'
              value={newBook?.isbn}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Title:
            <input
              name='title'
              placeholder='Title'
              value={newBook?.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Author:
            <input
              name='author'
              placeholder='Author'
              value={newBook?.author}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type='number'
              name='quantity'
              placeholder='Quantity'
              value={newBook?.quantity}
              onChange={handleChange}
            />
          </label>
          <label>
            Fees:
            <input
              type='number'
              name='fee'
              placeholder='Fee'
              value={newBook?.fee}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Add</button>
        </form>
      </div>
    </>
  )
}
