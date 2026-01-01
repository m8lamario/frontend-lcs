import Link from 'next/link';
import './Styles/EmptyState.css';

export default function EmptyState({
  title = 'Contenuto non disponibile',
  description = 'Torneremo presto con nuovi aggiornamenti.',
  icon,
  action,
  className = '',
  size = 'regular',
  align = 'center',
  children
}) {
  const hasAction = action && action.label && (action.href || action.onClick);
  const isAnchor = action && action.href;
  const actionProps = action || {};
  const alignClass = align === 'left' ? 'empty-state--left' : 'empty-state--center';
  const sizeClass = size === 'large' ? 'empty-state--large' : 'empty-state--regular';
  const appearanceClass = action?.appearance ? `empty-state--${action.appearance}` : 'empty-state--panel';

  const actionNode = hasAction ? (
    isAnchor ? (
      <Link
        href={actionProps.href}
        className="empty-state__action"
        aria-label={actionProps.ariaLabel || actionProps.label}
      >
        {actionProps.label}
      </Link>
    ) : (
      <button
        type="button"
        className="empty-state__action"
        onClick={actionProps.onClick}
      >
        {actionProps.label}
      </button>
    )
  ) : null;

  return (
    <div className={['empty-state', alignClass, sizeClass, appearanceClass, className].filter(Boolean).join(' ')}>
      {icon && <div className="empty-state__icon" aria-hidden>{icon}</div>}
      <div className="empty-state__body">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {children && <div className="empty-state__extra">{children}</div>}
      </div>
      {actionNode}
    </div>
  );
}

