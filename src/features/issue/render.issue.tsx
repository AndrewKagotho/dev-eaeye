import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import type { IssueType } from '../../utils/types'
import { Card } from '../../components/card'
import { parseDate } from '../../utils/functions'

export const RenderIssues = () => {
  const navigate = useNavigate()
  const issueState = useAppSelector((state) => state.issue)
  const isLoading = issueState.isLoading
  const issues = issueState.data
  const error = issueState.error

  const handleReturn = (isbn: number) => {
    navigate(`/returns?issueId=${isbn}&new=true`)
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && issues && (
        <>
          <section className='card_container'>
            {issues.map((issue: IssueType) => (
              <Card
                key={issue.issueId}
                id={issue.issueId}
                title={issue.issueId}
                subtitle='Issue ID'
                details={[
                  { name: 'National ID', content: issue.memberNationalId },
                  { name: 'ISBN', content: issue.bookIsbn },
                  { name: 'Issued on', content: parseDate(issue.createdAt) }
                ]}
                primaryAction={{ handler: handleReturn, text: 'Return' }}
              />
            ))}
          </section>
          {!issues.length && <div>No results found!</div>}
        </>
      )}
      {!isLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
