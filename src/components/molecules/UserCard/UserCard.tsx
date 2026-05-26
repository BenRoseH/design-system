import { Avatar } from '../../atoms/Avatar/Avatar';
import { Text } from '../../atoms/Text/Text';
import './UserCard.css';

interface UserCardProps {
  firstName: string;
  lastName: string;
  company?: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
}

export function UserCard({
  firstName,
  lastName,
  company,
  size = 'md',
  selected = false,
  onClick,
}: UserCardProps) {
  const fallback = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const avatarSize = size === 'sm' ? 'compact' : 'default';
  const fullName = `${firstName} ${lastName}`;
  const isInteractive = onClick !== undefined;

  const classes = [
    'user-card',
    `user-card--${size}`,
    selected ? 'user-card--selected' : '',
    isInteractive ? 'user-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <Avatar fallback={fallback} size={avatarSize} />
      <div className="user-card__info">
        {company && (
          <Text as="span" variant="body-small-default" color="muted">
            {company}
          </Text>
        )}
        <Text as="span" variant="body-medium-strong">
          {fullName}
        </Text>
      </div>
    </>
  );

  if (isInteractive) {
    return (
      <button
        className={classes}
        onClick={onClick}
        type="button"
        aria-pressed={selected}
      >
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
