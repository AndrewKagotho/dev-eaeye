import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { useAppContext } from '../utils/context'
import { updateBook, deleteBook } from '../features/book/book.slice'

export const UpdateBook = () => {
  const { editBook: editContext, book: bookContext } = useAppContext()
  const { selectedBook } = bookContext
  const { setEditBook } = editContext
  const dispatch = useAppDispatch()
  const [currentBook, setCurrentBook] = useState({ isbn: selectedBook?.isbn })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateBook(currentBook))
      .unwrap()
      .then((res) => {
        console.log(res)
        alert('Updated!')
        if (res === 'OK') toggleForm()
      })
    e.preventDefault()
    e.preventDefault()
  }

  const handleDelete = () => {
    dispatch(deleteBook(currentBook))
      .unwrap()
      .then((res) => {
        alert('Deleted!')
        if (res === 'OK') toggleForm()
      })
  }

  const toggleForm = () => {
    setEditBook(false)
  }

  return (
    <>
      <h2>Book update</h2>
      <div className='view__main'>
        <p>Provide updated details.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              name='title'
              placeholder='Title'
              defaultValue={selectedBook?.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Author:
            <input
              name='author'
              placeholder='Author'
              defaultValue={selectedBook?.author}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type='number'
              name='quantity'
              placeholder='Quantity'
              defaultValue={selectedBook?.quantity}
              onChange={handleChange}
            />
          </label>
          <label>
            Fees:
            <input
              type='number'
              name='fee'
              placeholder='Fee'
              defaultValue={selectedBook?.fee}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Update</button>
        </form>
        <div className='edit_actions'>
        <button onClick={handleDelete}>Delete book</button>
        <button onClick={toggleForm}>Close</button>
        </div>
      </div>
    </>
  )
}
