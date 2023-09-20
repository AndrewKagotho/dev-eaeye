import type { CardType } from '../utils/types'

export const Card = ({
  id,
  title,
  subtitle,
  details,
  actionText,
  actionTextSecondary,
  primaryAction: handlePrimaryClick,
  secondaryAction: handleSecondaryClick,
  fitContent
}: CardType) => {
  const CSS = fitContent ? 'fitContent' : ''
  return (
    <article className={CSS}>
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
        {actionText && (
          <button onClick={() => handlePrimaryClick(id)}>{actionText}</button>
        )}
        {actionTextSecondary && (
          <button
            className='card__action_secondary'
            onClick={() => handleSecondaryClick(id)}>
            {actionTextSecondary}
          </button>
        )}
      </div>
    </article>
  )
}
