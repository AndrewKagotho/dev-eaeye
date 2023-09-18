import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchIssues } from '../features/issue/issue.slice'
import { Search } from '../features/issue/search.issues'
import { RenderIssues } from '../features/issue/render.issue'
import type { DisplayType, IssueType } from '../utils/types'

export const Issues = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [selectedIssue, setSelectedIssue] = useState({} as IssueType)
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type')
  const itemParam = searchParams.get('item')

  useEffect(() => {
    dispatch(
      fetchIssues({
        type: typeParam as 'title' | 'isbn' | 'author',
        item: itemParam
      })
    )
    // eslint-disable-next-line
  }, [typeParam, itemParam])

  return (
    <>
      {display === 'read' && (
        <View
          header='Issues'
          description='Book issues recorded in the system.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={
            <RenderIssues
              setDisplay={setDisplay}
              setSelectedBook={setSelectedIssue}
            />
          }
          action={() => setDisplay('create')}
          actionText='Add book'
        />
      )}
    </>
  )
}
