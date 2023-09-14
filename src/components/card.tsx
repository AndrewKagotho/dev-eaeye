import type { CardType } from '../utils/types'

export const Card = ({
  id,
  title,
  subtitle,
  details,
  actionText,
  actionTextSec,
  clickHandler: handleClick,
  clickHandlerSec,
  fitContent
}: CardType) => {
  const CSS = fitContent ? 'fitContent' : ''
  return (
    <article className={CSS}>
      <div className='title'>
        <div>
          <h3>{title}</h3>
          <div>
            <span>{subtitle}</span>
            <hr />
          </div>
        </div>
      </div>
      <div className='details'>
        <div>
          {details.map((detail) => (
            <span>
              {detail.name === 'Email'
                ? detail.content
                : `${detail.name}: ${detail.content}`}
            </span>
          ))}
        </div>
        {actionText && (
          <button onClick={() => handleClick(id, actionText)}>
            {actionText}
          </button>
        )}
        {actionTextSec && (
          <button
            className='sec_action'
            onClick={() => handleClick(id, actionTextSec)}>
            {actionTextSec}
          </button>
        )}
      </div>
    </article>
  )
}
