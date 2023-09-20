import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchReturns } from '../features/return/return.slice'
import { Search } from '../features/return/search.return'
import { RenderReturns } from '../features/return/render.return'
import { AddReturn } from '../features/return/add.return'
import type { DisplayType } from '../utils/types'

export const Returns = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type')
  const itemParam = searchParams.get('item')
  const newParam = searchParams.get('new')

  useEffect(() => {
    dispatch(
      fetchReturns({
        type: typeParam as 'title' | 'isbn' | 'author',
        item: itemParam
      })
    )
    if (newParam === 'true') setDisplay('create')
    // eslint-disable-next-line
  }, [typeParam, itemParam, display === 'read'])

  return (
    <>
      {display === 'read' && (
        <View
          header='Returns'
          description='Book returns logged in the system.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={<RenderReturns />}
        />
      )}
      {display === 'create' && <AddReturn setDisplay={setDisplay} />}
    </>
  )
}
