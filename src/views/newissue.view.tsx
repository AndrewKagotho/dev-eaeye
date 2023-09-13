import { useState } from 'react'
import { useAppContext } from '../utils/context'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Card } from '../components/card'
import { addIssue } from '../features/issue/issue.slice'
import { fetchAllMembers } from '../features/member/member.slice'
import { MemberType } from '../utils/types'

export const NewIssue = () => {
  const { book: bookContext } = useAppContext()
  const { selectedBook } = bookContext
  const dispatch = useAppDispatch()
  const [newIssue, setNewIssue] = useState(null)
  const [searchMember, setSearchMember] = useState(null)
  const memberState = useAppSelector((state) => state.member)
  const isLoading = memberState.isLoading
  const members = memberState.data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIssue({ ...newIssue, [e.target.name]: e.target.value })
  }

  const handleClick = (id: number) => {
    const object = members.find(({ nationalId }) => nationalId === id)
    setSearchMember(object)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(fetchAllMembers())
    e.preventDefault()
  }

  const handleIssue = () => {
    const data = {
      bookIsbn: selectedBook.isbn,
      memberNationalId: searchMember.nationalId
    }
    dispatch(addIssue(data))
      .unwrap()
      .then((res) => {
        // console.log(res.issueId)
      })
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
            actionText='none'
            fitContent
          />
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
          <button onClick={handleIssue}>Complete issue</button>
        </section>
        <p>Search for member...</p>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search members'
            value='newIssue'
            onChange={handleChange}
            required
          />
          <button type='submit'>Add</button>
        </form>
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
              clickHandler={handleClick}
              fitContent
            />
          ))}
        </section>
      </div>
    </>
  )
}
