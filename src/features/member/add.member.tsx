import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { fetchAllMembers, addMember } from './member.slice'
import type { MemberType } from '../../utils/types'

export const AddMember = ({ setDisplay }) => {
  const dispatch = useAppDispatch()
  const [newMember, setNewMember] = useState({} as MemberType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addMember(newMember))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') setDisplay('read')
        dispatch(fetchAllMembers())
      })
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        National ID
        <input
          type='number'
          name='nationalId'
          placeholder='National ID'
          value={newMember.nationalId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First name
        <input
          name='firstName'
          placeholder='First name'
          value={newMember.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name
        <input
          name='lastName'
          placeholder='Last name'
          value={newMember.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={newMember.email}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add</button>
    </form>
  )
}
