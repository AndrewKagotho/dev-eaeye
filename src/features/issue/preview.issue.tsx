import { useAppSelector } from '../../hooks'
import { Card } from '../../components/card'
import { BookType, MemberType } from '../../utils/types'

export const Preview: React.FC<{
  selectedBook: BookType
  selectedMember: MemberType | null
  setSelectedMember: React.Dispatch<React.SetStateAction<MemberType | null>>
  handleIssue(): void
}> = ({ selectedBook, selectedMember, setSelectedMember, handleIssue }) => {
  const bookState = useAppSelector((state) => state.book)
  const isBookLoading = bookState.isLoading
  const error = bookState.error
  const issueState = useAppSelector((state) => state.issue)
  const isIssueLoading = issueState.isLoading

  return (
    <>
      {isBookLoading && <div>Loading...</div>}
      {!isBookLoading && (
        <section className='card_container container__alt'>
          <Card
            id={selectedBook?.isbn}
            title={selectedBook?.title}
            subtitle={selectedBook?.author}
            details={[
              { name: 'ISBN', content: selectedBook?.isbn },
              { name: 'Quantity', content: selectedBook?.quantity }
            ]}
          />
          {selectedMember && (
            <>
              <hr />
              <Card
                id={selectedMember.nationalId}
                title={selectedMember.firstName}
                subtitle={selectedMember.lastName}
                details={[
                  { name: 'National ID', content: selectedMember.nationalId },
                  { name: 'Email', content: selectedMember.email }
                ]}
              />
              <div>
                <button onClick={handleIssue}>
                  {isIssueLoading ? 'Please wait...' : 'Complete issue'}
                </button>
                <button onClick={() => setSelectedMember(null)}>Clear</button>
              </div>
            </>
          )}
        </section>
      )}
      {!isBookLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
