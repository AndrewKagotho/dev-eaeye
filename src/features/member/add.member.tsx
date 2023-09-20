import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addMember } from './member.slice'
import type { MemberType } from '../../utils/types'

export const AddMember = ({ setDisplay }) => {
  const dispatch = useAppDispatch()
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const [newMember, setNewMember] = useState({} as MemberType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addMember(newMember))
      .unwrap()
      .then(() => {
        alert('Member added!')
        setDisplay('read')
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
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First name
        <input
          name='firstName'
          placeholder='First name'
          onChange={handleChange}
        />
      </label>
      <label>
        Last name
        <input
          name='lastName'
          placeholder='Last name'
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
      </label>
      <button type='submit'>{isLoading ? 'Please wait...' : 'Add'}</button>
    </form>
  )
}
