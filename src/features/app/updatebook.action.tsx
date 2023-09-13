import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'

export const UpdateMember = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const book = params.book
  const [currentBook, setCurrentBook] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // dispatch(addBook(currentBook))
    e.preventDefault()
  }

  return (
    <>
      <h2>Member update</h2>
      <p>Provide updated details.</p>
      <form onSubmit={handleSubmit}>
        <label>
          ISBN:
          <input
            type='number'
            name='isbn'
            placeholder='ISBN'
            value={currentBook?.isbn}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Title:
          <input
            name='title'
            placeholder='Title'
            value={currentBook?.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            name='author'
            placeholder='Author'
            value={currentBook?.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Fees:
          <input
            type='number'
            name='fee'
            placeholder='Fee'
            value={currentBook?.fee}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  )
}
