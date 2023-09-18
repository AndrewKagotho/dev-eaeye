import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { updateMember, deleteMember } from './member.slice'
import type { MemberType } from '../../utils/types'

export const EditMember = ({ setDisplay, selectedMember }) => {
  const dispatch = useAppDispatch()
  const [memberUpdates, setMemberUpdates] = useState({
    nationalId: selectedMember.nationalId
  } as MemberType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberUpdates({ ...memberUpdates, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateMember(memberUpdates))
      .unwrap()
      .then((res) => {
        alert('Updated!')
        if (res === 'OK') setDisplay('read')
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    dispatch(deleteMember(memberUpdates))
      .unwrap()
      .then((res) => {
        alert('Deleted!')
        if (res === 'OK') setDisplay('read')
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          National ID
          <input
            type='number'
            name='nationalId'
            placeholder='National ID'
            defaultValue={selectedMember.nationalId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First name
          <input
            name='firstName'
            placeholder='First name'
            defaultValue={selectedMember.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name
          <input
            name='lastName'
            placeholder='Last name'
            defaultValue={selectedMember.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            placeholder='Email'
            defaultValue={selectedMember.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Update</button>
      </form>
      <div className='edit_actions'>
        <button onClick={handleDelete}>Delete book</button>
        <button onClick={() => setDisplay('read')}>Close</button>
      </div>
    </>
  )
}
