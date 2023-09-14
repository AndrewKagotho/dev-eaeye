import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchAllMembers, addMember } from '../features/member/member.slice'

export const NewMember = ({ toggleForm }) => {
  const dispatch = useAppDispatch()
  const [newMember, setNewMember] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addMember(newMember))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') toggleForm()
        dispatch(fetchAllMembers())
      })
    e.preventDefault()
  }

  return (
    <>
      <h2>New member</h2>
      <div className='view__main'>
        <p>Provide member details in the fields provided.</p>
        <form onSubmit={handleSubmit}>
          <label>
            National ID
            <input
              type='number'
              name='nationalId'
              placeholder='National ID'
              value={newMember?.nationalId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            First name
            <input
              name='firstName'
              placeholder='First name'
              value={newMember?.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last name
            <input
              name='lastName'
              placeholder='Last name'
              value={newMember?.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={newMember?.email}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Add</button>
        </form>
      </div>
    </>
  )
}
