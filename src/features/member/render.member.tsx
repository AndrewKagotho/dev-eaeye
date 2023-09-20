import { useAppSelector } from '../../hooks'
import type { MemberType } from '../../utils/types'
import { Card } from '../../components/card'

export const RenderMembers = ({
  setDisplay,
  setSelectedMember,
  select = false
}) => {
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const members = memberState.data
  const error = memberState.error

  const updateMember = (nationalId: number) => {
    const object = members.find(
      ({ nationalId: memberNationalId }) => memberNationalId === nationalId
    )
    setSelectedMember(object)
    if (!select) setDisplay('update')
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && members && (
        <>
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
                primaryAction={updateMember}
                actionText={select ? 'Select' : 'Edit'}
              />
            ))}
          </section>
          {!members.length && <div>No results found!</div>}
        </>
      )}
      {!isLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
