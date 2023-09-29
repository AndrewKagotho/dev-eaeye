import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { View } from '../../components/view'
import { fetchIssue } from '../issue/issue.slice'
import { fetchBook } from '../book/book.slice'
import { fetchMember } from '../member/member.slice'
import { addReturn } from './return.slice'
import { Preview } from '../return/preview.return'
import type {
  DisplayType,
  BookType,
  MemberType,
  IssueType
} from '../../utils/types'
import moment from 'moment'

export const AddReturn: React.FC<{
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>
}> = ({ setDisplay }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedBook, setSelectedBook] = useState({} as BookType)
  const [selectedMember, setSelectedMember] = useState({} as MemberType)
  const [selectedIssue, setSelectedIssue] = useState({} as IssueType)
  const [searchParams, setSearchParams] = useSearchParams()

  const issueIDParam = searchParams.get('issueId') as string

  useEffect(() => {
    dispatch(fetchIssue(+issueIDParam))
      .unwrap()
      .then((res) => {
        setSelectedIssue(res)
        dispatch(fetchBook(res.bookIsbn))
          .unwrap()
          .then((res) => setSelectedBook(res))
        dispatch(fetchMember(res.memberNationalId))
          .unwrap()
          .then((res) => setSelectedMember(res))
      })
    // eslint-disable-next-line
  }, [])

  const returnSummary: { timeDifference: number; fee: number } = (() => {
    const createdAt = moment(selectedIssue?.createdAt)
    const currentDate = moment()
    let timeDifference = moment(currentDate).diff(createdAt, 'days')
    if (timeDifference === 0) timeDifference++
    const fee = selectedBook.fee * timeDifference
    return { timeDifference, fee }
  })()

  const handleReturn = () => {
    const data = {
      issueId: selectedIssue.issueId,
      pay: returnSummary.fee,
      bookIsbn: selectedIssue.bookIsbn,
      memberNationalId: selectedMember.nationalId,
      issuedDate: selectedIssue.createdAt
    }
    dispatch(addReturn(data))
      .unwrap()
      .then(() => {
        alert('Book returned!')
        setDisplay('read')
        setSearchParams('')
      })
  }

  return (
    <>
      <View
        header='Book return'
        description='Return preview.'
        MainComponent={
          <Preview
            selectedBook={selectedBook}
            selectedMember={selectedMember}
            selectedIssue={selectedIssue}
            handleReturn={handleReturn}
            returnSummary={returnSummary}
          />
        }
        action={{ handler: () => navigate('/issues'), text: 'Discard' }}
      />
    </>
  )
}
