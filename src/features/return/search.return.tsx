import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { QueryType } from '../../utils/types'

export const Search = ({
  setSearchParams
}: {
  setSearchParams: ReturnType<typeof useSearchParams>[1]
}) => {
  const [query, setQuery] = useState({ type: 'returnId' } as QueryType)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchParams((prev) => {
      prev.set('type', query.type)
      prev.set('item', query.item)
      return prev
    })
    e.preventDefault()
  }

  return (
    <form className='form_search' onSubmit={handleSubmit}>
      <input
        type='search'
        placeholder='Search return ID, issue ID...'
        name='item'
        onChange={handleChange}
      />
      <select
        title='Type'
        name='type'
        value={query.type}
        onChange={handleChange}>
        <option value='returnId'>Return ID</option>
        <option value='issueId'>Issue ID</option>
      </select>
      <button type='submit'>Go</button>
    </form>
  )
}
