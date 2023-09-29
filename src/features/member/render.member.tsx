import { useAppSelector } from '../../hooks'
import { Card } from '../../components/card'
import type { DisplayType, MemberType } from '../../utils/types'

export const RenderMembers: React.FC<{
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>
  setSelectedMember: React.Dispatch<React.SetStateAction<MemberType | null>>
  select?: boolean
}> = ({ setDisplay, setSelectedMember, select = false }) => {
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const members = memberState.data
  const error = memberState.error

  const handleUpdate = (nationalId: number) => {
    const object = members?.find(
      ({ nationalId: memberNationalId }) => memberNationalId === nationalId
    )
    if (object !== undefined) setSelectedMember(object)
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
                primaryAction={{
                  handler: handleUpdate,
                  text: select ? 'Select' : 'Edit'
                }}
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
