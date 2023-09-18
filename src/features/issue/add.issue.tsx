import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { fetchIssues, addIssue } from './issue.slice'
import type { BookType, IssueType } from '../../utils/types'

export const AddBook = ({ setDisplay }) => {
  const dispatch = useAppDispatch()
  const [newBook, setNewBook] = useState({} as IssueType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addIssue(newBook))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') setDisplay('read')
        // dispatch(fetchBooks())
      })
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>Add</button>
    </form>
  )
}
