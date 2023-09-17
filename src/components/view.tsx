import type { ViewType } from '../utils/types'

export const View = ({
  header,
  description,
  Component,
  action,
  actionText
}: ViewType) => {
  return (
    <>
      <h2>{header}</h2>
      <div className='view__main'>
        <p>{description}</p>
        {Component}
        <button className='toggleForm' onClick={action}>
          {actionText}
        </button>
      </div>
    </>
  )
}
