import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateMember, deleteMember } from './member.slice'
import type { MemberType } from '../../utils/types'

export const EditMember = ({ setDisplay, selectedMember }) => {
  const dispatch = useAppDispatch()
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const [memberUpdates, setMemberUpdates] = useState({
    nationalId: selectedMember.nationalId
  } as MemberType)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberUpdates({ ...memberUpdates, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateMember(memberUpdates))
      .unwrap()
      .then(() => {
        alert('Member updated!')
        setDisplay('read')
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteMember(memberUpdates))
        .unwrap()
        .then(() => {
          alert('Member deleted!')
          setDisplay('read')
        })
    }
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
        <button type='submit'>{isLoading ? 'Please wait...' : 'Update'}</button>
      </form>
      <button id='delete_action' onClick={handleDelete}>
        Delete member
      </button>
    </>
  )
}
