import type { LucideIcon } from 'lucide-react';
import { Text } from '../Text/Text';
import './Tag.css';

interface TagProps {
  label: string;
  status: 'positive' | 'negative' | 'neutral' | 'warning' | 'information' | 'accent';
  icon?: LucideIcon;
  showDot?: boolean;
  size?: 'default' | 'compact';
}

export function Tag({ label, status, icon: Icon, showDot = false, size = 'default' }: TagProps) {
  const iconSize = size === 'compact' ? 12 : 14;
  const showIcon = Icon !== undefined;
  const showDotEl = showDot && !showIcon;

  return (
    <span className={`tag tag--${status} tag--${size}`}>
      {showDotEl && <span className="tag__dot" aria-hidden="true" />}
      {showIcon && (
        <span className="tag__icon" aria-hidden="true">
          <Icon size={iconSize} strokeWidth={2} color="currentColor" />
        </span>
      )}
      <Text as="span" variant="body-small-moderate">
        {label}
      </Text>
    </span>
  );
}
