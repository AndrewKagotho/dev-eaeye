import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { View } from '../../components/view'
import { addIssue } from './issue.slice'
import { fetchBook } from '../book/book.slice'
import { fetchMembers } from '../member/member.slice'
import { RenderMembers } from '../member/render.member'
import { Preview } from '../issue/preview.issue'
import { Search } from '../member/search.member'
import type { DisplayType, BookType, MemberType } from '../../utils/types'

export const AddIssue: React.FC<{
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>
}> = ({ setDisplay }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedBook, setSelectedBook] = useState({} as BookType)
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const isbnParam = searchParams.get('isbn') as string
  const typeParam = searchParams.get('type') as string
  const itemParam = searchParams.get('item') as string

  useEffect(() => {
    dispatch(fetchBook(+isbnParam))
      .unwrap()
      .then((res) => {
        setSelectedBook(res)
      })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(fetchMembers({ type: typeParam, item: itemParam }))
    // eslint-disable-next-line
  }, [typeParam, itemParam])

  const handleIssue = (): void => {
    const data = {
      bookIsbn: selectedBook.isbn,
      memberNationalId: selectedMember!.nationalId
    }
    dispatch(addIssue(data)).then(() => {
      alert('Book issued!')
      setDisplay('read')
      setSearchParams('')
    })
  }

  return (
    <>
      <View
        header='New issue'
        description='Issue preview.'
        MainComponent={
          <Preview
            selectedBook={selectedBook}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            handleIssue={handleIssue}
          />
        }
      />
      <View
        header='Members'
        description='Select a member from the library registry to issue to.'
        SearchComponent={<Search setSearchParams={setSearchParams} />}
        MainComponent={
          <RenderMembers
            setDisplay={setDisplay}
            setSelectedMember={setSelectedMember}
            select
          />
        }
        action={{ handler: () => navigate('/'), text: 'Discard' }}
      />
    </>
  )
}
