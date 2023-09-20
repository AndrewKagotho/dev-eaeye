import { useAppSelector } from '../../hooks'
import { Card } from '../../components/card'
import { parseDate } from '../../utils/functions'

export const Preview = ({
  selectedBook,
  selectedMember,
  selectedIssue,
  handleReturn,
  returnSummary
}) => {
  const returnState = useAppSelector((state) => state.return)
  const isLoading = returnState.isLoading
  return (
    <>
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
        <hr />
        <Card
          id={selectedIssue?.issueId}
          title={selectedIssue?.issueId}
          subtitle='Issue ID'
          details={[
            { name: 'National ID', content: selectedIssue?.memberNationalId },
            { name: 'ISBN', content: selectedIssue?.bookIsbn },
            { name: 'Issued on', content: parseDate(selectedIssue?.createdAt) }
          ]}
        />
        <hr />
        <Card
          id={selectedMember?.nationalId}
          title={selectedMember?.firstName}
          subtitle={selectedMember?.lastName}
          details={[
            { name: 'National ID', content: selectedMember?.nationalId },
            { name: 'Email', content: selectedMember?.email }
          ]}
        />
      </section>
      <h2>Amount payable:</h2>
      <section className='view_calculation'>
        <span>Duration of issue:</span>
        <span>{returnSummary.timeDifference} day(s)</span>
        <span>Daily fee:</span>
        <span>KSH {selectedBook.fee}</span>
        <span>Fee payable:</span>
        <span>KSH {returnSummary.fee}</span>
        <button onClick={handleReturn}>
          {isLoading ? 'Please wait...' : 'Return book'}
        </button>
      </section>
    </>
  )
}
