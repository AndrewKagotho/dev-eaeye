import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchBooks } from '../features/book/book.slice'
import { Search } from '../features/book/search.book'
import { RenderBooks } from '../features/book/render.book'
import { AddBook } from '../features/book/add.book'
import { EditBook } from '../features/book/edit.book'
import type { DisplayType, BookType } from '../utils/types'

export const Books = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [selectedBook, setSelectedBook] = useState({} as BookType)
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type')
  const itemParam = searchParams.get('item')

  useEffect(() => {
    dispatch(fetchBooks({ type: typeParam, item: itemParam }))
    // eslint-disable-next-line
  }, [typeParam, itemParam, display === 'read'])

  return (
    <>
      {display === 'read' && (
        <View
          header='Books'
          description='Books in the library inventory.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={
            <RenderBooks
              setDisplay={setDisplay}
              setSelectedBook={setSelectedBook}
            />
          }
          action={() => setDisplay('create')}
          actionText='Add book'
        />
      )}
      {display === 'create' && (
        <View
          header='New book'
          description='Provide book details.'
          MainComponent={<AddBook setDisplay={setDisplay} />}
          action={() => setDisplay('read')}
          actionText='Close'
        />
      )}
      {display === 'update' && (
        <View
          header='Book update'
          description='Provide updated details.'
          MainComponent={
            <EditBook setDisplay={setDisplay} selectedBook={selectedBook} />
          }
          action={() => setDisplay('read')}
          actionText='Close'
        />
      )}
    </>
  )
}
