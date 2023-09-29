import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchMembers } from '../features/member/member.slice'
import { Search } from '../features/member/search.member'
import { RenderMembers } from '../features/member/render.member'
import { AddMember } from '../features/member/add.member'
import { EditMember } from '../features/member/edit.member'
import type { DisplayType, MemberType } from '../utils/types'

export const Members = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState('read' as DisplayType)
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type') as string
  const itemParam = searchParams.get('item') as string

  useEffect(() => {
    dispatch(fetchMembers({ type: typeParam, item: itemParam }))
    // eslint-disable-next-line
  }, [typeParam, itemParam, display === 'read'])

  return (
    <>
      {display === 'read' && (
        <View
          header='Members'
          description='Members in the library registry.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={
            <RenderMembers
              setDisplay={setDisplay}
              setSelectedMember={setSelectedMember}
            />
          }
          action={{ handler: () => setDisplay('create'), text: 'Add member' }}
        />
      )}
      {display === 'create' && (
        <View
          header='New member'
          description='Provide member details.'
          MainComponent={<AddMember setDisplay={setDisplay} />}
          action={{ handler: () => setDisplay('read'), text: 'Close' }}
        />
      )}
      {display === 'update' && (
        <View
          header='Member update'
          description='Provide updated details.'
          MainComponent={
            <EditMember
              setDisplay={setDisplay}
              selectedMember={selectedMember}
            />
          }
          action={{ handler: () => setDisplay('read'), text: 'Close' }}
        />
      )}
    </>
  )
}
