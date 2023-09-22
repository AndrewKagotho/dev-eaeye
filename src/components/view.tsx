import type { ViewType } from '../utils/types'

export const View = ({
  header,
  description,
  SearchComponent,
  MainComponent,
  action
}: ViewType) => {
  return (
    <>
      <div className='main__banner'>
        <h2>{header}</h2>
        {SearchComponent}
      </div>
      <div className='main__content'>
        <p>{description}</p>
        {MainComponent}
        {action && (
          <button className='toggleForm' onClick={action.handler}>
            {action.text}
          </button>
        )}
      </div>
    </>
  )
}
