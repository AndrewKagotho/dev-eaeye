import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAllMembers } from '../features/member/member.slice'
import type { MemberType } from '../utils/types'
import { Card } from '../components/card'
import { useAppContext } from '../utils/context'
import { NewMember } from './newmember.view'

export const Members = () => {
  const { member: memberContext } = useAppContext()
  const { selectedMember, setSelectedMember } = memberContext
  const dispatch = useAppDispatch()
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const members = memberState.data
  const error = memberState.error

  useEffect(() => {
    dispatch(fetchAllMembers())
    // eslint-disable-next-line
  }, [])

  const handleClick = (id: number) => {
    const object = members.find(({ nationalId }) => nationalId === id)
    setSelectedMember(object)
  }

  const toggleForm = () => {
    setSelectedMember({
      ...selectedMember,
      isMemberFormOpen: !selectedMember.isMemberFormOpen
    })
  }

  return (
    <>
      {!selectedMember.isMemberFormOpen && (
        <>
          <h2>Members</h2>
          <div className='view__main'>
            <p>Members in the library registry.</p>
            {isLoading && <div>Loading...</div>}
            {!isLoading && members && (
              <section className='card_container'>
                {members.map((member: MemberType) => (
                  <Card
                    key={member.nationalId}
                    id={member.nationalId}
                    title={member.firstName}
                    subtitle={member.lastName}
                    details={[
                      { name: 'National ID', content: member.nationalId },
                      { name: 'Email', content: member.email }
                    ]}
                    actionText='Edit'
                    clickHandler={handleClick}
                  />
                ))}
              </section>
            )}
            {!isLoading && error && (
              <div>Error: {error.message ?? 'Error loading content'}</div>
            )}
          </div>
        </>
      )}
      {selectedMember.isMemberFormOpen && <NewMember />}
      <button className='toggleForm' onClick={toggleForm}>
        {selectedMember.isMemberFormOpen ? 'Minimize' : 'Add member'}
      </button>
    </>
  )
}
