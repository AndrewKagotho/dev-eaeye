import { useState } from 'react'
import { useAppContext } from '../utils/context'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Card } from '../components/card'
import { fetchAllIssues, addIssue } from '../features/issue/issue.slice'
import { fetchAllMembers } from '../features/member/member.slice'
import { MemberType } from '../utils/types'

export const NewIssue = ({ toggleForm }) => {
  const { book: bookContext } = useAppContext()
  const { selectedBook } = bookContext
  const dispatch = useAppDispatch()
  // const [newIssue, setNewIssue] = useState(null)
  const [searchMember, setSearchMember] = useState(null)
  const memberState = useAppSelector((state) => state.member)
  const members = memberState.data

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewIssue({ ...newIssue, [e.target.name]: e.target.value })
  // }

  console.log(selectedBook)

  const handleClick = (id: number) => {
    const object = members.find(({ nationalId }) => nationalId === id)
    setSearchMember(object)
  }

  const handleSearch = () => {
    dispatch(fetchAllMembers())
  }

  const handleIssue = () => {
    const data = {
      bookIsbn: selectedBook.isbn,
      memberNationalId: searchMember.nationalId
    }
    dispatch(addIssue(data))
      .unwrap()
      .then((res) => {
        alert('Created!')
        if (res === 'Created') toggleForm()
        dispatch(fetchAllIssues())
      })
  }

  const clearSearch = () => {
    setSearchMember(null)
  }

  return (
    <>
      <h2>New issue</h2>
      <div className='view__main'>
        <section className='card_container container__alt'>
          <Card
            id={selectedBook.isbn}
            title={selectedBook.title}
            subtitle={selectedBook.author}
            details={[
              { name: 'ISBN', content: selectedBook.isbn },
              { name: 'Quantity', content: selectedBook.quantity }
            ]}
            fitContent
          />
          {searchMember && (
            <>
              <hr />
              <Card
                id={searchMember?.nationalId}
                title={searchMember?.firstName}
                subtitle={searchMember?.lastName}
                details={[
                  { name: 'National ID', content: searchMember?.nationalId },
                  { name: 'Email', content: searchMember?.email }
                ]}
                fitContent
              />
              <div>
                <button onClick={handleIssue}>Complete issue</button>
                <button onClick={clearSearch}>Clear</button>
              </div>
            </>
          )}
        </section>
        <section className='issue_members'>
          <p>Select member...</p>
          <section className='card_container'>
            {members.map((member: MemberType) => (
              <Card
                key={member.nationalId}
                id={member.nationalId}
                title={member.firstName}
                subtitle={member.lastName}
                details={[
                  { name: 'National ID', content: member.nationalId },
                  { name: 'Email', content: member.email }
                ]}
                actionText='Select'
                primaryAction={handleClick}
                fitContent
              />
            ))}
          </section>
          <button onClick={handleSearch}>Refresh members</button>
        </section>
      </div>
    </>
  )
}
