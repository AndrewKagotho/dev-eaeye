import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchAllBooks } from '../features/book/book.slice'
import { RenderBooks } from '../features/book/render.book'
import { AddBook } from '../features/book/add.book'
import { EditBook } from '../features/book/edit.book'
import type { DisplayType, BookType } from '../utils/types'

export const Books = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [selectedBook, setSelectedBook] = useState({} as BookType)

  useEffect(() => {
    dispatch(fetchAllBooks())
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {display === 'read' && (
        <View
          header='Books'
          description='Books in the library inventory.'
          Component={
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
          Component={<AddBook setDisplay={setDisplay} />}
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
      {display === 'update' && (
        <View
          header='Book update'
          description='Provide updated details.'
          Component={
            <EditBook setDisplay={setDisplay} selectedBook={selectedBook} />
          }
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
    </>
  )
}
