import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchIssues } from '../features/issue/issue.slice'
import { Search } from '../features/issue/search.issues'
import { RenderIssues } from '../features/issue/render.issue'
import { AddIssue } from '../features/issue/add.issue'
import type { DisplayType } from '../utils/types'

export const Issues = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type')
  const itemParam = searchParams.get('item')
  const newParam = searchParams.get('new')

  useEffect(() => {
    dispatch(fetchIssues({ type: typeParam, item: itemParam }))
    if (newParam === 'true') setDisplay('create')
    // eslint-disable-next-line
  }, [typeParam, itemParam, display === 'read'])

  return (
    <>
      {display === 'read' && (
        <View
          header='Issues'
          description='Active book issues.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={<RenderIssues />}
        />
      )}
      {display === 'create' && <AddIssue setDisplay={setDisplay} />}
    </>
  )
}
