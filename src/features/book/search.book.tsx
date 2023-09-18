import { useState } from 'react'
import type { QueryType } from '../../utils/types'

export const Search = ({ setSearchParams }) => {
  const [query, setQuery] = useState({ type: 'title' } as QueryType)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchParams(query)
    e.preventDefault()
  }

  return (
    <form className='form_search' onSubmit={handleSubmit}>
      <input
        type='search'
        placeholder='Search title, author, ISBN...'
        name='item'
        onChange={handleChange}
      />
      <select
        title='Type'
        name='type'
        value={query.type}
        onChange={handleChange}>
        <option value='isbn'>ISBN</option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
      </select>
      <button type='submit'>Go</button>
    </form>
  )
}
