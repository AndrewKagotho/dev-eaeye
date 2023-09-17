import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAllIssues } from '../features/issue/issue.slice'
import type { IssueType } from '../utils/types'
import { Card } from '../components/card'
import { useAppContext } from '../utils/context'
import { NewIssue } from './newissue.view'

export const Issues = () => {
  const { issue: issueContext } = useAppContext()
  const { selectedIssue, setSelectedIssue } = issueContext
  const dispatch = useAppDispatch()
  const issueState = useAppSelector((state) => state.issue)
  const isLoading = issueState.isLoading
  const issues = issueState.data
  const error = issueState.error

  useEffect(() => {
    dispatch(fetchAllIssues())
    // eslint-disable-next-line
  }, [])

  const handleClick = (id: number) => {
    const object = issues.find(({ nationalId }) => nationalId === id)
    setSelectedIssue(object)
  }

  const toggleForm = () => {
    setSelectedIssue({
      ...selectedIssue,
      isIssueFormOpen: !selectedIssue.isIssueFormOpen
    })
  }

  return (
    <>
      {!selectedIssue.isIssueFormOpen && (
        <>
          <h2>Issues</h2>
          <div className='view__main'>
            <p>Book issues recorded in the system.</p>
            {isLoading && <div>Loading...</div>}
            {!isLoading && issues && (
              <section className='card_container'>
                {issues.map((issue: IssueType) => (
                  <Card
                    key={issue.issueId}
                    id={issue.issueId}
                    title={`00${issue.issueId}`}
                    subtitle='Issue ID'
                    details={[
                      { name: 'National ID', content: issue.memberNationalId },
                      { name: 'ISBN', content: issue.bookIsbn },
                      { name: 'Issued on', content: issue.createdAt }
                    ]}
                    actionText='Edit'
                    primaryAction={handleClick}
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
      {selectedIssue.isIssueFormOpen && <NewIssue toggleForm={toggleForm} />}
      <button className='toggleForm' onClick={toggleForm}>
        {selectedIssue.isIssueFormOpen ? 'Minimize' : 'Issue book'}
      </button>
    </>
  )
}
