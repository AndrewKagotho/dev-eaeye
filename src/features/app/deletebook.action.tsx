export const DeleteBook = () => {
  const handleClick = () => {
    // dispatch()
  }

  return (
    <>
      <h2>Delete book</h2>
      <p>Proceed to delete book?</p>
      <button onClick={handleClick}>Delete</button>
      <button type='button'>Cancel</button>
    </>
  )
}
