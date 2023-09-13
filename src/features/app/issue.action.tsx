import { useState } from 'react'

export const CompleteIssue = () => {
  const [id, setId] = useState(0)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(+e.target.value)
  }

  const handleSubmit = () => {
    console.log(id)
  }

  return (
    <>
      <h2>Book issue</h2>
      <p>Provide the National ID in the field provided.</p>
      <form onSubmit={handleSubmit}>
        <label>
          National ID:
          <input
            type='number'
            name='id'
            placeholder='National ID'
            value={id}
            onChange={handleClick}
            required
          />
        </label>
        <button type='submit'>Complete</button>
      </form>
    </>
  )
}
