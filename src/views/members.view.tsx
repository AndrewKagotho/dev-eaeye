import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchAllMembers } from '../features/member/member.slice'
import { RenderMembers } from '../features/member/render.member'
import { AddMember } from '../features/member/add.member'
import { EditMember } from '../features/member/edit.member'
import type { DisplayType, MemberType } from '../utils/types'

export const Members = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [selectedMember, setSelectedMember] = useState({} as MemberType)

  useEffect(() => {
    dispatch(fetchAllMembers())
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {display === 'read' && (
        <View
          header='Members'
          description='Members in the library registry.'
          Component={
            <RenderMembers
              setDisplay={setDisplay}
              setSelectedMember={setSelectedMember}
            />
          }
          action={() => setDisplay('create')}
          actionText='Add member'
        />
      )}
      {display === 'create' && (
        <View
          header='New book'
          description='Provide book details.'
          Component={<AddMember setDisplay={setDisplay} />}
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
      {display === 'update' && (
        <View
          header='Book update'
          description='Provide updated details.'
          Component={
            <EditMember
              setDisplay={setDisplay}
              selectedMember={selectedMember}
            />
          }
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
    </>
  )
}
