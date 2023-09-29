import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import type { DisplayType, BookType } from '../../utils/types'
import { Card } from '../../components/card'

export const RenderBooks: React.FC<{
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>
  setSelectedBook: React.Dispatch<React.SetStateAction<BookType>>
  select?: boolean
}> = ({ setDisplay, setSelectedBook }) => {
  const navigate = useNavigate()
  const bookState = useAppSelector((state) => state.book)
  const isLoading = bookState.isLoading
  const books = bookState.data
  const error = bookState.error

  const handleUpdate = (isbn: number) => {
    const object = books?.find(({ isbn: bookIsbn }) => bookIsbn === isbn)
    if (object !== undefined) setSelectedBook(object)
    setDisplay('update')
  }

  const handleIssue = (isbn: number) => {
    navigate(`/issues?isbn=${isbn}&new=true`)
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && books && (
        <>
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
                primaryAction={{ handler: handleIssue, text: 'Issue' }}
                secondaryAction={{ handler: handleUpdate, text: 'Edit' }}
              />
            ))}
          </section>
          {!books.length && <div>No results found!</div>}
        </>
      )}
      {!isLoading && error && (
        <div>Error: {error.message ?? 'Error loading content'}</div>
      )}
    </>
  )
}
