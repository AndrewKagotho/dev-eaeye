import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import type { BookType } from '../utils/types'
import { fetchAllBooks } from '../features/book/book.slice'
import { Card } from '../components/card'
import { useAppContext } from '../utils/context'
import { NewBook } from './newbook.view'

export const Books = () => {
  const { book: bookContext, issue: issueContext } = useAppContext()
  const { selectedBook, setSelectedBook } = bookContext
  const { selectedIssue, setSelectedIssue } = issueContext
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const bookState = useAppSelector((state) => state.book)
  const isLoading = bookState.isLoading
  const books = bookState.data
  const error = bookState.error

  useEffect(() => {
    dispatch(fetchAllBooks())
    // eslint-disable-next-line
  }, [])

  const handleClick = (id: number) => {
    const object = books.find(({ isbn }) => isbn === id)
    setSelectedBook(object)
    setSelectedIssue({ ...selectedIssue, isIssueFormOpen: true })
    navigate('/issues')
  }

  const toggleForm = () => {
    setSelectedBook({
      ...selectedBook,
      isBookFormOpen: !selectedBook.isBookFormOpen
    })
  }

  return (
    <>
      {!selectedBook.isBookFormOpen && (
        <>
          <h2>Books</h2>
          <div className='view__main'>
            <p>Books in the library inventory.</p>
            {isLoading && <div>Loading...</div>}
            {!isLoading && books && (
              <section className='card_container'>
                {books.map((book: BookType) => (
                  <Card
                    key={book.isbn}
                    id={book.isbn}
                    title={book.title}
                    subtitle={book.author}
                    details={[
                      { name: 'ISBN', content: book.isbn },
                      { name: 'Quantity', content: book.quantity }
                    ]}
                    actionText='Issue'
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
      {selectedBook.isBookFormOpen && <NewBook />}
      <button className='toggleForm' onClick={toggleForm}>
        {selectedBook.isBookFormOpen ? 'Minimize' : 'Add book'}
      </button>
    </>
  )
}
