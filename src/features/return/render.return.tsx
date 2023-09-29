import { useAppSelector } from '../../hooks'
import type { BookReturnType } from '../../utils/types'
import { Card } from '../../components/card'
import { parseDate } from '../../utils/functions'

export const RenderReturns = () => {
  const returnState = useAppSelector((state) => state.return)
  const isLoading = returnState.isLoading
  const returns = returnState.data
  const error = returnState.error

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && returns && (
        <>
          <section className='card_container'>
            {returns.map((returnItem: BookReturnType) => (
              <Card
                key={returnItem.returnId}
                id={returnItem.returnId}
                title={returnItem.returnId}
                subtitle='Return ID'
                details={[
                  { name: 'Issue ID', content: returnItem.issueId },
                  {
                    name: 'Issue date',
                    content: parseDate(returnItem.issuedDate)
                  },
                  {
                    name: 'Return date',
                    content: parseDate(returnItem.returnDate)
                  },
                  { name: 'Book ISBN', content: returnItem.bookIsbn },
                  {
                    name: 'Member ID',
                    content: returnItem.memberNationalId
                  },
                  { name: 'Pay', content: returnItem.pay }
                ]}
              />
            ))}
          </section>
          {!returns.length && <div>No results found!</div>}
        </>
      )}
      {!isLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
