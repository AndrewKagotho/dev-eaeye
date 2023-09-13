import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAllReturns } from '../features/return/return.slice'
import type { ReturnType } from '../utils/types'
import { Card } from '../components/card'

export const Returns = () => {
  const dispatch = useAppDispatch()
  const returnState = useAppSelector((state) => state.return)
  const isLoading = returnState.isLoading
  const returns = returnState.data
  const error = returnState.error

  useEffect(() => {
    dispatch(fetchAllReturns())
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h2>Returns</h2>
      <div className='view__main'>
        <p>Book returns logged in the system.</p>
        {isLoading && <div>Loading...</div>}
        {!isLoading && returns && (
          <section className='card_container'>
            {returns.map((returnItem: ReturnType) => (
              <Card
                key={returnItem.returnId}
                id={returnItem.returnId}
                title={`00${returnItem.returnId}`}
                subtitle={returnItem.issueIssueId}
                details={[
                  { name: 'Fee payable', content: returnItem.pay },
                  { name: 'Return date', content: returnItem.createdAt }
                ]}
              />
            ))}
          </section>
        )}
        {!isLoading && error && (
          <div>Error: {error.message ?? 'Error loading content'}</div>
        )}
      </div>
    </>
  )
}
