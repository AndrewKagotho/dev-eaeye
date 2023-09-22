import type { CardType } from '../utils/types'

export const Card = ({
  id,
  title,
  subtitle,
  details,
  primaryAction,
  secondaryAction
}: CardType) => {
  return (
    <article>
      <div className='card_title'>
        <h3>{title}</h3>
        <div>
          <span>{subtitle}</span>
          <hr />
        </div>
      </div>
      <div className='card_details'>
        {details.map((detail, index) => {
          let context = detail.name === 'Quantity' ? 'books' : ''
          let prefix =
            detail.name === 'Daily fee' || detail.name === 'Pay' ? 'KSH' : ''
          return (
            <span key={index}>
              {detail.name}: {prefix} {detail.content} {context}
            </span>
          )
        })}
      </div>
      <div className='card_actions'>
        {primaryAction && (
          <button onClick={() => primaryAction.handler(id)}>
            {primaryAction.text}
          </button>
        )}
        {secondaryAction && (
          <button
            className='card__action_secondary'
            onClick={() => secondaryAction.handler(id)}>
            {secondaryAction.text}
          </button>
        )}
      </div>
    </article>
  )
}
