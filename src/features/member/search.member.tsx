import { useState } from 'react'
import type { QueryType } from '../../utils/types'

export const Search = ({ setSearchParams }) => {
  const [query, setQuery] = useState({ type: 'nationalId' } as QueryType)

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
        placeholder='Search National ID, first name, last name...'
        name='item'
        onChange={handleChange}
      />
      <select
        title='Type'
        name='type'
        value={query.type}
        onChange={handleChange}>
        <option value='nationalId'>National ID</option>
        <option value='firstName'>First name</option>
        <option value='lastName'>Last name</option>
      </select>
      <button type='submit'>Go</button>
    </form>
  )
}
