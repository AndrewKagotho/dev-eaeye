import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'

export const UpdateMember = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const member = params.member
  const [currentMember, setCurrentMember] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMember({ ...currentMember, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // dispatch(addMember(currentMember))
    e.preventDefault()
  }

  return (
    <>
      <h2>Member update</h2>
      <p>
        Provide updated details for {currentMember?.firstName}{' '}
        {currentMember?.lastName}.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          National ID
          <input
            type='number'
            name='nationalId'
            placeholder='National ID'
            value={currentMember?.nationalId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First name
          <input
            name='firstName'
            placeholder='First name'
            value={currentMember?.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name
          <input
            name='lastName'
            placeholder='Last name'
            value={currentMember?.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={currentMember?.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  )
}
