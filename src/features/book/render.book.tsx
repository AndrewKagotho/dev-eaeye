import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import type { BookType } from '../../utils/types'
import { Card } from '../../components/card'

export const RenderBooks = ({ setDisplay, setSelectedBook }) => {
  const navigate = useNavigate()
  const bookState = useAppSelector((state) => state.book)
  const isLoading = bookState.isLoading
  const books = bookState.data
  const error = bookState.error

  const updateBook = (isbn: number) => {
    const object = books.find(({ isbn: bookIsbn }) => bookIsbn === isbn)
    setSelectedBook(object)
    setDisplay('update')
  }

  const issueBook = (isbn: number) => {
    navigate(`/issues?isbn=${isbn}&newIssue=true`)
  }

  return (
    <>
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
              primaryAction={issueBook}
              actionText='Issue'
              secondaryAction={updateBook}
              actionTextSecondary='Edit'
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
