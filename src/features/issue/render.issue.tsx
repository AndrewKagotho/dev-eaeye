import { useAppSelector } from '../../hooks'
import type { IssueType } from '../../utils/types'
import { Card } from '../../components/card'

export const RenderIssues = ({ setDisplay, setSelectedBook }) => {
  const issueState = useAppSelector((state) => state.issue)
  const isLoading = issueState.isLoading
  const issues = issueState.data
  const error = issueState.error

  const returnBook = (isbn: number) => {
    console.log('return')
    // navigate(`/issues?isbn=${isbn}&newIssue=true`)
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && issues && (
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
                { name: 'Issued on', content: issue.createdAt }
              ]}
              primaryAction={returnBook}
              actionText='Return'
            />
          ))}
        </section>
      )}
      {!isLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
