import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { fetchAllMembers, updateMember, deleteMember } from './member.slice'
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
        dispatch(fetchAllMembers())
      })
    e.preventDefault()
  }

  const handleDelete = () => {
    dispatch(deleteMember(memberUpdates))
      .unwrap()
      .then((res) => {
        alert('Deleted!')
        if (res === 'OK') setDisplay('read')
        dispatch(fetchAllMembers())
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name='title'
            placeholder='Title'
            defaultValue={selectedMember.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            name='author'
            placeholder='Author'
            defaultValue={selectedMember.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type='number'
            name='quantity'
            placeholder='Quantity'
            defaultValue={selectedMember.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Fees:
          <input
            type='number'
            name='fee'
            placeholder='Fee'
            defaultValue={selectedMember.fee}
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
