import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { useAppContext } from '../utils/context'
import { updateMember, deleteMember } from '../features/member/member.slice'

export const UpdateMember = () => {
  const { editMember: editContext, member: memberContext } = useAppContext()
  const { selectedMember } = memberContext
  const { setEditMember } = editContext
  const dispatch = useAppDispatch()
  const [currentMember, setCurrentMember] = useState({
    nationalId: selectedMember.nationalId
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMember({ ...currentMember, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateMember(currentMember))
      .unwrap()
      .then((res) => {
        console.log(res)
        alert('Updated!')
        if (res === 'OK') toggleForm()
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    dispatch(deleteMember(currentMember))
      .unwrap()
      .then((res) => {
        alert('Deleted!')
        if (res === 'OK') toggleForm()
      })
  }

  const toggleForm = () => {
    setEditMember(false)
  }

  return (
    <>
      <h2>Member update</h2>
      <div className='view__main'>
        <p>Provide updated details.</p>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              name='firstName'
              placeholder='First name'
              defaultValue={selectedMember?.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last name
            <input
              name='lastName'
              placeholder='Last name'
              defaultValue={selectedMember?.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type='email'
              name='email'
              placeholder='Email'
              defaultValue={selectedMember?.email}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Update</button>
        </form>
        <button onClick={handleDelete}>Dismiss member</button>
        <button onClick={toggleForm}>Close</button>
      </div>
    </>
  )
}
