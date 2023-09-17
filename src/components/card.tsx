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
          {details.map((detail, index) => (
            <span key={index}>
              {detail.name === 'Email'
                ? detail.content
                : `${detail.name}: ${detail.content}`}
            </span>
          ))}
        </div>
        {actionText && (
          <button onClick={() => handlePrimaryClick(id)}>{actionText}</button>
        )}
        {actionTextSecondary && (
          <button
            className='sec_action'
            onClick={() => handleSecondaryClick(id)}>
            {actionTextSecondary}
          </button>
        )}
      </div>
    </article>
  )
}
